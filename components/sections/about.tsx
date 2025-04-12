import React from 'react'
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { cn } from '@/lib/utils';

const words = `Hey there! I’m Piyush Kumar, a frontend developer passionate about crafting sleek, responsive, and user-focused web experiences. With a strong foundation in TypeScript, React, Next.js, and Tailwind CSS, I thrive on turning complex ideas into intuitive interfaces.

I’ve had hands-on experience building real-world applications—from a weather forecasting tool powered by live APIs, to a scalable AI content generation platform integrating cutting-edge NLP models. During my time at CareMedico and Internshala, I collaborated on diverse projects where I honed my skills in modern UI libraries like Shadcn and NextUI, while ensuring performance, accessibility, and maintainability.

When I'm not coding, you’ll probably find me playing badminton, diving into cybersecurity topics, or cycling my way through new ideas. I'm always up for a challenge that pushes my limits and allows me to learn something new.

Let’s build something awesome together!`;

export default function About() {
    return (
        <section id="about" className="flex flex-col justify-center items-center gap-10 mt-5 px-5 md:px-40">
            <h2 className="text-4xl font-bold text-center">About Me</h2>

            <div className="relative flex h-auto min-h-[30rem] w-full items-center justify-center bg-white dark:bg-black rounded-2xl p-6 md:p-12 shadow-lg">
                {/* Grid pattern */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-2xl z-0",
                        "[background-size:20px_20px]",
                        "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                        "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
                    )}
                />

                {/* Faded radial effect */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black z-10"></div>

                {/* Text Content */}
                <div className="relative z-20 max-w-3xl text-center px-4">
                    <TextGenerateEffect
                        words={words}
                        className="text-lg md:text-xl leading-relaxed font-medium text-gray-800 dark:text-gray-200"
                    />
                </div>
            </div>
        </section>
    );
}
