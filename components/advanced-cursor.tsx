"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

type CursorVariant = "default" | "text" | "link" | "button" | "image" | "video" | "slider" | "explore" | "discover"

interface CursorState {
  variant: CursorVariant
  text?: string
  color?: string
}

export default function AdvancedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  const [cursorState, setCursorState] = useState<CursorState>({
    variant: "default",
    text: "",
    color: "white",
  })

  const [isVisible, setIsVisible] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Enhanced spring physics for ultra-smooth movement
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Dot follows cursor with minimal delay
  const dotSpringConfig = { damping: 30, stiffness: 800, mass: 0.2 }
  const dotX = useSpring(mouseX, dotSpringConfig)
  const dotY = useSpring(mouseY, dotSpringConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)

      requestAnimationFrame(() => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible, mouseX, mouseY])

  useEffect(() => {
    const handleElementInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check for data attributes first
      const cursorType = target.getAttribute("data-cursor")
      const cursorText = target.getAttribute("data-cursor-text")
      const cursorColor = target.getAttribute("data-cursor-color")

      if (cursorType) {
        setCursorState({
          variant: cursorType as CursorVariant,
          text: cursorText || "",
          color: cursorColor || "white",
        })
        return
      }

      // Enhanced element type detection with better text
      if (target.tagName === "A" || target.closest("a")) {
        const linkText = target.textContent?.toLowerCase()
        if (linkText?.includes("view") || linkText?.includes("explore")) {
          setCursorState({ variant: "explore", text: "Explore", color: "cyan" })
        } else if (linkText?.includes("discover") || linkText?.includes("learn")) {
          setCursorState({ variant: "discover", text: "Discover", color: "blue" })
        } else {
          setCursorState({ variant: "link", text: "Navigate", color: "blue" })
        }
      } else if (target.tagName === "BUTTON" || target.closest("button")) {
        const buttonText = target.textContent?.toLowerCase()
        if (buttonText?.includes("book") || buttonText?.includes("reserve")) {
          setCursorState({ variant: "button", text: "Reserve", color: "emerald" })
        } else if (buttonText?.includes("contact") || buttonText?.includes("call")) {
          setCursorState({ variant: "button", text: "Contact", color: "blue" })
        } else if (buttonText?.includes("view") || buttonText?.includes("collection")) {
          setCursorState({ variant: "button", text: "View", color: "cyan" })
        } else {
          setCursorState({ variant: "button", text: "Interact", color: "emerald" })
        }
      } else if (
        target.classList.contains("hover-image") ||
        target.closest(".hover-image") ||
        target.tagName === "IMG"
      ) {
        setCursorState({ variant: "image", text: "Zoom", color: "purple" })
      } else if (target.classList.contains("hover-video") || target.closest(".hover-video")) {
        setCursorState({ variant: "video", text: "Watch", color: "red" })
      } else if (
        target.classList.contains("hover-slider") ||
        target.closest(".hover-slider") ||
        target.closest("[data-carousel]")
      ) {
        setCursorState({ variant: "slider", text: "Swipe", color: "orange" })
      } else if (
        target.classList.contains("hover-text") ||
        target.closest(".hover-text") ||
        target.tagName === "P" ||
        target.tagName === "H1" ||
        target.tagName === "H2" ||
        target.tagName === "H3"
      ) {
        setCursorState({ variant: "text", text: "Read", color: "slate" })
      } else {
        setCursorState({ variant: "default", text: "", color: "white" })
      }
    }

    const handleMouseOut = () => {
      setCursorState({ variant: "default", text: "", color: "white" })
    }

    window.addEventListener("mouseover", handleElementInteraction)
    window.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mouseover", handleElementInteraction)
      window.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  // Enhanced cursor size and styling based on variant
  const getCursorProperties = () => {
    switch (cursorState.variant) {
      case "link":
      case "explore":
        return {
          width: 90,
          height: 90,
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(147, 197, 253, 0.3))",
          border: "2px solid rgba(59, 130, 246, 0.6)",
          shadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
        }
      case "button":
        return {
          width: 85,
          height: 85,
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(110, 231, 183, 0.3))",
          border: "2px solid rgba(16, 185, 129, 0.6)",
          shadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
        }
      case "image":
        return {
          width: 110,
          height: 110,
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(196, 181, 253, 0.3))",
          border: "2px solid rgba(139, 92, 246, 0.6)",
          shadow: "0 8px 32px rgba(139, 92, 246, 0.3)",
        }
      case "video":
        return {
          width: 100,
          height: 100,
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(252, 165, 165, 0.3))",
          border: "2px solid rgba(239, 68, 68, 0.6)",
          shadow: "0 8px 32px rgba(239, 68, 68, 0.3)",
        }
      case "slider":
        return {
          width: 130,
          height: 70,
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.4), rgba(251, 191, 36, 0.3))",
          border: "2px solid rgba(245, 158, 11, 0.6)",
          shadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
        }
      case "text":
        return {
          width: 70,
          height: 70,
          background: "linear-gradient(135deg, rgba(100, 116, 139, 0.4), rgba(148, 163, 184, 0.3))",
          border: "2px solid rgba(100, 116, 139, 0.6)",
          shadow: "0 8px 32px rgba(100, 116, 139, 0.3)",
        }
      case "discover":
        return {
          width: 95,
          height: 95,
          background: "linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(103, 232, 249, 0.3))",
          border: "2px solid rgba(6, 182, 212, 0.6)",
          shadow: "0 8px 32px rgba(6, 182, 212, 0.3)",
        }
      default:
        return {
          width: 45,
          height: 45,
          background: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          shadow: "0 4px 16px rgba(255, 255, 255, 0.1)",
        }
    }
  }

  const { width, height, background, border, shadow } = getCursorProperties()

  return (
    <>
      <style jsx global>{`
        html, body {
          cursor: none !important;
        }
        
        a, button, img, p, h1, h2, h3, .hover-image, .hover-video, .hover-slider, .hover-text, 
        [data-cursor], [data-cursor-text], [data-cursor-color], [data-carousel] {
          cursor: none !important;
        }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <>
            {/* Main cursor circle with enhanced styling */}
            <motion.div
              ref={cursorRef}
              className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                width,
                height,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                x: springX,
                y: springY,
                translateX: `-50%`,
                translateY: `-50%`,
                background,
                border,
                boxShadow: shadow,
                willChange: "transform",
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.6,
              }}
            >
              {/* Enhanced text rendering with better animations */}
              <AnimatePresence mode="wait">
                {cursorState.variant !== "default" && cursorState.text && (
                  <motion.div
                    key={cursorState.text}
                    className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                    initial={{ opacity: 0, scale: 0.3, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.3, rotateX: 90 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{
                      fontSize: width > 100 ? "14px" : width > 80 ? "12px" : "10px",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "white",
                      textShadow: "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(255, 255, 255, 0.2)",
                      lineHeight: "1",
                      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                      zIndex: 1,
                      textAlign: "center",
                    }}
                  >
                    {cursorState.text}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced fallback text with better styling */}
              <AnimatePresence mode="wait">
                {cursorState.variant !== "default" && !cursorState.text && (
                  <motion.div
                    key={cursorState.variant}
                    className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                    initial={{ opacity: 0, scale: 0.3, rotateY: -180 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.3, rotateY: 180 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{
                      fontSize: width > 100 ? "14px" : width > 80 ? "12px" : "10px",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "white",
                      textShadow: "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(255, 255, 255, 0.2)",
                      lineHeight: "1",
                      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                      zIndex: 1,
                    }}
                  >
                    {cursorState.variant === "link" && "NAVIGATE"}
                    {cursorState.variant === "button" && "INTERACT"}
                    {cursorState.variant === "image" && "ZOOM"}
                    {cursorState.variant === "video" && "WATCH"}
                    {cursorState.variant === "slider" && "SWIPE"}
                    {cursorState.variant === "text" && "READ"}
                    {cursorState.variant === "explore" && "EXPLORE"}
                    {cursorState.variant === "discover" && "DISCOVER"}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced special elements for specific variants */}
              {cursorState.variant === "slider" && !cursorState.text && (
                <motion.div
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className="text-white font-bold"
                    style={{
                      fontSize: "16px",
                      textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                    }}
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                  >
                    ←→
                  </motion.span>
                </motion.div>
              )}

              {cursorState.variant === "video" && !cursorState.text && (
                <motion.div
                  className="w-6 h-6 rounded-full bg-white/90 shadow-lg flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                    rotate: [0, 360],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-0 h-0 border-l-[6px] border-l-black border-y-[3px] border-y-transparent ml-0.5" />
                </motion.div>
              )}

              {/* Animated ring for enhanced visual appeal */}
              <motion.div
                className="absolute inset-0 rounded-full border border-white/20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Enhanced dot cursor with better styling */}
            <motion.div
              ref={cursorDotRef}
              className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
              style={{
                x: dotX,
                y: dotY,
                translateX: `-50%`,
                translateY: `-50%`,
                width: "6px",
                height: "6px",
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 70%, transparent 100%)",
                boxShadow: "0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.3)",
                willChange: "transform",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  )
}
