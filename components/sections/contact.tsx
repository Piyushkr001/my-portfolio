"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";
import { Button } from "../ui/button";
import {
  MailIcon,
  PhoneIcon,
  MapPin,
  Linkedin,
  Github,
  Home,
} from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contacts" className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md gap-5">
      <div className="w-full absolute inset-0 min-h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Interested in Working Together?
      </h1>

      <div className="z-20 flex flex-col gap-5 items-center text-white text-lg">
        {/* Email */}
        <Link href="mailto:krvpiyush@gmail.com">
          <Button className="cursor-pointer" size="lg">
            Send Me an Email <MailIcon className="ml-2 size-5" />
          </Button>
        </Link>

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
        <div className="flex items-center gap-2">
          <Home className="size-5" />
          <span>D14 RailVihar Colony, Manoharpur Road, Near Krypton Public School, Moradabad - 244001</span>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-4">
          <Link href="https://www.linkedin.com/in/piyushkr007/" target="_blank">
            <Linkedin className="hover:text-blue-400 transition-colors size-6" />
          </Link>
          <Link href="https://github.com/Piyushkr001" target="_blank">
            <Github className="hover:text-gray-400 transition-colors size-6" />
          </Link>
        </div>
      </div>
    </section>
  );
}
//continue to 33:43