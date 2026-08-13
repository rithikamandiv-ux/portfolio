"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import Shuffle from '@/components/ui/Shuffle'
import ParticleText from "@/components/ui/ParticleText";

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
  { title: "Tools", items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Figma", "Maven", "Vercel"] },
  { title: "Data & Machine Learning", items: ["Pandas", "NumPy", "Scikit-learn", "FastF1"] },
] as const;

const PROJECTS = [
  {
    title: "Cyber Log Analyzer",
    year: "2026",
    desc: "A production-style cybersecurity log analysis platform with a React frontend, Node.js backend, and PostgreSQL database for uploading, parsing, and investigating security logs.",
    points: [
      "Implemented JWT-based authentication for secure user sessions.",
      "Built a file upload pipeline that parses raw log files and stores structured entries in PostgreSQL.",
      "Designed a dashboard surfacing security alerts, threat summaries, and log statistics in real time.",
      "Exposed a RESTful API for log ingestion, querying, and alert management.",
    ],
    tags: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "REST API"],
    github: "https://github.com/rithikamandiv-ux/cyber-log-analyzer",
  },
  {
    title: "BudgetWise",
    year: "2026",
    desc: "A full-stack personal finance management application with AI-powered budget forecasting, built using React, Node.js, PostgreSQL, and a Python FastAPI forecasting service.",
    points: [
      "Built a React and TypeScript frontend for managing income, expenses, budgets, and financial categories.",
      "Developed a Node.js and Express API layer for handling finance-related CRUD operations.",
      "Used PostgreSQL for structured financial data storage.",
      "Integrated a Python FastAPI microservice for budget forecasting and overspending prediction.",
    ],
    tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Python", "FastAPI"],
    github: "https://github.com/rithikamandiv-ux/budgetwise",
  },
  {
    title: "F1 Winner Prediction System",
    year: "2026",
    desc: "A Python machine-learning pipeline that predicts Formula 1 race winners using historical data collected via FastF1 across multiple seasons.",
    points: [
      "Automated multi-season dataset generation using the FastF1 API for historical race data collection.",
      "Engineered features from lap times, driver standings, and circuit characteristics using Pandas.",
      "Trained and evaluated classification models with Scikit-learn, optimising for prediction accuracy.",
      "Built an end-to-end prediction pipeline covering data ingestion, preprocessing, and inference.",
    ],
    tags: ["Python", "FastF1", "Pandas", "Scikit-learn", "Machine Learning"],
    github: "https://github.com/rithikamandiv-ux/F1-winner-prediction",
  },
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
    title: "Portfolio Website",
    year: "2026",
    desc: "This portfolio — a modern, animated single-page application featuring a particle-text name reveal, shuffle subtitle animation, responsive navigation, and project showcase.",
    points: [
      "Built with Next.js and TypeScript for a performant, type-safe application structure.",
      "Implemented an animated hero with particle-text name reveal and shuffle subtitle.",
      "Used Framer Motion for scroll-triggered reveal animations across sections.",
      "Deployed to Vercel with responsive layouts optimised for desktop, tablet, and mobile.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
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
            className="flex h-10 w-11 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMenuOpen ? "close" : "open"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="inline-block"
              >
                {isMenuOpen ? "✕" : "☰"}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="border-t border-white/10 bg-[#0b0b12]/95 px-6 py-5 backdrop-blur-md lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white/70 hover:text-[#C9ADA7]"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 rounded-full bg-[#C9ADA7] px-5 py-3 text-center text-sm font-semibold text-[#22223B] hover:bg-[#F2E9E4]"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.04, duration: 0.2 }}
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <Reveal>
        <section id="home" className="px-6 pb-24 pt-36">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
                ● Available for Opportunities
              </span>

              {/* ParticleText name — two lines, gather once on mount, white-only */}
              <div className="mt-6" aria-label="Rithika Mandiv">
                <ParticleText
                  text="Rithika"
                  color="#F2E9E4"
                  highlightColor="#F2E9E4"
                  trigger="mount"
                  fontSize="clamp(3.2rem, 12vw, 5.5rem)"
                  fontWeight={700}
                  fontFamily="inherit"
                  textAlign="left"
                  density={3}
                  particleSize={2}
                  scatter={160}
                  gatherDuration={1400}
                  stagger={380}
                  idleDrift={0}
                  pointerRepel={42}
                  repelRadius={120}
                  glow={false}
                  className="h-[80px] md:h-[110px] lg:h-[140px]"
                />
                <ParticleText
                  text="Mandiv"
                  color="#C9ADA7"
                  highlightColor="#C9ADA7"
                  trigger="mount"
                  fontSize="clamp(3.2rem, 12vw, 5.5rem)"
                  fontWeight={700}
                  fontFamily="inherit"
                  textAlign="left"
                  density={3}
                  particleSize={2}
                  scatter={160}
                  gatherDuration={1400}
                  stagger={380}
                  idleDrift={0}
                  pointerRepel={42}
                  repelRadius={120}
                  glow={false}
                  className="h-[80px] md:h-[110px] lg:h-[140px]"
                />
              </div>

              {/* Shuffle subtitle — plays once on scroll-enter, no hover replay, no loop */}
              <div className="mt-8">
                <Shuffle
                  text="Software Engineering Undergraduate"
                  tag="p"
                  className="text-xl font-semibold md:text-2xl"
                  style={{ color: "#ffffff", textAlign: "left", fontFamily: "inherit" }}
                  shuffleDirection="up"
                  duration={0.7}
                  stagger={0.04}
                  shuffleTimes={2}
                  animationMode="evenodd"
                  loop={false}
                  triggerOnce={true}
                  triggerOnHover={true}
                  threshold={0.1}
                  rootMargin="0px"
                />
              </div>

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
