"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { TopNav } from "@/components/top-nav"

const tabs = ["timeline", "experiments"] as const
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

// Temporarily hidden - vibe tab data
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

const experimentsData = [
  { name: "Parrot", category: "Productivity", year: "2025", slug: "parrot" },
  { name: "Bill", category: "Fintech", year: "2024", slug: "bill" },
]

export default function HomePage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const initialTab = tabs.includes(tabParam as Tab) ? (tabParam as Tab) : "timeline"
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)

  useEffect(() => {
    if (tabParam && tabs.includes(tabParam as Tab)) {
      setActiveTab(tabParam as Tab)
    }
  }, [tabParam])

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <TopNav
          tabs={[...tabs]}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as Tab)}
        />

        {/* Timeline content */}
        {activeTab === "timeline" && (
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <div key={index} className="grid grid-cols-[140px_1fr] gap-6">
                <div className="opacity-40">{item.years}</div>
                <div className="space-y-1">
                  <h2 className="font-medium">{item.title}</h2>
                  {item.subtitle && <p className="opacity-40">{item.subtitle}</p>}
                  {item.link && (
                    <a
                      href={`https://${item.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-40 hover:opacity-60 transition-opacity inline-block"
                    >
                      {item.link}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experiments content */}
        {activeTab === "experiments" && (
          <div className="space-y-4">
            {experimentsData.map((experiment, index) => (
              <a
                key={index}
                href={`/experiment/${experiment.slug}`}
                className="grid grid-cols-3 gap-6 hover:opacity-60 transition-opacity"
              >
                <div className="font-medium">{experiment.name}</div>
                <div className="opacity-40">{experiment.category}</div>
                <div className="opacity-40">{experiment.year}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
