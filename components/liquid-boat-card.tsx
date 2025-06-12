"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Star, Users, Anchor, MapPin, Ruler, Heart, ArrowRight, Play, Volume2, VolumeX } from "lucide-react"

// Global mouse tracking
if (typeof window !== "undefined") {
  document.addEventListener("mousemove", (e) => {
    window.__mouseX = e.clientX
    window.__mouseY = e.clientY
  })
}

function sampleRoundedRect(radius: number, segments: number) {
  const points = []
  const width = 1
  const height = 1

  const pathSegments = [
    { x0: radius, y0: 0, dx: (width - 2 * radius) / segments, dy: 0, arc: 0 },
    { arc: 1, cx: width - radius, cy: radius, st: -Math.PI / 2, en: 0 },
    { x0: width, y0: radius, dx: 0, dy: (height - 2 * radius) / segments, arc: 0 },
    { arc: 1, cx: width - radius, cy: height - radius, st: 0, en: Math.PI / 2 },
    { x0: width - radius, y0: height, dx: -(width - 2 * radius) / segments, dy: 0, arc: 0 },
    { arc: 1, cx: radius, cy: height - radius, st: Math.PI / 2, en: Math.PI },
    { x0: 0, y0: height - radius, dx: 0, dy: -(height - 2 * radius) / segments, arc: 0 },
    { arc: 1, cx: radius, cy: radius, st: Math.PI, en: (3 * Math.PI) / 2 },
  ]

  pathSegments.forEach((segment) => {
    if (!segment.arc) {
      for (let i = 0; i <= segments; i++) {
        points.push({
          x: segment.x0 + segment.dx * i,
          y: segment.y0 + segment.dy * i,
        })
      }
    } else {
      const segmentAngle = segment.en - segment.st
      for (let i = 0; i <= segments; i++) {
        const t = segment.st + (i / segments) * segmentAngle
        points.push({
          x: segment.cx + Math.cos(t) * radius,
          y: segment.cy + Math.sin(t) * radius,
        })
      }
    }
  })

  return points
}

function catmullRom2bezier(points: Array<{ x: number; y: number }>) {
  let d = `M ${points[0].x},${points[0].y}`
  const n = points.length

  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    const tension = 0.15

    const cp1x = p1.x + ((p2.x - p0.x) * tension) / 6
    const cp1y = p1.y + ((p2.y - p0.y) * tension) / 6
    const cp2x = p2.x - ((p3.x - p1.x) * tension) / 6
    const cp2y = p2.y - ((p3.y - p1.y) * tension) / 6

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
  }

  return d + " Z"
}

interface BoatCardProps {
  boat: {
    id: number
    name: string
    type: string
    price: string
    originalPrice: string
    rating: number
    reviews: number
    capacity: number
    length: string
    image: string
    video: string
    location: string
    features: string[]
    amenities: string[]
    badge: string
  }
  index: number
}

export default function LiquidBoatCard({ boat, index }: BoatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(false)

  const clipId = `boat-clip-${index}`
  const basePoints = useRef(sampleRoundedRect(0.08, 60)).current
  const basePath = useRef(catmullRom2bezier(basePoints)).current
  const deformation = useRef(basePoints.map(() => ({ x: 0, y: 0 }))).current

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!cardRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    )

    observer.observe(cardRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Preload video when card is visible
  useEffect(() => {
    if (isIntersecting && videoRef.current && !isVideoLoaded) {
      videoRef.current.load()
      videoRef.current.addEventListener("loadeddata", () => {
        setIsVideoLoaded(true)
      })
      videoRef.current.addEventListener("error", () => {
        setVideoError(true)
      })
    }
  }, [isIntersecting, isVideoLoaded])

  // Handle video play/pause on hover
  useEffect(() => {
    if (!videoRef.current || !isVideoLoaded) return

    if (isHovered) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true)
          })
          .catch((error) => {
            console.log("Video play failed:", error)
            setVideoError(true)
          })
      }
    } else {
      videoRef.current.pause()
      setIsVideoPlaying(false)
    }
  }, [isHovered, isVideoLoaded])

  // Toggle mute state
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Enhanced SVG morphing effect
  useEffect(() => {
    let animationFrame: number
    let lastTime = 0
    const maxDistance = 400
    const maxBulge = 0.25
    const waveSpeed = 0.001
    const frequencies = [1.2, 1.8, 0.7, 2.1]
    const time = { value: 0 }

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime
      lastTime = timestamp

      if (!cardRef.current || !pathRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const mouseX = (window as any).__mouseX ?? rect.left + rect.width / 2
      const mouseY = (window as any).__mouseY ?? rect.top + rect.height / 2

      time.value += deltaTime * waveSpeed

      const amplitudeTarget = isHovered ? 1 : 0.3
      let amplitude = (cardRef.current as any).__amplitude || 0
      amplitude += (amplitudeTarget - amplitude) * 0.06
      ;(cardRef.current as any).__amplitude = amplitude

      const morphedPoints = basePoints.map((point, i) => {
        const worldX = point.x * rect.width + rect.left
        const worldY = point.y * rect.height + rect.top
        const distance = Math.hypot(worldX - mouseX, worldY - mouseY)
        const influence = Math.pow(Math.max(0, 1 - distance / maxDistance), 2) * amplitude

        const wave1 = Math.sin((i / basePoints.length) * 2 * Math.PI * frequencies[0] + time.value * 4)
        const wave2 = Math.cos((i / basePoints.length) * 2 * Math.PI * frequencies[1] + time.value * 3.2)
        const wave3 = Math.sin((i / basePoints.length) * 2 * Math.PI * frequencies[2] + time.value * 2.8)
        const wave4 = Math.cos((i / basePoints.length) * 2 * Math.PI * frequencies[3] + time.value * 1.5)

        const combinedWave = wave1 * 0.35 + wave2 * 0.25 + wave3 * 0.25 + wave4 * 0.15
        const radialWave = Math.sin(distance * 0.02 + time.value * 5) * influence * 0.3
        const bulge = -influence * (Math.abs(combinedWave) + radialWave) * maxBulge

        const prevPoint = basePoints[(i - 3 + basePoints.length) % basePoints.length]
        const nextPoint = basePoints[(i + 3) % basePoints.length]
        let normalX = nextPoint.y - prevPoint.y
        let normalY = -(nextPoint.x - prevPoint.x)
        const normalLength = Math.hypot(normalX, normalY) || 1
        normalX /= normalLength
        normalY /= normalLength

        const targetX = normalX * bulge
        const targetY = normalY * bulge

        deformation[i].x += (targetX - deformation[i].x) * 0.08
        deformation[i].y += (targetY - deformation[i].y) * 0.08

        return {
          x: point.x + deformation[i].x,
          y: point.y + deformation[i].y,
        }
      })

      let smoothedPoints = morphedPoints
      for (let pass = 0; pass < 2; pass++) {
        smoothedPoints = smoothedPoints.map((point, i) => {
          const prevPoint = smoothedPoints[(i - 1 + smoothedPoints.length) % smoothedPoints.length]
          const nextPoint = smoothedPoints[(i + 1) % smoothedPoints.length]
          return {
            x: (prevPoint.x + point.x * 3 + nextPoint.x) / 5,
            y: (prevPoint.y + point.y * 3 + nextPoint.y) / 5,
          }
        })
      }

      pathRef.current.setAttribute("d", catmullRom2bezier(smoothedPoints))
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isHovered])

  // Canvas-based liquid effect
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)

    let animationFrame: number
    let time = 0

    const colors = [
      { r: 37, g: 99, b: 235 },
      { r: 6, g: 182, b: 212 },
      { r: 59, g: 130, b: 246 },
      { r: 16, g: 185, b: 129 },
      { r: 37, g: 99, b: 235 },
      { r: 59, g: 130, b: 246 },
    ]
    const color = colors[index % colors.length]

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const baseRadius = Math.min(rect.width, rect.height) * 0.3

      ctx.beginPath()
      for (let i = 0; i <= 100; i++) {
        const angle = (i / 100) * Math.PI * 2
        const wave1 = Math.sin(angle * 3 + time * 1.5) * 8
        const wave2 = Math.cos(angle * 5 + time * 1.2) * 6
        const wave3 = Math.sin(angle * 2 + time * 2) * 4

        const radius = baseRadius + wave1 + wave2 + wave3
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius)
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`)
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0.05)`)

      ctx.fillStyle = gradient
      ctx.fill()

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [index])

  const badgeColors = {
    "Most Popular": "bg-gradient-to-r from-orange-500 to-red-500",
    "Best Value": "bg-gradient-to-r from-green-500 to-emerald-500",
    Adventure: "bg-gradient-to-r from-purple-500 to-indigo-500",
    "Eco-Friendly": "bg-gradient-to-r from-green-400 to-teal-500",
    "Group Special": "bg-gradient-to-r from-blue-500 to-cyan-500",
    Luxury: "bg-gradient-to-r from-yellow-400 to-orange-500",
  }

  return (
    <div
      ref={cardRef}
      className="group relative w-full cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{ paddingBottom: "10px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="button"
    >
      {/* SVG clip path definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path ref={pathRef} d={basePath} />
          </clipPath>
        </defs>
      </svg>

      {/* Canvas background effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-3xl opacity-60"
        style={{
          filter: "blur(20px)",
          mixBlendMode: "screen",
          transform: "scale(1.1)",
        }}
      />

      {/* Card content */}
      <div
        className="relative bg-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
        style={{ clipPath: `url(#${clipId})` }}
      >
        {/* Badge */}
        <div
          className={`absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-white text-sm font-semibold ${
            badgeColors[boat.badge as keyof typeof badgeColors]
          } shadow-lg`}
        >
          {boat.badge}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${isLiked ? "text-red-500 fill-current" : "text-gray-600"}`}
          />
        </button>

        {/* Media Container */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          {/* Placeholder/Fallback Image */}
          {(!isIntersecting || !isVideoLoaded || videoError) && (
            <div
              className="w-full h-full bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-110"
              style={{
                backgroundImage: `url(${boat.image})`,
              }}
            />
          )}

          {/* Video - Only rendered when in viewport */}
          {isIntersecting && (
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isVideoLoaded && !videoError ? "opacity-100" : "opacity-0"
              }`}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              poster={boat.image}
              aria-label={`Video of ${boat.name}`}
            >
              <source src={boat.video} type="video/mp4" />
              {/* Removed the empty track element that was causing the error */}
            </video>
          )}

          {/* Loading Indicator */}
          {isIntersecting && !isVideoLoaded && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          {/* Play/Pause Indicator */}
      

          {/* Video Controls */}
       

          {/* Rating Badge */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1 shadow-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-800">{boat.rating}</span>
            <span className="text-xs text-gray-600">({boat.reviews})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{boat.type}</span>
              <div className="flex items-center space-x-1 text-gray-500 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{boat.location}</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {boat.name}
            </h3>
          </div>

          {/* Specs */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Up to {boat.capacity} guests</span>
            </div>
            <div className="flex items-center space-x-1">
              <Ruler className="w-4 h-4" />
              <span>{boat.length}</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {boat.features.slice(0, 3).map((feature, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium">
                  {feature}
                </span>
              ))}
              {boat.features.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium">
                  +{boat.features.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-gray-900">{boat.price}</span>
                <span className="text-lg text-gray-400 line-through">{boat.originalPrice}</span>
              </div>
              <span className="text-sm text-gray-600">per day</span>
            </div>

            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 group">
              <Anchor className="w-4 h-4" />
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />
      </div>
    </div>
  )
}
