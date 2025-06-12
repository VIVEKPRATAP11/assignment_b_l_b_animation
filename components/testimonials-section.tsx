"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote, Play, Pause } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  text: string
  boatName: string
  imageUrl: string
  title: string
  experience: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Thompson",
    location: "New York, USA",
    title: "CEO, Thompson Industries",
    rating: 5,
    text: "Our day on the Ocean Symphony was absolutely perfect. The captain was professional, the yacht was immaculate, and the experience exceeded all our expectations. Every detail was meticulously planned, from the gourmet catering to the pristine condition of the vessel. This is luxury yachting at its finest.",
    boatName: "Ocean Symphony - 180ft Superyacht",
    experience: "7-Day Mediterranean Charter",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Sophia Rodriguez",
    location: "Miami, USA",
    title: "Luxury Travel Consultant",
    rating: 5,
    text: "Azure Dreams provided the perfect setting for our anniversary celebration. The catamaran was beautiful, and the crew went above and beyond to make our day special. The attention to detail and personalized service made this an unforgettable experience that we'll treasure forever.",
    boatName: "Azure Dreams - 65ft Luxury Catamaran",
    experience: "Anniversary Sunset Cruise",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "James Wilson",
    location: "Los Angeles, USA",
    title: "Film Producer",
    rating: 5,
    text: "Royal Voyager was the highlight of our vacation. Spacious, luxurious, and the captain knew all the best spots along the coast. The yacht's amenities were world-class, and the crew's expertise made every moment enjoyable. This exceeded every expectation we had for a luxury charter experience.",
    boatName: "Royal Voyager - 220ft Motor Yacht",
    experience: "10-Day Pacific Coast Explorer",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Isabella Chen",
    location: "Singapore",
    title: "Investment Banker",
    rating: 5,
    text: "The Serenity Star delivered an exceptional charter experience in the Caribbean. From the moment we stepped aboard, we were treated like royalty. The yacht's design is breathtaking, and the crew's professionalism is unmatched. This is how luxury yachting should be done.",
    boatName: "Serenity Star - 150ft Explorer Yacht",
    experience: "Caribbean Island Hopping",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced title animation with stagger effect
      gsap.fromTo(
        titleRef.current?.children || [],
        {
          y: 100,
          opacity: 0,
          rotationX: 45,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Testimonials container animation
      gsap.fromTo(
        testimonialsRef.current,
        {
          y: 150,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
      }, 6000)
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-40 px-4 md:px-8 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[25vw] h-[25vw] rounded-full bg-gradient-to-r from-purple-600/15 to-blue-600/15 blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-cyan-600/10 to-blue-600/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced section title */}
        <div className="mb-20 md:mb-28 text-center">
          <div ref={titleRef} className="space-y-6">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Quote className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Client Stories</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight" style={{ perspective: "1000px" }}>
              <span className="inline-block mr-6">What Our</span>
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                Clients Say
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover why discerning clients choose us for their luxury yachting experiences
            </p>

            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
          </div>
        </div>

        {/* Enhanced testimonials carousel */}
        <div ref={testimonialsRef} className="relative">
          {/* Large decorative quote */}
          <div className="absolute -top-16 -left-8 md:-left-16 text-blue-500/10 pointer-events-none">
            <Quote size={200} className="transform rotate-12" />
          </div>

          {/* Testimonial cards */}
          <div className="relative min-h-[600px] md:min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -15 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  staggerChildren: 0.1,
                }}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                  <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                    {/* Client image and info */}
                    <motion.div
                      className="lg:w-1/3 flex flex-col items-center lg:items-start"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="relative mb-6">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-2xl">
                          <img
                            src={testimonials[activeIndex].imageUrl || "/placeholder.svg"}
                            alt={testimonials[activeIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                          <Quote className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="text-center lg:text-left space-y-2">
                        <h4 className="text-2xl font-bold text-white">{testimonials[activeIndex].name}</h4>
                        <p className="text-blue-400 font-medium">{testimonials[activeIndex].title}</p>
                        <p className="text-gray-400">{testimonials[activeIndex].location}</p>

                        {/* Enhanced rating */}
                        <div className="flex justify-center lg:justify-start items-center gap-1 mt-4">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                            >
                              <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                            </motion.div>
                          ))}
                          <span className="ml-2 text-sm text-gray-400">5.0</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Testimonial content */}
                    <motion.div
                      className="lg:w-2/3 space-y-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed italic font-light">
                        "{testimonials[activeIndex].text}"
                      </blockquote>

                      <div className="space-y-4 pt-6 border-t border-white/10">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-blue-500/20">
                            <p className="text-sm text-blue-400 font-medium">Yacht Charter</p>
                            <p className="text-white font-semibold">{testimonials[activeIndex].boatName}</p>
                          </div>
                          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-500/20">
                            <p className="text-sm text-purple-400 font-medium">Experience</p>
                            <p className="text-white font-semibold">{testimonials[activeIndex].experience}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced navigation controls */}
          <div className="flex justify-center items-center mt-12 gap-6">
            <motion.button
              className="group p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
            </motion.button>

            <motion.button
              className="group p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
              onClick={toggleAutoPlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoPlaying ? (
                <Pause className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
              ) : (
                <Play className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
              )}
            </motion.button>

            <motion.button
              className="group p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
            </motion.button>
          </div>

          {/* Enhanced progress indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`relative h-2 rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? "w-12 bg-gradient-to-r from-blue-500 to-cyan-500"
                    : "w-2 bg-white/20 hover:bg-white/30"
                }`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {index === activeIndex && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Auto-play progress bar */}
          {isAutoPlaying && (
            <div className="mt-6 max-w-md mx-auto">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                  key={activeIndex}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
