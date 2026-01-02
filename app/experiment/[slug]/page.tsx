import { notFound } from "next/navigation"
import Image from "next/image"
import { TopNav } from "@/components/top-nav"

type Feature = {
  icon: string
  title: string
  description: string
}

type Experiment = {
  title: string
  tagline: string
  logo: string
  platform: "ios" | "macos"
  screenshots: string[]
  announcement?: string
  pills: string[]
  features: Feature[]
  actions: {
    primary?: { label: string; href: string }
    secondary?: { label: string; href: string }
  }
}

const experimentDetails: Record<string, Experiment> = {
  parrot: {
    title: "Parrot",
    tagline: "Unified chat inbox with Kanban UI and Autopilot",
    logo: "/experiments/parrot/logo.png",
    platform: "macos",
    screenshots: ["/experiments/parrot/screenshot.png"],
    pills: [
      "For Busy Inboxes",
      "Supporting Whatsapp, LinkedIn, Instagram, X, Telegram, etc",
    ],
    features: [
      {
        icon: "envelope",
        title: "One Inbox to rule them all.",
        description: "Have full overview and work through your communication dept in l",
      },
      {
        icon: "camera",
        title: "Scan Bills with your camera",
        description: "With on device OCR and local AI models Billy supports fully offline Bill scanning and analysis.",
      },
      {
        icon: "currency",
        title: "Multi Currency Support",
        description: "Billy detects and converts 36 currency on device.",
      },
      {
        icon: "pdf",
        title: "PDF Export",
        description: "Share your split bill with your friends in your groupchat by sharing a PDF file.",
      },
    ],
    actions: {
      primary: { label: "For macOS", href: "#" },
      secondary: { label: "send mail", href: "mailto:hello@parrot.app" },
    },
  },
  bill: {
    title: "Bill",
    tagline: "AI Bill splitting with your friends",
    logo: "/experiments/bill/logo.png",
    platform: "ios",
    screenshots: [
      "/experiments/bill/screenshot-1.png",
      "/experiments/bill/screenshot-2.png",
      "/experiments/bill/screenshot-3.png",
    ],
    announcement: "Thank you 10K Downloads in 2025",
    pills: [
      "For you and your friends",
      "Perfect for traveling",
    ],
    features: [
      {
        icon: "users",
        title: "One App for the whole Gang",
        description: "Split all Bills for the Group with only one Person having the App.",
      },
      {
        icon: "camera",
        title: "Scan Bills with your camera",
        description: "With on device OCR and local AI models Bill App supports fully offline Bill scanning and analysis.",
      },
      {
        icon: "currency",
        title: "Multi Currency Support",
        description: "Bill App detects and converts 36 currency on device.",
      },
      {
        icon: "pdf",
        title: "PDF Export",
        description: "Share your split bill with your friends in your groupchat by sharing a PDF file.",
      },
    ],
    actions: {
      primary: { label: "For iOS", href: "#" },
      secondary: { label: "Download", href: "#" },
    },
  },
}

function FeatureIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    envelope: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    camera: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
    currency: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    pdf: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    split: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    users: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    plane: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  }
  return <>{icons[type] || icons.envelope}</>
}

function ActionIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    desktop: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    mail: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    phone: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    apple: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  }
  return <>{icons[type] || icons.desktop}</>
}

function PillIcon({ slug, index }: { slug: string; index: number }) {
  if (slug === "bill") {
    if (index === 0) {
      return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    }
    return (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    )
  }
  // Default for parrot
  if (index === 0) {
    return (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    )
  }
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>
  )
}

export default async function ExperimentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const experiment = experimentDetails[slug]

  if (!experiment) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <TopNav
          tabs={["timeline", "experiments"]}
          currentPage={experiment.title.toLowerCase()}
          experiments={Object.entries(experimentDetails).map(([slug, exp]) => ({
            name: exp.title,
            slug,
          }))}
        />

        {/* Hero Section */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden">
              <Image src={experiment.logo} alt={experiment.title} width={64} height={64} className="object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-medium">{experiment.title}</h1>
              <p className="opacity-40">{experiment.tagline}</p>
            </div>
          </div>

          {experiment.actions && (
            <div className="flex items-center gap-4">
              {experiment.actions.primary && (
                <a href={experiment.actions.primary.href} className="flex items-center gap-2 opacity-40 hover:opacity-60 transition-opacity">
                  <ActionIcon type={slug === "bill" ? "phone" : "desktop"} />
                  {experiment.actions.primary.label}
                </a>
              )}
              {experiment.actions.secondary && (
                <a href={experiment.actions.secondary.href} className="flex items-center gap-2 hover:opacity-60 transition-opacity">
                  <ActionIcon type={slug === "bill" ? "apple" : "mail"} />
                  {experiment.actions.secondary.label}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Announcement */}
        {experiment.announcement && (
          <div className="text-center mb-8 opacity-60">
            {experiment.announcement}
          </div>
        )}

        {/* Screenshots */}
        {experiment.platform === "macos" ? (
          <div className="rounded-2xl shadow-lg overflow-hidden mb-6">
            <Image
              src={experiment.screenshots[0]}
              alt={`${experiment.title} screenshot`}
              width={1920}
              height={1200}
              className="w-full h-auto"
            />
          </div>
        ) : (
          <div className="flex justify-start gap-4 mb-6">
            {experiment.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="relative w-[280px] aspect-[9/19] rounded-[1.5rem] bg-zinc-800 shadow-lg overflow-hidden"
              >
                <Image
                  src={screenshot}
                  alt={`${experiment.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Pills */}
        <div className="flex items-center gap-6 mb-12">
          {experiment.pills.map((pill, index) => (
            <div key={index} className="flex items-center gap-2 opacity-40">
              <span className="w-4 h-4">
                <PillIcon slug={slug} index={index} />
              </span>
              {pill}
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-4 gap-4">
          {experiment.features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm min-h-[200px] flex flex-col">
              <div className="mb-auto opacity-40">
                <FeatureIcon type={feature.icon} />
              </div>
              <div>
                <h3 className="font-medium mb-1">{feature.title}</h3>
                <p className="opacity-40 text-xs leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  return Object.keys(experimentDetails).map((slug) => ({
    slug,
  }))
}
