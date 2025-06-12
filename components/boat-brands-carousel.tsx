"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface BoatBrand {
  name: string
  alt: string
  founded: string
  country: string
  specialty: string
}

const boatBrands: BoatBrand[] = [
  {
    name: "Azimut",
    alt: "Azimut Yachts",
    founded: "1969",
    country: "Italy",
    specialty: "Luxury Motor Yachts",
  },
  {
    name: "Sunseeker",
    alt: "Sunseeker International",
    founded: "1969",
    country: "United Kingdom",
    specialty: "Performance Yachts",
  },
  {
    name: "Princess",
    alt: "Princess Yachts",
    founded: "1965",
    country: "United Kingdom",
    specialty: "Luxury Motor Yachts",
  },
  {
    name: "Ferretti",
    alt: "Ferretti Group",
    founded: "1968",
    country: "Italy",
    specialty: "Luxury Flybridge Yachts",
  },
  {
    name: "Pershing",
    alt: "Pershing Yachts",
    founded: "1981",
    country: "Italy",
    specialty: "Sport Yachts",
  },
  {
    name: "Riva",
    alt: "Riva Yachts",
    founded: "1842",
    country: "Italy",
    specialty: "Classic Wooden Boats",
  },
  {
    name: "Benetti",
    alt: "Benetti Yachts",
    founded: "1873",
    country: "Italy",
    specialty: "Custom Superyachts",
  },
  {
    name: "Lurssen",
    alt: "Lurssen Yachts",
    founded: "1875",
    country: "Germany",
    specialty: "Mega Yachts",
  },
  {
    name: "Feadship",
    alt: "Feadship",
    founded: "1949",
    country: "Netherlands",
    specialty: "Custom Superyachts",
  },
  {
    name: "Oceanco",
    alt: "Oceanco",
    founded: "1987",
    country: "Netherlands",
    specialty: "Custom Superyachts",
  },
  {
    name: "Heesen",
    alt: "Heesen Yachts",
    founded: "1978",
    country: "Netherlands",
    specialty: "Aluminum Yachts",
  },
  {
    name: "Sanlorenzo",
    alt: "Sanlorenzo",
    founded: "1958",
    country: "Italy",
    specialty: "Custom Yachts",
  },
]

const BoatBrandsCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null)

  // Split brands into two rows
  const firstRowBrands = boatBrands.slice(0, 6)
  const secondRowBrands = boatBrands.slice(6)

  return (
    <section className="py-32 px-4 md:px-8 bg-gradient-to-b from-[#0a192f] to-[#0c1f3a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.1)_0%,rgba(10,25,47,0)_70%)]"></div>
        <div className="absolute top-1/3 left-1/4 w-[30vw] h-[30vw] rounded-full bg-blue-600/5 blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[25vw] h-[25vw] rounded-full bg-cyan-600/5 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
              Exclusive Partnerships
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">Elite </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
              Yacht Brands
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We collaborate with the world's most prestigious yacht manufacturers, bringing decades of excellence and
            innovation to your maritime experience
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div ref={carouselRef} className="relative mb-20 overflow-hidden">
          {/* First Row - Left to Right */}
          <div className="mb-8 overflow-hidden">
            <div className="carousel-row carousel-row-1 flex">
              {[...firstRowBrands, ...firstRowBrands].map((brand, index) => (
                <div key={`row1-${brand.name}-${index}`} className="carousel-item">
                  <motion.div
                    className="w-[220px] h-[140px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/10 flex flex-col items-center justify-center px-6 py-4 cursor-pointer group"
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    data-cursor="button"
                  >
                    <div className="w-full flex items-center justify-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">{brand.name.charAt(0)}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {brand.name}
                    </h3>

                    <p className="text-xs text-gray-400 text-center">
                      {brand.country} • Est. {brand.founded}
                    </p>

                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10"></div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Right to Left */}
          <div className="overflow-hidden">
            <div className="carousel-row carousel-row-2 flex">
              {[...secondRowBrands, ...secondRowBrands].map((brand, index) => (
                <div key={`row2-${brand.name}-${index}`} className="carousel-item">
                  <motion.div
                    className="w-[220px] h-[140px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/10 flex flex-col items-center justify-center px-6 py-4 cursor-pointer group"
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    data-cursor="button"
                  >
                    <div className="w-full flex items-center justify-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-400 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">{brand.name.charAt(0)}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {brand.name}
                    </h3>

                    <p className="text-xs text-gray-400 text-center">
                      {brand.country} • Est. {brand.founded}
                    </p>

                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-400/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10"></div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-[#0c1f3a] to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-[#0c1f3a] to-transparent pointer-events-none"></div>
        </div>

        {/* Brand Spotlight */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto shadow-xl">
                  <span className="text-white font-bold text-5xl">L</span>
                </div>
              </div>

              <div className="md:w-2/3 md:pl-8">
                <h3 className="text-3xl font-bold text-white mb-2">Luxury Yacht Collection</h3>
                <p className="text-gray-300 mb-6">
                  Our fleet features vessels from the world's most prestigious shipyards, each representing the pinnacle
                  of maritime engineering, design, and craftsmanship.
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-white/10 px-4 py-2 rounded-full text-sm text-white">12+ Premium Brands</div>
                  <div className="bg-white/10 px-4 py-2 rounded-full text-sm text-white">500+ Luxury Vessels</div>
                  <div className="bg-white/10 px-4 py-2 rounded-full text-sm text-white">Global Availability</div>
                </div>

                <motion.button
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-medium group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Our Fleet
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { value: "50+", label: "Premium Brands", color: "from-blue-500 to-blue-600" },
            { value: "500+", label: "Luxury Yachts", color: "from-cyan-500 to-cyan-600" },
            { value: "25+", label: "Years Experience", color: "from-blue-500 to-blue-600" },
            { value: "100%", label: "Client Satisfaction", color: "from-cyan-500 to-cyan-600" },
          ].map((stat, index) => (
            <div key={index} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 h-full flex flex-col items-center justify-center">
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm text-center">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .carousel-item {
          flex: 0 0 auto;
          padding: 0 16px;
        }

        .carousel-row {
          width: 200%;
        }

        .carousel-row-1 {
          animation: scroll-left 60s linear infinite;
        }

        .carousel-row-2 {
          animation: scroll-right 60s linear infinite;
        }

        .carousel-row:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .carousel-row {
            animation: none;
            width: 100%;
            overflow-x: auto;
            padding-bottom: 16px;
          }
        }
      `}</style>
    </section>
  )
}

export default BoatBrandsCarousel
