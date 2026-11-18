"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
  maxTilt = 10,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const canInteractWith3D = (pointerType?: string) => {
    if (shouldReduceMotion) return false;
    if (pointerType && pointerType !== "mouse") return false;
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return false;
    }
    return true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !canInteractWith3D(e.pointerType)) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    if (!width || !height) return;

    const normalizedX = (e.clientX - left) / width - 0.5;
    const normalizedY = (e.clientY - top) / height - 0.5;

    const rotateY = normalizedX * (maxTilt * 2);
    const rotateX = -normalizedY * (maxTilt * 2);

    const glareX = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const glareY = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));

    containerRef.current.style.transform = `rotateY(${rotateY.toFixed(2)}deg) rotateX(${rotateX.toFixed(2)}deg)`;
    containerRef.current.style.setProperty("--glare-x", `${glareX.toFixed(1)}%`);
    containerRef.current.style.setProperty("--glare-y", `${glareY.toFixed(1)}%`);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canInteractWith3D(e.pointerType)) return;
    setIsMouseEntered(true);
  };

  const handlePointerLeave = () => {
    setIsMouseEntered(false);
    if (!containerRef.current) return;
    containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    containerRef.current.style.setProperty("--glare-x", "50%");
    containerRef.current.style.setProperty("--glare-y", "50%");
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "flex items-center justify-center py-6",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className={cn(
            "relative flex items-center justify-center transition-transform ease-out",
            isMouseEntered ? "duration-100" : "duration-300",
            className
          )}
          style={
            {
              transformStyle: "preserve-3d",
              "--glare-x": "50%",
              "--glare-y": "50%",
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 transform-3d *:transform-3d",
        className
      )}
    >
      {children}
    </div>
  );
};

type CardItemOwnProps<T extends React.ElementType = "div"> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
};

export type CardItemProps<T extends React.ElementType = "div"> =
  CardItemOwnProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof CardItemOwnProps<T>>;

export function CardItem<T extends React.ElementType = "div">({
  as,
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps<T>) {
  const Tag = (as || "div") as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  const [isMouseEntered] = useMouseEnter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered && !shouldReduceMotion) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform =
        "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
    }
  }, [
    isMouseEntered,
    shouldReduceMotion,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
  ]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "w-fit transition-transform duration-300 ease-out",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
