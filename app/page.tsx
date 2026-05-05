"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";

/* ── Animation variant ── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Data ── */

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
] as const;

const SKILLS = [
  { title: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
  { title: "Backend & Frameworks", items: ["Node.js", "Express", "PHP"] },
  { title: "Programming Languages", items: ["Java", "Python", "TypeScript"] },
  { title: "Databases", items: ["PostgreSQL", "MySQL", "SQLite"] },
  { title: "Tools", items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Figma", "Maven"] },
] as const;

const PROJECTS = [
  {
    title: "Clinic Insurance System",
    year: "2026",
    desc: "A desktop application for managing clinic operations — patients, doctors, appointments, medical records, insurance policies, and claims — built with Java and JavaFX.",
    points: [
      "Designed a layered architecture (model → service → UI → util) following OOP best practices.",
      "Implemented comprehensive input validation for numeric fields, dates, and entity relationships.",
      "Built file-based data persistence for all entities using serialisation.",
      "Managed complex entity relationships across six interconnected modules.",
    ],
    tags: ["Java", "JavaFX", "Maven", "OOP", "File I/O"],
    github: "https://github.com/rithikamandiv-ux/Clinic-insurance-system",
  },
  {
    title: "Expense Recorder",
    year: "2026",
    desc: "A full-stack web application for managing personal expenses with server-side rendering and real-time dynamic updates.",
    points: [
      "Built RESTful CRUD endpoints with Express and SQLite for persistent storage.",
      "Implemented AJAX-powered dynamic updates without full page reloads.",
      "Rendered views server-side using EJS templates for fast initial loads.",
    ],
    tags: ["Node.js", "Express", "SQLite", "EJS", "jQuery"],
    github: "https://github.com/rithikamandiv-ux/expenseRecorder",
  },
  {
    title: "F1 Winner Prediction System",
    year: "2026",
    desc: "A Python machine-learning project that predicts Formula 1 race winners by analysing historical race data and driver performance trends.",
    points: [
      "Cleaned and preprocessed large datasets using Pandas and NumPy.",
      "Trained and evaluated classification models with Scikit-learn.",
      "Analysed feature importance to identify key predictors of race outcomes.",
    ],
    tags: ["Python", "Pandas", "Scikit-learn", "Machine Learning"],
    github: "https://github.com/rithikamandiv-ux/F1-winner-prediction",
  },
  {
    title: "BudgetWise",
    year: "2026",
    desc: "A full-stack budgeting application with a React frontend, Node.js REST API, and PostgreSQL database for managing income, expenses, and budgets.",
    points: [
      "Designed category-based budget tracking with real-time dashboard summaries.",
      "Built a RESTful API with Express for all CRUD operations.",
      "Implemented a responsive dark-themed UI with React and CSS.",
    ],
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    github: "https://github.com/rithikamandiv-ux/budgetwise",
  },
  {
    title: "Portfolio Website",
    year: "2026",
    desc: "This portfolio — a modern, animated single-page application built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    points: [],
    github: "https://github.com/rithikamandiv-ux/portfolio",
  },
] as const;

const EDUCATION = [
  {
    title: "BEng (Hons) Software Engineering",
    place: "Informatics Institute of Technology (IIT), University of Westminster",
    date: "2025 – Present",
    desc: "Currently studying Software Engineering with a focus on programming, web development, databases, and software design principles.",
  },
  {
    title: "Foundation Certificate in Higher Education",
    place: "Informatics Institute of Technology (IIT)",
    date: "Completed 2025",
    desc: "Completed foundation studies with Merit, covering computing fundamentals and introduction to programming.",
  },
  {
    title: "GCE Ordinary Level (O/L)",
    place: "Mahinda Rajapakse College",
    date: "2024",
    desc: "Completed Ordinary Level education before progressing into higher education in software engineering.",
  },
] as const;

const ACHIEVEMENTS = [
  {
    title: "Web Development — Professional Certificate",
    place: "Informatics Institute of Technology (IIT)",
    status: "Distinction",
    desc: "Achieved Distinction while learning core web development concepts including HTML, CSS, and JavaScript.",
  },
  {
    title: "Python Programming — Professional Certificate",
    place: "Informatics Institute of Technology (IIT)",
    status: "Completed",
    desc: "Gained a strong foundation in Python including logic building, functions, and problem-solving.",
  },
] as const;

/* ── Component ── */

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const fullText = "Software Engineering Undergraduate";
  const [typedText, setTypedText] = useState("");

  /* Track which section is in view */
  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "education", "achievements", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Typing animation */
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [fullText]);

  const navLinkClass = (section: string) =>
    `text-sm transition ${activeSection === section
      ? "text-[#C9ADA7]"
      : "text-[#F2E9E4]/70 hover:text-[#C9ADA7]"
    }`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-[#F2E9E4]">
      {/* ── Background ── */}
      <div className="fixed inset-0 -z-10 bg-[#0b0b12]">
        <div className="stars" />
        <div className="stars stars2" />
      </div>

      {/* ── Navbar ── */}
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#0b0b12]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9ADA7] font-bold text-[#22223B]">
              &lt;/&gt;
            </div>
            <span className="text-xl font-bold">Rithika</span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={navLinkClass(link.label.toLowerCase())}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden rounded-full bg-[#C9ADA7] px-5 py-2 text-sm font-semibold text-[#22223B] hover:bg-[#F2E9E4] lg:block"
          >
            Contact Me
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-xl border border-white/10 px-3 py-2 text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="border-t border-white/10 bg-[#0b0b12]/95 px-6 py-5 backdrop-blur-md lg:hidden">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/70 hover:text-[#C9ADA7]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 rounded-full bg-[#C9ADA7] px-5 py-3 text-center text-sm font-semibold text-[#22223B] hover:bg-[#F2E9E4]"
              >
                Contact Me
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <Reveal>
        <section id="home" className="px-6 pb-24 pt-36">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
                ● Available for Opportunities
              </span>

              <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
                Rithika <br />
                <span className="text-[#C9ADA7]">Mandiv</span>
              </h1>

              <p className="mt-4 text-xl text-white/70">
                {typedText}
                <span className="ml-1 animate-pulse text-[#C9ADA7]">|</span>
              </p>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#F2E9E4]/80">
                I design and build software across web, desktop, and data
                systems from full-stack apps to Java desktop tools and Python
                ML pipelines.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-full bg-[#C9ADA7] px-6 py-3 font-semibold text-[#22223B] hover:bg-[#F2E9E4]"
                >
                  View My Work
                </a>
              </div>

              <div className="mt-6 flex gap-5 text-white/70">
                <a
                  href="https://github.com/rithikamandiv-ux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C9ADA7]"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/rithika-mandiv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C9ADA7]"
                >
                  LinkedIn
                </a>
                <a href="mailto:rithikamandiv@gmail.com" className="hover:text-[#C9ADA7]">
                  Email
                </a>
              </div>
            </div>

            {/* Profile image */}
            <div className="flex justify-center">
              <div className="absolute h-[26rem] w-[26rem] rounded-full bg-[#C9ADA7]/10 blur-3xl" />
              <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-[#C9ADA7]/40 bg-black/40 shadow-[0_0_60px_rgba(201,173,167,0.25)] md:h-[24rem] md:w-[24rem]">
                <img
                  src="/profile.jpg"
                  alt="Rithika Mandiv"
                  className="h-full w-full object-cover object-[25%_30%]"
                />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── About ── */}
      <Reveal>
        <section id="about" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9ADA7]">
                Get to know me
              </p>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                About <span className="text-[#C9ADA7]">Me</span>
              </h2>
            </div>

            <div className="mt-16 grid gap-10 md:grid-cols-2">
              {/* Text */}
              <div className="space-y-6 text-lg leading-8 text-[#F2E9E4]/80">
                <p>
                  Hi, I&apos;m Rithika Mandiv — a Software Engineering
                  undergraduate who enjoys solving problems through software,
                  from full-stack web apps and Java desktop systems to Python
                  data projects.
                </p>

                <p>
                  I learn best by building real projects, and I&apos;m constantly
                  expanding my skills across frontend, backend, and data
                  engineering.
                </p>

                <div className="space-y-3 pt-4 text-base text-white/65">
                  <p>• Software Engineering Undergraduate</p>
                  <p>• Experienced across web, desktop, and data domains</p>
                  <p>• Open to learning, projects, and opportunities</p>
                </div>
              </div>

              {/* Education card */}
              <div className="flex items-start">
                <div className="w-full rounded-3xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur-md">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#C9ADA7]">
                    Education
                  </p>
                  <h3 className="mt-4 text-2xl font-bold">
                    BEng Software Engineering
                  </h3>
                  <p className="mt-3 text-white/70">
                    Informatics Institute of Technology
                  </p>
                  <p className="mt-1 text-white/50">University of Westminster</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Skills ── */}
      <Reveal>
        <section id="skills" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9ADA7]">
                What I work with
              </p>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                My <span className="text-[#C9ADA7]">Skills</span>
              </h2>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SKILLS.map((group) => (
                <div
                  key={group.title}
                  className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition hover:border-[#C9ADA7]/40"
                >
                  <h3 className="text-xl font-bold">{group.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-[#C9ADA7] hover:text-[#C9ADA7]"
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
      </Reveal>

      {/* ── Projects ── */}
      <section id="projects" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#C9ADA7]">
              What I&apos;ve built
            </p>
            <h2 className="mt-4 text-center text-4xl font-bold md:text-5xl">
              Featured <span className="text-[#C9ADA7]">Projects</span>
            </h2>
          </Reveal>

          <div className="mt-16 space-y-10">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.08}>
                <div className="group rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C9ADA7]/40 hover:shadow-[0_0_40px_rgba(201,173,167,0.15)]">
                  <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-3xl font-bold transition group-hover:text-[#C9ADA7]">
                        {project.title}
                      </h3>
                      <p className="mt-4 max-w-3xl text-lg leading-8 text-white/60">
                        {project.desc}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm text-white/50">{project.year}</p>
                  </div>

                  {project.points.length > 0 && (
                    <ul className="mt-8 space-y-3 text-white/65">
                      {project.points.map((point) => (
                        <li key={point}>• {point}</li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-[#C9ADA7] hover:text-[#C9ADA7]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.github && (
                    <div className="mt-8">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 transition hover:border-[#C9ADA7] hover:text-[#C9ADA7]"
                      >
                        GitHub →
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <Reveal>
        <section id="education" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9ADA7]">
              Education
            </p>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Academic <span className="text-[#C9ADA7]">Background</span>
            </h2>

            <div className="mt-10 space-y-8">
              {EDUCATION.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md transition hover:border-[#C9ADA7]/40"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                      <p className="mt-2 text-white/60">{item.place}</p>
                      <p className="mt-6 max-w-3xl text-white/60">{item.desc}</p>
                    </div>
                    <p className="shrink-0 text-sm text-white/50">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Achievements ── */}
      <Reveal>
        <section id="achievements" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9ADA7]">
              Achievements
            </p>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Certifications <span className="text-[#C9ADA7]">&amp; Awards</span>
            </h2>

            <div className="mt-16 space-y-8">
              {ACHIEVEMENTS.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C9ADA7]/40"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold transition group-hover:text-[#C9ADA7]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-white/60">{item.place}</p>
                      <p className="mt-4 text-white/60">{item.desc}</p>
                    </div>
                    <p className="shrink-0 text-sm text-white/50">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Contact ── */}
      <Reveal>
        <section id="contact" className="px-6 py-24">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9ADA7]">
              Get in touch
            </p>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Contact <span className="text-[#C9ADA7]">Me</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-white/70">
              I&apos;m open to opportunities, collaborations, and projects.
              Feel free to reach out.
            </p>

            <div className="mt-12 flex flex-col gap-4 md:flex-row md:justify-center">
              <a
                href="mailto:rithikamandiv@gmail.com"
                className="rounded-2xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md transition hover:bg-[#C9ADA7] hover:text-[#22223B]"
              >
                Email Me
              </a>
              <a
                href="https://github.com/rithikamandiv-ux"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md transition hover:bg-[#C9ADA7] hover:text-[#22223B]"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/rithika-mandiv"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md transition hover:bg-[#C9ADA7] hover:text-[#22223B]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-6 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Rithika Mandiv. All rights reserved.
      </footer>
    </main>
  );
}
