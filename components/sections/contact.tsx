"use client";

import React from "react";
import { SparklesCore } from "../ui/sparkles";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { MailIcon, PhoneIcon, MapPin, Home } from "lucide-react";
import Link from "next/link";
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

export default function Contact() {
  return (
    <section
      id="contacts"
      className="relative flex h-[40rem] w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-md bg-black px-4"
    >
      <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>

      <h1 className="relative z-20 text-center text-3xl font-bold text-white md:text-7xl lg:text-6xl">
        Interested in Working Together?
      </h1>

      <div className="z-20 flex flex-col items-center gap-5 text-center text-lg text-white">
        {/* Email */}
        <Button
          size="lg"
          className="cursor-pointer"
          nativeButton={false}
          render={(props) => (
            <a
              {...props}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=krvpiyush@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Piyush,"
              target="_blank"
              rel="noopener noreferrer"
            >
              Send Me an Email <MailIcon className="ml-2 size-5" />
            </a>
          )}
        />

        {/* Phone Number */}
        <div className="flex items-center gap-2">
          <PhoneIcon className="size-5" />
          <span>+91 63980 72914</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <MapPin className="size-5" />
          <span>Moradabad, Uttar Pradesh, India</span>
        </div>

        {/* Address Line */}
        <div className="flex max-w-3xl items-center gap-2 text-center">
          <Home className="size-5 shrink-0" />
          <span>
            D14 RailVihar Colony, Manoharpur Road, Near Krypton Public School,
            Moradabad - 244001
          </span>
        </div>

        {/* Social Links */}
        <div className="mt-4 flex gap-4">
          <Link
            href="https://www.linkedin.com/in/piyushkr007/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <LinkedinLogoIcon className="size-6 transition-colors hover:text-blue-400" />
          </Link>

          <Link
            href="https://github.com/Piyushkr001"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <GithubLogoIcon className="size-6 transition-colors hover:text-gray-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}