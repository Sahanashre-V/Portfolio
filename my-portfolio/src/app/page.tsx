"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Code2,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [skillsInView, setSkillsInView] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Check if skills section is in view
      const skillsSection = document.getElementById("skills");
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView && !skillsInView) {
          setSkillsInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [skillsInView]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setSubmitStatus("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send email via API route
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus(result.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus(
          result.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "TechNestle",
      description:
        "A dynamic platform where users can both learn and teach web development. Whether you're a novice or a seasoned professional, there's something for everyone.",
      tech: ["React", "Node.js", "MongoDB", "Express.js"],
      image: "/technestle.jpeg",
      githubUrl:
        "https://github.com/kalviumcommunity/S60_Sahanashre_Capstone_TechNestle",
    },
    {
      id: 2,
      title: "WealthWise",
      description:
        "An AI-powered personal finance tracker that helps users manage, categorize, and visualize their daily transactions with ease. Designed to simplify financial planning and promote smarter spending habits through real-time insights.",
      tech: ["React", "Tailwind CSS", "Google OAuth", "Gemini API"],
      image: "/wealthwise.png",
      githubUrl: "https://github.com/Sahanashre-V/WealthWise",
    },
    {
      id: 3,
      title: "Documents Manager",
      description:
        "Platform for managing and organizing regulatory documents efficiently. It allows users to view, add, and maintain records in a structured and secure manner, streamlining document workflows and ensuring easy accessibility for compliance and auditing purposes.",
      tech: [
        "Next.js",
        "TypeScript",
        "Material UI",
        "PostgreSQL",
        "Prisma ORM",
        "Docker",
      ],
      image: "/document.png",
      githubUrl: "https://github.com/Sahanashre-V/DocumentsManager",
    },
    {
      id: 4,
      title: "Sky Sweets Symphony",
      description:
        "An interactive sweets catching game with responsive design and score tracking. Built using HTML, CSS, and JavaScript for engaging gameplay across all devices.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "/sweets.jpeg",
      githubUrl: "https://github.com/Sahanashre-V/Sky-Sweets-Symphony-CA-2",
    },
    {
      id: 5,
      title: "BagItNow",
      description:
        "This is a full-stack e-commerce application built with React.js on the frontend and Flask on the backend. It allows users to browse products, view product details in a modal, add products to their cart, scan barcodes using QuaggaJS.",
      tech: [
        "React.js",
        "Flask",
        "Python",
        "Tailwind CSS",
        "QuaggaJS",
        "MongoDB",
      ],
      image: "/bagitnow.png",
      githubUrl: "https://github.com/Sahanashre-V/BagItNow",
    },
  ];

  const skills: Skill[] = [
    // Frontend Technologies - Advanced
    { name: "HTML", level: 95, icon: "🌐" },
    { name: "CSS", level: 90, icon: "🎨" },
    { name: "React.js", level: 95, icon: "⚛️" },
    { name: "Next.js", level: 90, icon: "▲" },
    { name: "React Native", level: 85, icon: "📱" },
    { name: "Tailwind CSS", level: 90, icon: "🎯" },
    { name: "Figma", level: 90, icon: "🎨" },

    // Backend Technologies - Intermediate
    { name: "Express.js", level: 95, icon: "🚀" },
    { name: "Node.js", level: 90, icon: "🟢" },
    { name: "Mongoose", level: 90, icon: "🍃" },
    { name: "JWT", level: 85, icon: "🔐" },
    { name: "Prisma ORM", level: 80, icon: "🔷" },

    // Programming Languages - Intermediate
    { name: "Python", level: 90, icon: "🐍" },
    { name: "C++", level: 80, icon: "⚙️" },
    { name: "JavaScript", level: 80, icon: "🟨" },
    { name: "TypeScript", level: 85, icon: "📘" },

    // Databases - Intermediate
    { name: "MongoDB", level: 85, icon: "🍃" },
    { name: "MySQL", level: 80, icon: "🐬" },
    { name: "PostgreSQL", level: 80, icon: "🐘" },

    // Testing - Intermediate
    { name: "Jest", level: 85, icon: "🧪" },
    { name: "Supertest", level: 80, icon: "🧬" },

    // DevOps - Intermediate
    { name: "Docker", level: 80, icon: "🐳" },

    // Other Tools - Intermediate
    { name: "Netlify", level: 80, icon: "🌐" },
    { name: "Render", level: 85, icon: "🚀" },
    { name: "Postman", level: 95, icon: "📬" },
    { name: "Bruno", level: 95, icon: "🐻" },
    { name: "Cloudinary", level: 85, icon: "☁️" },
    { name: "Firebase", level: 85, icon: "🔥" },
  ];

  return (
    <div className="bg-[#0B0B0B] text-[#F5F5F5] min-h-screen font-inter selection:bg-[#FFB020]/30 selection:text-[#FFB020]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0B0B0B]/80 backdrop-blur-md z-50 border-b border-[#181818] transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={() => scrollToSection("hero")}
              className="font-bold text-2xl tracking-tight text-[#F5F5F5] hover:text-[#FFB020] transition-colors focus:outline-none cursor-pointer"
            >
              Sahanashre<span className="text-[#FFB020]">.</span>
            </button>
            <div className="hidden md:flex items-center space-x-1">
              {["hero", "about", "skills", "projects", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${activeSection === section
                      ? "bg-[#181818] text-[#FFB020] shadow-sm"
                      : "text-[#8A8A8A] hover:text-[#F5F5F5] hover:bg-[#181818]/50"
                      }`}
                  >
                    {section === "hero" ? "home" : section}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen pt-24 pb-12 flex items-center relative overflow-hidden bg-[#0B0B0B]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div
              className={`transition-all duration-1000 ease-out ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
                }`}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                Hi, I am <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB020] to-[#FF7A18]">
                  Sahanashre V
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-[#8A8A8A] font-medium mb-6">
                Full Stack Developer
              </p>
              <p className="text-lg text-[#8A8A8A] mb-10 leading-relaxed max-w-lg">
                Passionate about creating exceptional digital experiences with
                modern web technologies and clean, efficient code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-4 bg-[#FFB020] text-[#0B0B0B] rounded-xl font-bold hover:bg-[#FF7A18] transition-all duration-300 shadow-lg shadow-[#FFB020]/20 hover:shadow-[#FF7A18]/40 hover:-translate-y-1 cursor-pointer"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-4 border-2 border-[#181818] text-[#F5F5F5] rounded-xl font-bold hover:border-[#FFB020] hover:text-[#FFB020] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  Get In Touch
                </button>
              </div>
            </div>

            {/* Profile Image - Moved to Hero */}
            <div
              className={`relative hidden md:block transition-all duration-1000 delay-300 ease-out ${isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
                }`}
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto group">
                {/* Decorative background blobs */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFB020]/20 to-[#FF7A18]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-4 rounded-full border border-[#181818] shadow-2xl overflow-hidden relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/sahu.jpeg"
                    alt="Sahanashre V"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer p-2 rounded-full hover:bg-[#181818] transition-colors duration-300"
          onClick={() => scrollToSection("about")}
        >
          <ChevronDown className="w-6 h-6 text-[#8A8A8A] hover:text-[#FFB020]" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#181818]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] flex items-center gap-4">
              <span className="w-8 h-1 bg-[#FFB020] rounded-full"></span>
              About Me
            </h2>
          </div>

          <div className="grid md:grid-cols-[2fr_1fr] gap-16 items-start">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#F5F5F5]">
                Get to know me!
              </h3>
              <p className="text-lg text-[#8A8A8A] leading-relaxed">
                I am a passionate full-stack developer with expertise in modern
                web technologies. I love turning complex problems into simple,
                beautiful, and intuitive solutions.
              </p>
              <p className="text-lg text-[#8A8A8A] leading-relaxed">
                With a strong foundation in both frontend and backend
                development, I create seamless user experiences backed by
                robust, scalable architectures.
              </p>
              <p className="text-lg text-[#8A8A8A] leading-relaxed">
                When I am not coding, you can find me exploring new technologies
                or sharing knowledge with the developer community.
              </p>
            </div>

            <div className="bg-[#0B0B0B] p-8 rounded-2xl border border-[#181818] shadow-xl">
              <h3 className="text-xl font-semibold text-[#F5F5F5] mb-6 border-b border-[#181818] pb-4">
                Details
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFB020]/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#FFB020]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8A8A8A] font-medium">Email</p>
                    <p className="text-[#F5F5F5] font-medium text-sm lg:text-base">
                      sahanashre.v@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFB020]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#FFB020]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8A8A8A] font-medium">Location</p>
                    <p className="text-[#F5F5F5] font-medium text-sm lg:text-base">
                      Available for remote work
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-[#0B0B0B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] flex items-center gap-4">
              <span className="w-8 h-1 bg-[#FFB020] rounded-full"></span>
              Skills & Technologies
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend",
                icon: "🌐",
                data: skills.slice(0, 7),
              },
              {
                title: "Backend",
                icon: "⚙️",
                data: skills.slice(7, 12),
              },
              {
                title: "Languages",
                icon: "💻",
                data: skills.slice(12, 16),
              },
              {
                title: "Databases",
                icon: "🗄️",
                data: skills.slice(16, 19),
              },
              {
                title: "Testing",
                icon: "🧪",
                data: skills.slice(19, 21),
              },
              {
                title: "DevOps & Tools",
                icon: "🛠️",
                data: skills.slice(21),
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className="bg-[#181818] border border-[#181818] rounded-2xl p-6 hover:border-[#FFB020]/30 transition-colors duration-300 group shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#0B0B0B]">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="text-xl font-bold text-[#F5F5F5]">
                    {category.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {category.data.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3">
                      <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                        {skill.icon}
                      </span>
                      <span className="text-[#8A8A8A] text-sm font-semibold group-hover:text-[#FFB020] transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-[#181818]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] flex items-center gap-4">
              <span className="w-8 h-1 bg-[#FFB020] rounded-full"></span>
              Featured Projects
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="bg-[#0B0B0B] rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 border border-[#181818] hover:border-[#FFB020]/40 shadow-xl flex flex-col"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="relative h-56 bg-[#181818] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#181818]">
                      <span className="text-[#8A8A8A] font-medium">
                        No Image
                      </span>
                    </div>
                  )}
                  {/* Subtle dark overlay at bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-[#F5F5F5] group-hover:text-[#FFB020] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#8A8A8A] text-sm mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#181818] text-[#FFB020] rounded-md text-xs font-semibold tracking-wide border border-[#181818] group-hover:border-[#FFB020]/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-[#181818]">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#8A8A8A] hover:text-[#FFB020] transition-colors text-sm font-semibold"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0B0B0B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] flex items-center justify-center md:justify-start gap-4">
              <span className="w-8 h-1 bg-[#FFB020] rounded-full hidden md:block"></span>
              Get In Touch
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
            {/* Contact Information Sidebar */}
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl font-bold mb-6 text-[#F5F5F5]">
                Let&apos;s collaborate
              </h3>
              <p className="text-[#8A8A8A] mb-8 leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-[#181818] rounded-2xl flex items-center justify-center border border-[#181818] group-hover:border-[#FFB020]/30 transition-colors">
                    <Phone className="w-6 h-6 text-[#FFB020]" />
                  </div>
                  <div>
                    <p className="text-[#8A8A8A] text-sm font-medium">Call Me</p>
                    <p className="text-[#F5F5F5] font-semibold">+91 96263 31196</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-8 border-t border-[#181818]">
                {[
                  { icon: Github, url: "https://github.com/Sahanashre-V" },
                  { icon: Linkedin, url: "https://www.linkedin.com/in/sahanashre-v" },
                  { icon: Code2, url: "https://leetcode.com/u/sahanashre-v" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-[#181818] rounded-2xl flex items-center justify-center text-[#8A8A8A] hover:bg-[#FFB020] hover:text-[#0B0B0B] transition-all duration-300 hover:-translate-y-1 shadow-md border border-[#181818]"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2 bg-[#181818] rounded-3xl p-8 md:p-10 border border-[#181818] shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-[#8A8A8A]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-[#0B0B0B] border border-[#181818] rounded-xl text-[#F5F5F5] placeholder-[#8A8A8A]/50 focus:outline-none focus:border-[#FFB020] focus:ring-1 focus:ring-[#FFB020] transition-colors"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#8A8A8A]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-[#0B0B0B] border border-[#181818] rounded-xl text-[#F5F5F5] placeholder-[#8A8A8A]/50 focus:outline-none focus:border-[#FFB020] focus:ring-1 focus:ring-[#FFB020] transition-colors"
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[#8A8A8A]">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-5 py-4 bg-[#0B0B0B] border border-[#181818] rounded-xl text-[#F5F5F5] placeholder-[#8A8A8A]/50 focus:outline-none focus:border-[#FFB020] focus:ring-1 focus:ring-[#FFB020] transition-colors resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                {submitStatus && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium ${submitStatus.includes("successfully")
                      ? "bg-[#FFB020]/10 text-[#FFB020] border border-[#FFB020]/30"
                      : "bg-red-500/10 text-red-500 border border-red-500/30"
                      }`}
                  >
                    {submitStatus}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-[#FFB020] text-[#0B0B0B] rounded-xl font-bold hover:bg-[#FF7A18] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg shadow-[#FFB020]/20 hover:shadow-[#FF7A18]/40 hover:-translate-y-1 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0B0B0B]"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#181818] border-t border-[#181818] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#8A8A8A] text-sm font-medium">
            © {new Date().getFullYear()} Sahanashre V. Built with Next.js & TypeScript.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

        .font-inter {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
