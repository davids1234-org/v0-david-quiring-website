"use client"

import { useEffect, useState } from "react"

type Platform = "mac-arm" | "mac-intel" | "windows" | "other"

const DOWNLOAD_URLS = {
  "mac-arm": "https://github.com/dvdqrng/parrot-tool/releases/download/v0.1.0-20260116185624-064d1b3/Parrot-0.1.0-arm64.dmg",
  "mac-intel": "https://github.com/dvdqrng/parrot-tool/releases/download/v0.1.0-20260116185624-064d1b3/Parrot-0.1.0.dmg",
  "windows": "https://github.com/dvdqrng/parrot-tool/releases/download/v0.1.0-20260116185624-064d1b3/Parrot.Setup.0.1.0.exe",
  "other": "https://github.com/dvdqrng/parrot-tool/releases/latest",
}

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "other"

  const userAgent = navigator.userAgent.toLowerCase()
  const platform = navigator.platform?.toLowerCase() || ""

  // Check for macOS
  if (platform.includes("mac") || userAgent.includes("macintosh")) {
    // Check for Apple Silicon (ARM)
    // Modern browsers on ARM Macs report this in userAgent or we can check via canvas
    if (
      userAgent.includes("arm") ||
      // @ts-expect-error - userAgentData is not in all browsers
      navigator.userAgentData?.platform === "macOS" &&
      // @ts-expect-error - userAgentData is not in all browsers
      navigator.userAgentData?.architecture === "arm"
    ) {
      return "mac-arm"
    }
    // Default to ARM for newer Macs (most common now)
    // We can also try to detect via WebGL renderer
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (gl) {
        const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info")
        if (debugInfo) {
          const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          if (renderer.toLowerCase().includes("apple m") || renderer.toLowerCase().includes("apple gpu")) {
            return "mac-arm"
          }
        }
      }
    } catch {
      // Fall through to default
    }
    // Default to ARM since most Macs sold since 2020 are ARM
    return "mac-arm"
  }

  // Check for Windows
  if (platform.includes("win") || userAgent.includes("windows")) {
    return "windows"
  }

  return "other"
}

export function DownloadButton() {
  const [platform, setPlatform] = useState<Platform>("other")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setPlatform(detectPlatform())
    setMounted(true)
  }, [])

  const downloadUrl = DOWNLOAD_URLS[platform]

  const label = mounted ? (
    platform === "mac-arm" || platform === "mac-intel" ? "Download for Mac" :
    platform === "windows" ? "Download for Windows" :
    "Download"
  ) : "Download"

  return (
    <a
      href={downloadUrl}
      className="inline-flex items-center gap-2 bg-black text-white rounded-full px-5 py-3 hover:bg-zinc-800 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      <span>{label}</span>
    </a>
  )
}
