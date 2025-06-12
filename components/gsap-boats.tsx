"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Observer } from "gsap/Observer"
import Image from "next/image"
import { Anchor, Users, Clock, Star, MapPin } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer)
}

interface Boat {
  id: number
  name: string
  type: string
  location: string
  price: number
  rating: number
  capacity: number
  duration: string
  imageUrl: string
  color: string
}

const boats: Boat[] = [
  {
    id: 1,
    name: "Ocean Symphony",
    type: "Luxury Yacht",
    location: "Miami, FL",
    price: 1200,
    rating: 4.9,
    capacity: 12,
    duration: "Full Day",
    imageUrl: "https://img.getmyboat.com/images/4e92dec8-619a-49ee-8811-6c9064bf8715/-processed.jpg",
    color: "#3b82f6",
  },
  {
    id: 2,
    name: "Azure Dreams",
    type: "Catamaran",
    location: "San Diego, CA",
    price: 950,
    rating: 4.8,
    capacity: 8,
    duration: "Half Day",
    imageUrl: "https://img.getmyboat.com/images/4e92dec8-619a-49ee-8811-6c9064bf8715/-processed.jpg",
    color: "#06b6d4",
  },
  {
    id: 3,
    name: "Royal Voyager",
    type: "Motor Yacht",
    location: "New York, NY",
    price: 1500,
    rating: 5.0,
    capacity: 15,
    duration: "Full Day",
    imageUrl: "https://img.getmyboat.com/images/4e92dec8-619a-49ee-8811-6c9064bf8715/-processed.jpg",
    color: "#0ea5e9",
  },
  {
    id: 4,
    name: "Coastal Serenity",
    type: "Sailing Yacht",
    location: "Seattle, WA",
    price: 850,
    rating: 4.7,
    capacity: 6,
    duration: "Full Day",
    imageUrl: "https://img.getmyboat.com/images/4e92dec8-619a-49ee-8811-6c9064bf8715/-processed.jpg",
    color: "#0891b2",
  },
]

export default function GSAPBoats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const boatsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Boat cards stagger animation
      gsap.fromTo(
        ".boat-card",
        {
          y: 150,
          opacity: 0,
          scale: 0.8,
          rotationY: -15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: boatsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Parallax effect for boat images
      gsap.utils.toArray<HTMLElement>(".boat-image").forEach((image) => {
        gsap.to(image, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      // Color morphing effect on scroll
      gsap.utils.toArray<HTMLElement>(".boat-card").forEach((card, index) => {
        const boat = boats[index]

        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to("body", {
              backgroundColor: boat.color + "10",
              duration: 1,
              ease: "power2.out",
            })
          },
          onLeave: () => {
            gsap.to("body", {
              backgroundColor: "#0a192f",
              duration: 1,
              ease: "power2.out",
            })
          },
          onEnterBack: () => {
            gsap.to("body", {
              backgroundColor: boat.color + "10",
              duration: 1,
              ease: "power2.out",
            })
          },
          onLeaveBack: () => {
            gsap.to("body", {
              backgroundColor: "#0a192f",
              duration: 1,
              ease: "power2.out",
            })
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Mouse hover effects
  useEffect(() => {
    const cards = document.querySelectorAll(".boat-card")

    cards.forEach((card) => {
      const image = card.querySelector(".boat-image")
      const content = card.querySelector(".boat-content")
      const overlay = card.querySelector(".boat-overlay")

      const handleMouseEnter = () => {
        gsap.to(image, {
          scale: 1.1,
          rotation: 2,
          duration: 0.6,
          ease: "power2.out",
        })

        gsap.to(content, {
          y: -10,
          duration: 0.4,
          ease: "power2.out",
        })

        gsap.to(overlay, {
          opacity: 0.8,
          duration: 0.4,
          ease: "power2.out",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(image, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "power2.out",
        })

        gsap.to(content, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        })

        gsap.to(overlay, {
          opacity: 0.6,
          duration: 0.4,
          ease: "power2.out",
        })
      }

      const handleMouseMove = (e: MouseEvent) => {
        const rect = (card as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        })
      }

      const handleMouseLeaveCard = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: "power2.out",
        })
      }

      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", handleMouseLeave)
      card.addEventListener("mousemove", handleMouseMove as EventListener)
      card.addEventListener("mouseleave", handleMouseLeaveCard)
    })
  }, [])

  return (
    <section id="boats" ref={sectionRef} className="py-32 md:py-40 px-4 md:px-8 bg-[#0a192f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="mb-16 md:mb-24">
          <h2 ref={titleRef} className="text-3xl md:text-5xl lg:text-6xl font-bold" style={{ perspective: "1000px" }}>
            <span className="inline-block mr-4">Featured</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Boats
            </span>
          </h2>
          <p className="text-xl text-gray-300 mt-6 max-w-2xl">
            Discover our handpicked selection of luxury vessels for your next adventure on the water
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mt-6" />
        </div>

        {/* Boats grid */}
        <div ref={boatsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {boats.map((boat) => (
            <div
              key={boat.id}
              className="boat-card relative overflow-hidden rounded-xl cursor-none"
              data-cursor="image"
              data-cursor-text="View"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                {/* Boat image */}
                <div className="boat-image absolute inset-0 w-full h-full">
                  <Image
                    src={boat.imageUrl || "/placeholder.svg"}
                    alt={boat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={boat.id < 3}
                  />
                </div>

                {/* Gradient overlay */}
                <div
                  className="boat-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60"
                  style={{
                    background: `linear-gradient(to top, ${boat.color}40, transparent)`,
                  }}
                />

                {/* Content */}
                <div className="boat-content absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  {/* Location tag */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full">
                      <MapPin className="w-3 h-3 mr-1" />
                      {boat.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{boat.name}</h3>

                  {/* Boat type */}
                  <p className="text-white/80 mb-4">{boat.type}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-sm text-white/80">
                      <Users className="w-4 h-4 mr-1" />
                      {boat.capacity} guests
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <Clock className="w-4 h-4 mr-1" />
                      {boat.duration}
                    </div>
                    <div className="flex items-center text-sm text-white/80">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      {boat.rating}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">${boat.price}</span>
                      <span className="text-white/60 text-sm"> / day</span>
                    </div>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all boats button */}
        <div className="mt-16 md:mt-24 text-center">
          <button
            className="px-8 py-4 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors duration-300 flex items-center justify-center mx-auto"
            data-cursor="button"
            data-cursor-text="View All"
          >
            <Anchor className="w-5 h-5 mr-2" />
            View All Boats
          </button>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-blue-600/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] rounded-full bg-cyan-600/10 blur-[100px] animate-pulse" />
      </div>
    </section>
  )
}
