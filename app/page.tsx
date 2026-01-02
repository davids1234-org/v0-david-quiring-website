"use client"

import { useState } from "react"
import Image from "next/image"
import { ProjectGrid } from "@/components/project-grid"

const tabs = ["vibe", "timeline", "projects"] as const
type Tab = (typeof tabs)[number]

const timelineData = [
  {
    years: "2022 - now",
    title: "building intelligent email",
    subtitle: "founder",
    link: "lovemail.so",
  },
  {
    years: "2019 - 2022",
    title: "bringing modern banking to mexico",
    subtitle: "vp design",
    link: "klar.mx",
  },
  {
    years: "2019 - 2022",
    title: "redesign banking",
    subtitle: "design lead",
    link: "n26.com",
  },
  {
    years: "2015 - 2017",
    title: "studying design",
    subtitle: "hfg-gmuend",
  },
  {
    years: "2012 - 2015",
    title: "practicing as a psychoanalyst",
  },
  {
    years: "2006 - 2012",
    title: "studying psychology",
  },
]

const vibeProjects = [
  { title: "SpaceX Spacesuit", year: "2015", slug: "spacex-spacesuit" },
  { title: "James Turrell for Guggenheim", year: "2013", slug: "james-turrell-guggenheim" },
  { title: "Atollo Lamp", year: "1977", slug: "atollo-lamp" },
  { title: "Apple iMac G4", year: "2002", slug: "apple-imac-g4" },
  { title: "Nothing Phone (1)", year: "2022", slug: "nothing-phone-1" },
  { title: "Braun SK 4", year: "1956", slug: "braun-sk-4" },
  { title: "Sony Walkman TPS-L2", year: "1979", slug: "sony-walkman-tps-l2" },
  { title: "Dieter Rams 606 Universal Shelving System", year: "1960", slug: "dieter-rams-606" },
  { title: "Eames Lounge Chair", year: "1956", slug: "eames-lounge-chair" },
  { title: "Helvetica Typeface", year: "1957", slug: "helvetica-typeface" },
  { title: "Porsche 911", year: "1964", slug: "porsche-911" },
  { title: "Boeing 747", year: "1969", slug: "boeing-747" },
  { title: "Google Material Design", year: "2014", slug: "google-material-design" },
  { title: "Leica M3", year: "1954", slug: "leica-m3" },
  { title: "Concorde", year: "1969", slug: "concorde" },
  { title: "Bauhaus Dessau", year: "1926", slug: "bauhaus-dessau" },
  { title: "NASA Apollo Guidance Computer", year: "1966", slug: "nasa-apollo-guidance-computer" },
  { title: "Swiss Army Knife", year: "1891", slug: "swiss-army-knife" },
]

const projectsData = [
  { name: "Parrot", category: "Productivity", year: "2025", slug: "parrot" },
  { name: "Bill", category: "Fintech", year: "2024", slug: "bill" },
  { name: "Lovemail", category: "Productivity", year: "2023", slug: "lovemail" },
  { name: "Klar", category: "Fintech", year: "2022", slug: "klar" },
  { name: "N26", category: "Fintech", year: "2021", slug: "n26" },
  { name: "Apple Card", category: "Fintech", year: "2019", slug: "apple-card" },
  { name: "Monzo", category: "Fintech", year: "2018", slug: "monzo" },
  { name: "Revolut", category: "Fintech", year: "2017", slug: "revolut" },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("timeline")

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header with profile and tabs */}
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="flex items-center gap-12 mb-16">
          <Image src="/professional-headshot.png" alt="David Quiring" width={80} height={80} className="rounded-full" />

          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-2xl transition-colors ${
                  activeTab === tab ? "text-white" : "text-zinc-600 hover:text-zinc-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Timeline content */}
        {activeTab === "timeline" && (
          <div className="space-y-20">
            {timelineData.map((item, index) => (
              <div key={index} className="grid grid-cols-[200px_1fr] gap-8">
                <div className="text-zinc-500 text-lg">{item.years}</div>
                <div className="space-y-2">
                  <h2 className="text-2xl text-white">{item.title}</h2>
                  {item.subtitle && <p className="text-zinc-500 text-lg">{item.subtitle}</p>}
                  {item.link && (
                    <a
                      href={`https://${item.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 text-lg hover:text-zinc-400 transition-colors inline-block"
                    >
                      {item.link}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vibe content */}
        {activeTab === "vibe" && (
          <div>
            <ProjectGrid />
          </div>
        )}

        {/* Projects content */}
        {activeTab === "projects" && (
          <div className="space-y-12">
            {projectsData.map((project, index) => (
              <div key={index} className="grid grid-cols-3 gap-8">
                <div className="text-white text-2xl">{project.name}</div>
                <div className="text-zinc-500 text-2xl">{project.category}</div>
                <div className="text-zinc-500 text-2xl">{project.year}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
