import { NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/email/contact";
import {
  CONTACT_LIMITS,
  contactSubmissionSchema,
  extractContactFieldErrors,
  type ContactApiResponse,
} from "@/lib/validations/contact";

export const runtime = "nodejs";

function jsonResponse(body: ContactApiResponse, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  const rawHost =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const host = rawHost?.split(",")[0]?.trim().toLowerCase();
  if (!host) {
    return false;
  }

  try {
    const originUrl = new URL(origin);
    const originHost = originUrl.host.toLowerCase();
    if (originHost === host) {
      return true;
    }

    if (process.env.NODE_ENV !== "production") {
      const localHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
      const hostNameOnly = host.replace(/:\d+$/, "");
      if (
        localHosts.has(originUrl.hostname.toLowerCase()) &&
        localHosts.has(hostNameOnly)
      ) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const logDevReject = (code: string) => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[contact] Request rejected: ${code}`);
    }
  };

  if (!isAllowedOrigin(request)) {
    logDevReject("FORBIDDEN_ORIGIN");
    return jsonResponse(
      {
        ok: false,
        code: "FORBIDDEN_ORIGIN",
        message: "Request origin is not permitted.",
      },
      403
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    logDevReject("UNSUPPORTED_MEDIA_TYPE");
    return jsonResponse(
      {
        ok: false,
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "Content-Type must be application/json.",
      },
      415
    );
  }

  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const declaredLength = Number(contentLengthHeader);
    if (
      Number.isFinite(declaredLength) &&
      declaredLength > CONTACT_LIMITS.maxPayloadBytes
    ) {
      logDevReject("PAYLOAD_TOO_LARGE");
      return jsonResponse(
        {
          ok: false,
          code: "PAYLOAD_TOO_LARGE",
          message: "Submission exceeds the maximum allowed size.",
        },
        413
      );
    }
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    logDevReject("INVALID_JSON");
    return jsonResponse(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "Unable to read request body.",
      },
      400
    );
  }

  if (Buffer.byteLength(rawBody, "utf8") > CONTACT_LIMITS.maxPayloadBytes) {
    logDevReject("PAYLOAD_TOO_LARGE");
    return jsonResponse(
      {
        ok: false,
        code: "PAYLOAD_TOO_LARGE",
        message: "Submission exceeds the maximum allowed size.",
      },
      413
    );
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawBody);
  } catch {
    logDevReject("INVALID_JSON");
    return jsonResponse(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "Invalid request payload.",
      },
      400
    );
  }

  const validation = contactSubmissionSchema.safeParse(parsedJson);
  if (!validation.success) {
    logDevReject("VALIDATION_ERROR");
    return jsonResponse(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Please check the highlighted fields and try again.",
        fieldErrors: extractContactFieldErrors(validation.error),
      },
      400
    );
  }

  // Honeypot check: reject automated bot submissions without claiming delivery.
  if (
    validation.data.hpField.trim().length > 0 ||
    validation.data.website.trim().length > 0
  ) {
    logDevReject("SPAM_DETECTED");
    return jsonResponse(
      {
        ok: false,
        code: "SPAM_DETECTED",
        message: "Unable to process submission.",
      },
      400
    );
  }

  const delivery = await sendContactEmail({
    name: validation.data.name,
    email: validation.data.email,
    subject: validation.data.subject,
    message: validation.data.message,
  });

  if (!delivery.ok) {
    if (delivery.code === "EMAIL_NOT_CONFIGURED") {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[contact] Email delivery is not configured. Missing environment variables: ${delivery.missingEnv.join(", ")}`
        );
      }
      return jsonResponse(
        {
          ok: false,
          code: "EMAIL_NOT_CONFIGURED",
          message:
            "Direct message delivery is currently unavailable. Please contact me via email.",
        },
        503
      );
    }

    return jsonResponse(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message:
          "Unable to send your message right now. Please try again or contact me by email.",
      },
      502
    );
  }

  return jsonResponse(
    {
      ok: true,
      messageId: delivery.messageId,
    },
    200
  );
}
