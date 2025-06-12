"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LiquidBoatCard from "./liquid-boat-card"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const boats = [
  {
    id: 1,
    name: "Ocean Majesty",
    type: "Luxury Yacht",
    price: "$2,500",
    originalPrice: "$3,200",
    rating: 4.9,
    reviews: 127,
    capacity: 12,
    length: "85ft",
    video: "/videos/video1.mp4",
    location: "Miami Beach",
    features: ["Captain Included", "Full Bar", "Water Sports", "Gourmet Dining"],
    amenities: ["WiFi", "AC", "Sound System", "Bathroom"],
    badge: "Most Popular",
  },
  {
    id: 2,
    name: "Sunset Cruiser",
    type: "Motor Yacht",
    price: "$1,800",
    originalPrice: "$2,100",
    rating: 4.8,
    reviews: 89,
    capacity: 8,
    length: "65ft",
    video: "/videos/video_2.mp4",
    location: "Key West",
    features: ["Sunset Tours", "Snorkeling Gear", "Premium Sound", "Catering"],
    amenities: ["WiFi", "AC", "Bar", "Deck Space"],
    badge: "Best Value",
  },
  {
    id: 3,
    name: "Wave Rider",
    type: "Sport Boat",
    price: "$1,200",
    originalPrice: "$1,500",
    rating: 4.7,
    reviews: 156,
    capacity: 6,
    length: "45ft",
    video: "/videos/video3.mp4",
    location: "Fort Lauderdale",
    features: ["High Speed", "Water Skiing", "Wakeboarding", "Fishing Gear"],
    amenities: ["Sound System", "Cooler", "Safety Gear", "Storage"],
    badge: "Adventure",
  },
  {
    id: 5,
    name: "Adventure Spirit",
    type: "Catamaran",
    price: "$2,200",
    originalPrice: "$2,800",
    rating: 4.8,
    reviews: 94,
    capacity: 14,
    length: "58ft",
    video: "/videos/video5.mp4",
    location: "San Diego",
    features: ["Stable Platform", "Large Groups", "Snuba Diving", "BBQ Grill"],
    amenities: ["WiFi", "AC", "Kitchen", "Multiple Decks"],
    badge: "Group Special",
  },
  {
    id: 6,
    name: "Blue Horizon",
    type: "Mega Yacht",
    price: "$4,500",
    originalPrice: "$5,500",
    rating: 5.0,
    reviews: 67,
    capacity: 20,
    length: "120ft",
    video: "/videos/video6.mp4",
    location: "Monaco",
    features: ["Helicopter Pad", "Spa Services", "Chef Included", "Jet Skis"],
    amenities: ["WiFi", "AC", "Multiple Suites", "Jacuzzi"],
    badge: "Luxury",
  },
  {
    id: 7,
    name: "Serenity",
    type: "Sailing Yacht",
    price: "$3,000",
    originalPrice: "$3,800",
    rating: 4.9,
    reviews: 110,
    capacity: 10,
    length: "75ft",
    video: "/videos/video4.mp4",
    location: "Santorini",
    features: ["Sailing Experience", "Sun Deck", "Wine Tasting", "Private Chef"],
    amenities: ["WiFi", "AC", "Luxury Cabins", "Outdoor Lounge"],
    badge: "Eco-Friendly",
  },
]

export default function LiquidBoatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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
          },
        },
      )

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
          },
        },
      )

      // Cards stagger animation
      gsap.fromTo(
        ".liquid-boat-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-slate-900/50 to-slate-800/30"
      id="boats"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">Premium </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              Fleet
            </span>
          </h2>
          <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover our curated collection of luxury vessels, each offering unique experiences and world-class
            amenities for your perfect maritime adventure.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {boats.map((boat, index) => (
            <div key={boat.id} className="liquid-boat-card">
              <LiquidBoatCard boat={boat} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
