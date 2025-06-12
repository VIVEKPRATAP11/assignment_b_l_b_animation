"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin)
}

interface GSAPLoaderProps {
  onComplete: () => void
}

export default function GSAPLoader({ onComplete }: GSAPLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create master timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(onComplete, 500)
        },
      })

      // Logo animation
      tl.fromTo(
        logoRef.current,
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
        },
      )

      // Progress bar animation
      tl.fromTo(
        progressRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            const progressValue = Math.round(this.progress() * 100)
            setProgress(progressValue)
          },
        },
        "-=0.5",
      )

      // Text animation
      const loadingTexts = ["Loading...", "Preparing your voyage...", "Discovering luxury boats...", "Welcome aboard!"]

      loadingTexts.forEach((text, index) => {
        tl.to(
          textRef.current,
          {
            text: {
              value: text,
              delimiter: "",
            },
            duration: 0.5,
            ease: "none",
          },
          index * 0.7,
        )
      })

      // Final exit animation
      tl.to(
        loaderRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "power2.in",
        },
        "+=0.5",
      )
    }, loaderRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={loaderRef} className="fixed inset-0 z-50 bg-[#0a192f] flex flex-col items-center justify-center">
      {/* Logo */}
      <div ref={logoRef} className="mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">LB</span>
        </div>
      </div>

      {/* Loading text */}
      <div ref={textRef} className="text-xl text-white mb-8 h-8" />

      {/* Progress bar */}
      <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div ref={progressRef} className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
      </div>

      {/* Progress percentage */}
      <div className="mt-4 text-sm text-gray-400">{progress}%</div>
    </div>
  )
}
