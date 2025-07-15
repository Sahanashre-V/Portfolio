'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Send } from 'lucide-react';

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
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [skillsInView, setSkillsInView] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
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
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView && !skillsInView) {
          setSkillsInView(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [skillsInView]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll just show a success message
      // In a real application, you would send this data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "TechNestle",
      description: "A dynamic platform where users can both learn and teach web development. Whether you're a novice or a seasoned professional, there's something for everyone.",
      tech: ["React", "Node.js", "MongoDB", "Express.js"],
      image: "/api/placeholder/400/250",
      liveUrl: "https://technestle.netlify.app/",
      githubUrl: "https://github.com/kalviumcommunity/S60_Sahanashre_Capstone_TechNestle"
    },
    {
      id: 2,
      title: "CodeWhiz",
      description: "A cross-platform mobile app built with React Native that answers coding-related questions instantly. It uses the Gemini API to deliver intelligent, real-time solutions for queries across various programming languages.",
      tech: ["React Native", "Gemini API", "JavaScript", "Mobile Development"],
      image: "/api/placeholder/400/250",
      liveUrl: "#",
      githubUrl: "https://github.com/Sahanashre-V/CodeWhiz"
    },
    {
      id: 3,
      title: "Library Management System",
      description: "A robust system for efficiently managing books, users, and borrowing records. Built with Docker for seamless deployment and containerization.",
      tech: ["Node.js", "Express.js", "MySQL", "Docker"],
      image: "/api/placeholder/400/250",
      liveUrl: "https://managelibrary.up.railway.app/",
      githubUrl: "https://github.com/Sahanashre-V/Library-Management"
    }
  ];

  const skills: Skill[] = [
    // Frontend Technologies - Advanced
    { name: "HTML", level: 95, icon: "🌐" },
    { name: "CSS", level: 90, icon: "🎨" },
    { name: "React.js", level: 95, icon: "⚛️" },
    { name: "React Native", level: 85, icon: "📱" },
    { name: "Tailwind CSS", level: 90, icon: "🎯" },
    { name: "Figma", level: 85, icon: "🎨" },
    
    // Backend Technologies - Intermediate
    { name: "Express.js", level: 75, icon: "🚀" },
    { name: "Node.js", level: 80, icon: "🟢" },
    { name: "Mongoose", level: 70, icon: "🍃" },
    { name: "JWT", level: 75, icon: "🔐" },
    { name: "Prisma ORM", level: 70, icon: "🔷" },
    
    // Programming Languages - Intermediate
    { name: "Python", level: 75, icon: "🐍" },
    { name: "C++", level: 80, icon: "⚙️" },
    { name: "JavaScript", level: 85, icon: "🟨" },
    
    // Databases - Intermediate
    { name: "MongoDB", level: 80, icon: "🍃" },
    { name: "MySQL", level: 75, icon: "🐬" },
    { name: "PostgreSQL", level: 70, icon: "🐘" },
    
    // DevOps - Intermediate
    { name: "Docker", level: 75, icon: "🐳" },
    
    // Other Tools - Intermediate
    { name: "Netlify", level: 80, icon: "🌐" },
    { name: "Render", level: 75, icon: "🚀" },
    { name: "Postman", level: 85, icon: "📬" },
    { name: "Bruno", level: 70, icon: "🐻" },
    { name: "Cloudinary", level: 75, icon: "☁️" },
    { name: "Firebase", level: 80, icon: "🔥" }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Sahanashre V
            </div>
            <div className="hidden md:flex space-x-8">
              {['hero', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-blue-400 transition-colors ${
                    activeSection === section ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {section === 'hero' ? 'home' : section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              Sahanashre V
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Full Stack Developer & UI/UX Enthusiast
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Passionate about creating exceptional digital experiences with modern web technologies and clean, efficient code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Photo placeholder with animated border */}
              <div className="w-80 h-80 mx-auto relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-2 bg-gray-800 rounded-full overflow-hidden">
                  {/* Replace this with your actual photo */}
                  {/* <img 
                    src="/api/placeholder/320/320" 
                    alt="Sahanashre V" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  /> */}
                  {/* Fallback if no image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">S</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I am a passionate full-stack developer with expertise in modern web technologies. 
                I love turning complex problems into simple, beautiful, and intuitive solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With a strong foundation in both frontend and backend development, I create 
                seamless user experiences backed by robust, scalable architectures.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I am not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community.
              </p>
              
              <div className="flex items-center gap-4 pt-6">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">sahanashre@example.com</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Available for remote work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className={`space-y-2 transform transition-all duration-700 ${
                  skillsInView 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-lg font-semibold text-gray-300">{skill.name}</span>
                  </div>
                  <span className="text-blue-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ 
                      width: skillsInView ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 100 + 200}ms`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10"
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 animate-pulse"></div>
                  <span className="text-white font-bold text-xl relative z-10">Project Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm hover:bg-blue-500/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a href={project.liveUrl} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                        <Github className="w-4 h-4" />
                        Code
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
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Let us work together</h3>
              <p className="text-gray-400 mb-8">
                I am always interested in hearing about new projects and opportunities. 
                Whether you have a project in mind or just want to chat about technology, 
                feel free to reach out!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-gray-400">sahanashre.v@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Phone</p>
                    <p className="text-gray-400">+91 96263 31196</p>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <a href="https://github.com/Sahanashre-V" className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center hover:bg-blue-500/30 transition-all duration-300 transform hover:scale-110">
                    <Github className="w-6 h-6 text-blue-400" />
                  </a>
                  <a href="https://www.linkedin.com/in/sahanashre-v" className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center hover:bg-blue-500/30 transition-all duration-300 transform hover:scale-110">
                    <Linkedin className="w-6 h-6 text-blue-400" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 hover:border-blue-400/50 transition-colors">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-vertical"
                    placeholder="Your message..."
                    required
                  />
                </div>
                
                {submitStatus && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus.includes('successfully') 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/50'
                  }`}>
                    {submitStatus}
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-white transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Sahanashre. Built with Next.js & TypeScript.
          </p>
        </div>
      </footer>

      <style jsx>{`
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
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;