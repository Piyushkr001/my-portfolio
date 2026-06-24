import React from 'react'
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { cn } from '@/lib/utils';

const words = `Hey there! I’m Piyush Kumar, a Full Stack Developer passionate about building scalable, responsive, and user-focused web applications. With hands-on experience in React.js, Next.js, TypeScript, Node.js, REST APIs, PostgreSQL, MongoDB, Tailwind CSS, and modern UI libraries like Shadcn UI and NextUI, I enjoy turning complex ideas into clean, practical, and high-performing digital solutions.

I’ve worked on real-world applications including job listing platforms, certificate verification systems, Excel analytics dashboards, AI-powered content generation tools, blogging platforms, and government training management websites. Through my experience at National Intstitute of Educational Planning and Administration(NIEPA), Amdox Technologies, Zidio Development, CareMedico, and Internshala, I have built responsive interfaces, integrated APIs, implemented authentication workflows, optimized performance, and contributed to deployment-ready web applications.

Beyond coding, I enjoy exploring cybersecurity, improving my problem-solving skills, and staying updated with modern web technologies. I’m always excited to take on challenges that help me learn, grow, and build meaningful products.

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
