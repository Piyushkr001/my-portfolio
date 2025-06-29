"use client";

import { ParallaxScrollSecond } from "../ui/parallax-scroll-2";


interface Projects {
    images: string; // Assuming images is a single string; change to string[] if it's an array
    link: string;
}
export function Projects() {
    return (
        <section id="projects" className="flex flex-col justify-center items-center gap-10 mt-5 p-10">
            <h2 className="text-4xl font-bold">Projects</h2>
            <ParallaxScrollSecond projects={project} />
        </section>
    );
}

const project: Projects[] = [
    {
        images: "https://media.graphassets.com/QCGs9ndmR4S8kkQxe6Z4",
        link: "https://ai-content-psi.vercel.app/"
    },
    { 
        images: "https://www.talentlms.com/blog/wp-content/uploads/2024/05/AI_Learning_29May2024_big-.png", 
        link: "https://online-learning-platform-ecru.vercel.app/" 
    },
    { 
        images: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 

        images: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 

        images: "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 

        images: "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 

        images: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 

        images: "https://play-lh.googleusercontent.com/HOnQyPxVCPr7W50rXUp6bu1-UZo2bM_GuQ9coNItncFrP117qbkadZpc60qVmJ5-kw=w526-h296-rw", 
        link: "https://github.com/Piyushkr001/Weather_Forcasting_App" 
    },
    { 
        images: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://i.ytimg.com/vi/dS95PJntXxQ/maxresdefault.jpg", 
        link: "https://github.com/Piyushkr001/zero2hero" 
    },
    { 
        images: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80", 
        link: "https://github.com/piyushkr001" 
    },
    { 
        images: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80", 
        link: "https://github.com/piyushkr001" 
    },

];


