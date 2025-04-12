import React from 'react'
import { ContainerTextFlip } from '../ui/container-text-flip'

export default function SkillSection() {
    return (
        <section id="skill" className="flex flex-col justify-center items-center gap-10 mt-5 p-10">
            <h2 className="text-4xl font-bold">Skill</h2>
            <ContainerTextFlip
                words={["HTML5", "CSS3", "JavaScript", "Bootstrap", "Gemini", "TypeScript", "React", "Next.js", "NextUI", "Clerk", "Shadcn", "Aceternity UI", "Tailwind CSS", "SQL", "Git", "GitHub" ]}
            />
        </section>
    )
}
