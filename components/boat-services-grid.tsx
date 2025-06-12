"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Ship, Waves, Anchor, Navigation, Fuel, Wrench, Shield, Crown } from "lucide-react"

interface BoatCategory {
  id: number
  title: string
  description: string
  specifications: string[]
  priceRange: string
  length: string
  category: string
  capacity: number
  features: number
  icon: React.ComponentType<any>
}

const BoatServicesGrid = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  // Professional boat categories data
  const boatCategories: BoatCategory[] = [
    {
      id: 1,
      title: "Motor Yachts",
      description:
        "Luxurious motor yachts featuring state-of-the-art propulsion systems, premium interiors, and exceptional performance for the ultimate maritime experience",
      specifications: [
        "Twin Engine Configuration",
        "Advanced Navigation Systems",
        "Luxury Accommodations",
        "Professional Crew Quarters",
      ],
      priceRange: "$2.5M - $50M",
      length: "60ft - 300ft",
      category: "Luxury Vessels",
      capacity: 12,
      features: 25,
      icon: Ship,
    },
    {
      id: 2,
      title: "Sailing Yachts",
      description:
        "Performance sailing yachts combining traditional craftsmanship with modern technology for exceptional sailing experiences",
      specifications: ["Carbon Fiber Masts", "High-Performance Sails", "Advanced Rigging", "Racing Optimized Hull"],
      priceRange: "$800K - $25M",
      length: "40ft - 200ft",
      category: "Performance Sailing",
      capacity: 10,
      features: 18,
      icon: Waves,
    },
    {
      id: 3,
      title: "Superyachts",
      description:
        "Ultra-luxury superyachts offering unparalleled comfort, cutting-edge technology, and world-class amenities for discerning owners",
      specifications: ["Helicopter Landing Pad", "Submarine Garage", "Infinity Pool", "Master Suite Complex"],
      priceRange: "$50M - $500M",
      length: "200ft - 600ft",
      category: "Ultra Luxury",
      capacity: 24,
      features: 45,
      icon: Crown,
    },
    {
      id: 4,
      title: "Sport Fishers",
      description:
        "High-performance sport fishing vessels engineered for serious anglers with tournament-grade equipment and capabilities",
      specifications: ["Tournament Rigging", "Live Bait Systems", "Fighting Chairs", "Fish Storage Systems"],
      priceRange: "$500K - $8M",
      length: "35ft - 100ft",
      category: "Sport Fishing",
      capacity: 8,
      features: 15,
      icon: Anchor,
    },
    {
      id: 5,
      title: "Explorer Yachts",
      description:
        "Long-range expedition yachts built for global cruising with enhanced fuel capacity and ice-class construction",
      specifications: ["Ice-Class Hull", "Extended Range Fuel", "Expedition Equipment", "All-Weather Capability"],
      priceRange: "$3M - $75M",
      length: "80ft - 250ft",
      category: "Expedition",
      capacity: 16,
      features: 30,
      icon: Navigation,
    },
    {
      id: 6,
      title: "Catamarans",
      description:
        "Stable multi-hull vessels offering exceptional space, comfort, and fuel efficiency for extended cruising and charter operations",
      specifications: ["Twin Hull Design", "Shallow Draft", "Spacious Layout", "Fuel Efficient"],
      priceRange: "$400K - $15M",
      length: "40ft - 150ft",
      category: "Multi-Hull",
      capacity: 14,
      features: 20,
      icon: Fuel,
    },
    {
      id: 7,
      title: "Tenders & RIBs",
      description:
        "High-performance rigid inflatable boats and luxury tenders designed for yacht support and recreational activities",
      specifications: ["Military Grade Materials", "High-Speed Performance", "Luxury Seating", "Advanced Electronics"],
      priceRange: "$50K - $800K",
      length: "20ft - 50ft",
      category: "Support Vessels",
      capacity: 6,
      features: 12,
      icon: Wrench,
    },
    {
      id: 8,
      title: "Custom Builds",
      description:
        "Bespoke yacht construction services creating unique vessels tailored to individual specifications and requirements",
      specifications: ["Custom Design", "Premium Materials", "Personalized Layout", "Exclusive Features"],
      priceRange: "$5M - $200M",
      length: "100ft - 400ft",
      category: "Bespoke",
      capacity: 20,
      features: 50,
      icon: Shield,
    },
  ]

  return (
    <section className="py-32 md:py-40 px-4 md:px-8 bg-[#0a192f] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-blue-600/5 to-cyan-600/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[35vw] h-[35vw] rounded-full bg-gradient-to-r from-indigo-600/5 to-purple-600/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium tracking-wide">
              Yacht Collection
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
            <span className="text-white">Exceptional </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
              Yacht Categories
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover our comprehensive collection of world-class yachts, from intimate sailing vessels to magnificent
            superyachts, each engineered for excellence and crafted for luxury
          </p>

          <div className="w-24 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-8"></div>
        </div>

        {/* Boat Categories Grid */}
        <div className="relative" onMouseLeave={() => setHoveredCategory(null)}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {boatCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="relative cursor-pointer group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: hoveredCategory === null || hoveredCategory === category.id ? 1 : 0.4,
                  scale: hoveredCategory === category.id ? 1.02 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                data-cursor="button"
              >
                {/* Category Card */}
                <div className=" backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 h-full hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="relative z-10 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-blue-500/20">
                      <category.icon className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold text-white">{category.title}</h3>
                      <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                        {category.category}
                      </span>
                    </div>

                    <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-2">{category.description}</p>

                    {/* Stats */}
                    <div className="space-y-1 mb-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-[10px]">Length:</span>
                        <span className="text-gray-300 text-[10px]">{category.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-[10px]">Capacity:</span>
                        <span className="text-gray-300 text-[10px]">{category.capacity} guests</span>
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="text-right">
                      <span className="text-sm font-semibold text-white">{category.priceRange}</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Tooltip - With solid white background */}
                <AnimatePresence>
                  {hoveredCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`
                        fixed z-50 w-80 bg-white rounded-2xl shadow-2xl p-6 border border-gray-200
                        ${index % 2 === 0 ? "ml-4" : "mr-4"}
                      `}
                      style={{
                        left: index % 2 === 0 ? "100%" : "auto",
                        right: index % 2 === 1 ? "100%" : "auto",
                        top: "0",
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center border border-blue-300 shadow-md">
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900">{category.title}</h4>
                          <span className="text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full">
                            {category.category}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-700 text-sm leading-relaxed mb-4 font-medium">{category.description}</p>

                      {/* Specifications */}
                      <div className="mb-4">
                        <h5 className="text-sm font-bold text-slate-900 mb-2">Key Specifications:</h5>
                        <ul className="space-y-2">
                          {category.specifications.map((spec, idx) => (
                            <li key={idx} className="text-xs text-slate-700 flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                              <span className="font-medium">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Detailed Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="text-lg font-bold text-blue-700">{category.length}</div>
                          <div className="text-xs text-slate-600 font-medium">Length Range</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="text-lg font-bold text-blue-700">{category.capacity}</div>
                          <div className="text-xs text-slate-600 font-medium">Max Guests</div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div className="text-sm">
                          <span className="text-slate-900 font-bold">{category.priceRange}</span>
                        </div>
                        <button className="text-xs bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-md">
                          View Collection
                        </button>
                      </div>

                      {/* Arrow pointer */}
                      <div
                        className={`absolute top-6 w-4 h-4 bg-white border transform rotate-45 
                        ${
                          index % 2 === 0
                            ? "-left-2 border-l border-b border-gray-200"
                            : "-right-2 border-r border-t border-gray-200"
                        }`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <motion.div
            className="inline-flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
              Explore All Yachts
            </button>
            <button className="px-8 py-4 border border-slate-600 text-white rounded-xl font-medium hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300">
              Schedule Viewing
            </button>
          </motion.div>
          <p className="mt-6 text-gray-400 text-sm max-w-2xl mx-auto">
            Each yacht in our collection represents the pinnacle of maritime engineering and luxury craftsmanship
          </p>
        </div>
      </div>
    </section>
  )
}

export default BoatServicesGrid
