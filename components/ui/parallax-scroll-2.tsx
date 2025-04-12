"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Projects {
  images: string;
  link: string;
}

export const ParallaxScrollSecond = ({
  projects,
  className,
}: {
  projects: Projects[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateXFirst = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXThird = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateXThird = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const third = Math.ceil(projects.length / 3);

  const firstPart = projects.slice(0, third);
  const secondPart = projects.slice(third, 2 * third);
  const thirdPart = projects.slice(2 * third);

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10">
        {/* First Column */}
        <div className="grid gap-10">
          {firstPart.map((el, idx) =>
            el.images ? (
              <motion.div
                key={"grid-1" + idx}
                style={{
                  x: translateXFirst,
                  y: translateYFirst,
                  rotateZ: rotateXFirst,
                }}
              >
                <Link href={el.link} target="_blank">
                <Image
                  src={el.images}
                  className="h-80 w-full object-cover object-left-top rounded-lg hover:scale-105 transition duration-300 ease-in"
                  height={400}
                  width={400}
                  alt="thumbnail"
                />
                </Link>
              </motion.div>
            ) : null
          )}
        </div>

        {/* Second Column */}
        <div className="grid gap-10">
          {secondPart.map((el, idx) =>
            el.images ? (
              <motion.div key={"grid-2" + idx}>
                <Link href={el.link} target="_blank">
                <Image
                  src={el.images}
                  className="h-80 w-full object-cover object-left-top rounded-lg hover:scale-105 transition duration-300 ease-in"
                  height={400}
                  width={400}
                  alt="thumbnail"
                />
                </Link>
              </motion.div>
            ) : null
          )}
        </div>

        {/* Third Column */}
        <div className="grid gap-10">
          {thirdPart.map((el, idx) =>
            el.images ? (
              <motion.div
                key={"grid-3" + idx}
                style={{
                  x: translateXThird,
                  y: translateYThird,
                  rotateZ: rotateXThird,
                }}
              >
                <Link href={el.link} target="_blank">
                <Image
                  src={el.images}
                  className="h-80 w-full object-cover object-left-top rounded-lg hover:scale-105 transition duration-300 ease-in"
                  height={400}
                  width={400}
                  alt="thumbnail"
                />
                </Link>
              </motion.div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};
