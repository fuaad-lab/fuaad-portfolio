
"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Menu,
  X,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const skillGroups = [
  {
    title: "Frontend Development",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "REST APIs", "Authentication"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "PostGIS"],
  },
  {
    title: "Creative Development",
    skills: ["GSAP", "ScrollTrigger", "Motion", "Interactive UI"],
  },
  {
    title: "Mobile Development",
    skills: ["React Native", "Expo"],
  },
  {
    title: "Tools & Workflow",
    skills: ["Git", "GitHub", "VS Code", "AI-assisted Development"],
  },
];

const projects = [
  {
    name: "HEL SUUQ",
    category: "Full-Stack Development",
    status: "Completed",
    description:
      "A full-stack e-commerce platform built to provide an online shopping experience.",
    technologies: ["JavaScript", "Node.js", "Express.js", "Database"],
    image: "/Screenshot (51).png",
    live: "https://helsuuq-market.vercel.app",
    github: "https://github.com/sahalsuuq88-boop/sahal-suuq.git",
  },
  {
    name: "NEXORA",
    category: "Backend Development",
    status: "In Progress",
    description:
      "A business and inventory management system with backend APIs for products, inventory, outlets, suppliers, and sales.",
    technologies: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "PostGIS"],
    image: "/Screenshot (53).png",
    github: "https://github.com/fuaad-lab/NEXORA-backend.git",
  },
  {
    name: "THE UNSEEN WORLD",
    category: "Creative Development",
    status: "In Progress",
    description:
      "An experimental creative web project exploring interactive animations and immersive visual experiences.",
    technologies: ["React", "JavaScript", "GSAP", "ScrollTrigger"],
    image: "/Screenshot (52).png",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const closeMenu = () => setMenuOpen(false);

  useGSAP(
    () => {
      // HERO ANIMATION
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
      })
        .from(
          ".hero-label",
          { y: 25, opacity: 0, duration: 0.7 },
          "-=0.3"
        )
        .from(
          ".hero-title > span",
          {
            y: 100,
            opacity: 0,
            rotateX: -40,
            duration: 1,
            stagger: 0.15,
          },
          "-=0.2"
        )
        .from(
          ".hero-description, .hero-actions, .hero-bottom",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          "-=0.5"
        );

      // SCROLL REVEAL ANIMATIONS
      const revealElements = gsap.utils.toArray(
        ".reveal",
        heroRef.current
      );

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            y: 45,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // PROJECT CARD HOVER ANIMATION
      const cards = gsap.utils.toArray(
        ".project-card",
        heroRef.current
      );

      cards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            y: -7,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        // Remove listeners when the animation context is cleaned up
        gsap.context(() => {
          return () => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          };
        });
      });
    },
    { scope: heroRef }
  );

  return (
    <main
      id="home"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#09090d] text-white"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[130px]" />

      {/* NAVIGATION */}
      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-12">
        <a
          href="#home"
          onClick={closeMenu}
          className="nav-item text-xl font-bold tracking-tight"
        >
          FUAAD<span className="text-purple-400">.</span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-9 text-sm text-white/60 md:flex">
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition hover:text-purple-400"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm transition hover:border-purple-400 hover:bg-purple-400/10 md:flex"
        >
          Let's Talk <ArrowUpRight size={16} />
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-white/10 p-2 transition hover:bg-white/10 md:hidden"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="absolute left-0 right-0 top-full mx-6 rounded-2xl border border-white/10 bg-[#14141b] p-6 shadow-2xl md:hidden">
            <div className="flex flex-col gap-6">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={closeMenu}
                  className="text-base text-white/70 transition hover:text-purple-400"
                >
                  {item}
                </a>
              ))}

              <a
                href="#contact"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white"
              >
                Let's Talk <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-6 pb-20 pt-16 md:px-12">
        <div className="max-w-5xl">
          <div className="hero-label mb-8 flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
              Self-Taught Developer · Hargeisa, Somaliland
            </p>
          </div>

          <h1 className="hero-title overflow-hidden text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.075em]">
            <span className="block">Building</span>
            <span className="block text-white/35">Digital</span>
            <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">
              Experiences.
            </span>
          </h1>

          <p className="hero-description mt-9 max-w-xl text-base leading-8 text-white/55 md:text-lg">
            I'm Fuaad, a self-taught Full-Stack Developer creating modern web
            applications, thoughtful interfaces, and interactive digital
            experiences.
          </p>

          <div className="hero-actions mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-purple-200"
            >
              Explore My Work
              <ArrowUpRight
                size={18}
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="https://github.com/fuaad-lab"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm text-white/75 transition hover:border-white/50 hover:text-white"
            >
              <Code2 size={17} /> GitHub
            </a>
          </div>
        </div>

        <div className="hero-bottom mt-20 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/35">
            Full-Stack Development · Creative Technology
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com/in/fuaad-ibraahin-4738b4387"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-white/45 transition hover:text-white"
            >
              <ExternalLink size={19} />
            </a>

            <a
              href="https://github.com/fuaad-lab"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-white/45 transition hover:text-white"
            >
              <Code2 size={19} />
            </a>

            <span className="text-xs text-white/35">© 2026</span>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="relative bg-[#0d0d12] px-6 py-28 md:px-16 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="reveal mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            About Me
          </p>

          <div className="grid gap-12 md:grid-cols-2">
            <h2 className="reveal text-4xl font-bold leading-tight text-white md:text-5xl">
              Turning ideas into
              <span className="text-purple-400"> digital experiences.</span>
            </h2>

            <div className="reveal">
              <p className="text-lg leading-8 text-gray-400">
                I'm a self-taught Full-Stack Developer based in Hargeisa,
                Somaliland. I enjoy building modern web applications,
                developing backend systems, and creating interactive
                digital experiences.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-400">
                My focus is on writing clean code, solving problems,
                learning new technologies, and turning ideas into
                practical products.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Frontend Development",
                  "Backend Development",
                  "UI/UX Design",
                  "Creative Animation",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        id="skills"
        className="bg-[#09090d] px-6 py-28 md:px-16 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="reveal mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            My Skills
          </p>

          <h2 className="reveal mb-5 text-4xl font-bold text-white md:text-5xl">
            Technologies I Work With.
          </h2>

          <p className="reveal mb-14 max-w-2xl leading-7 text-gray-400">
            Tools and technologies I use to build modern applications,
            backend systems, and interactive experiences.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="reveal rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition duration-300 hover:border-purple-500/40"
              >
                <h3 className="mb-6 text-xl font-semibold text-white">
                  {group.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="bg-[#0d0d12] px-6 py-28 md:px-16 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="reveal mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            Selected Work
          </p>

          <h2 className="reveal mb-5 text-4xl font-bold text-white md:text-5xl">
            Projects I've Built.
          </h2>

          <p className="reveal mb-14 max-w-2xl leading-7 text-gray-400">
            A selection of projects showcasing my experience in full-stack
            development, backend systems, and creative web animation.
          </p>

          <div className="grid gap-7 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="project-card reveal overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/20"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[#15151c]">
                  <Image
                    src={project.image}
                    alt={`${project.name} project screenshot`}
                    fill
                    priority={project.name === "HEL SUUQ"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-7">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-widest text-purple-400">
                      {project.category}
                    </span>

                    <span
                      className={`text-xs ${project.status === "Completed"
                          ? "text-green-400"
                          : "text-yellow-400"
                        }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-white">
                    {project.name}
                  </h3>

                  <p className="mb-6 min-h-14 leading-7 text-gray-400">
                    {project.description}
                  </p>

                  <div className="mb-7 flex flex-wrap gap-2">
                    {project.technologies.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-white/5 px-3 py-2 text-xs text-gray-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-5 text-sm font-medium">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-white transition hover:text-purple-400"
                      >
                        Live Website <ArrowUpRight size={16} />
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-gray-400 transition hover:text-purple-400"
                      >
                        GitHub <Code2 size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="relative overflow-hidden bg-[#09090d] px-6 py-28 md:px-16 lg:px-24"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl">
          <p className="reveal mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            Get In Touch
          </p>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="reveal">
              <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                Let's build something
                <span className="text-purple-400"> great together.</span>
              </h2>

              <p className="mt-6 max-w-lg leading-8 text-gray-400">
                I'm open to software development internships, junior developer
                opportunities, collaborations, and exciting projects.
              </p>

              <a
                href="mailto:fuaadi174@gmail.com"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-purple-600 px-7 py-4 font-semibold text-white transition hover:bg-purple-500"
              >
                Let's Talk <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="reveal flex flex-col justify-center gap-7">
              <div className="border-b border-white/10 pb-6">
                <p className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                  <Mail size={15} /> Email
                </p>
                <a
                  href="mailto:fuaadi174@gmail.com"
                  className="break-all text-lg text-white hover:text-purple-400"
                >
                  fuaadi174@gmail.com
                </a>
              </div>

              <div className="border-b border-white/10 pb-6">
                <p className="mb-2 text-sm text-gray-500">GitHub</p>
                <a
                  href="https://github.com/fuaad-lab"
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg text-white hover:text-purple-400"
                >
                  github.com/fuaad-lab ↗
                </a>
              </div>

              <div className="border-b border-white/10 pb-6">
                <p className="mb-2 text-sm text-gray-500">LinkedIn</p>
                <a
                  href="https://linkedin.com/in/fuaad-ibraahin-4738b4387"
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg text-white hover:text-purple-400"
                >
                  LinkedIn Profile ↗
                </a>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={15} /> Location
                </p>
                <p className="text-lg text-white">Hargeisa, Somaliland</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#09090d] px-6 py-8 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <a
            href="#home"
            className="text-xl font-bold tracking-widest text-white"
          >
            FUAAD<span className="text-purple-400">.</span>
          </a>

          <p className="text-center text-sm text-gray-500">
           © {year || "2026"} Fuaad Ibraahim Abdi. All rights reserved.
          </p>

          <a
            href="#home"
            className="text-sm text-gray-400 transition hover:text-purple-400"
          >
            Back to Top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
