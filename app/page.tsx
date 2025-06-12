"use client"

import { useState } from "react"
import GSAPLoader from "@/components/gsap-loader"
import GSAPNavigation from "@/components/gsap-navigation"
import GSAPHero from "@/components/gsap-hero"
import LiquidBoatsSection from "@/components/liquid-boats-section"
import BoatServicesGrid from "@/components/boat-services-grid"
import StickyBoatShowcase from "@/components/sticky-boat-showcase"
import BoatBrandsCarousel from "@/components/boat-brands-carousel"
import DestinationsSection from "@/components/destinations-section"
import TestimonialsSection from "@/components/testimonials-section"
import Footer from "@/components/footer"
import AdvancedCursor from "@/components/advanced-cursor"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <GSAPLoader onComplete={handleLoadingComplete} />}

      {!isLoading && (
        <main className="bg-[#0a192f] text-white min-h-screen">
          <AdvancedCursor />
          {/* 1. Navigation - Always first */}
          <GSAPNavigation />

          {/* 2. Hero - Primary value proposition */}
          <GSAPHero />

          {/* 3. Product Overview - Initial yacht showcase */}
          <LiquidBoatsSection />

          {/* 4. Services - What we offer */}
          <BoatServicesGrid />

          {/* 5. Detailed Showcase - In-depth product view */}
          <StickyBoatShowcase />

          {/* 6. Brand Partners - Trust indicators */}
          <BoatBrandsCarousel />

          {/* 7. Destinations - Lifestyle and experiences */}
          <DestinationsSection />

          {/* 8. Social Proof - Testimonials before final CTA */}
          <TestimonialsSection />

          {/* 9. Footer - Contact and final conversion */}
          <Footer />
        </main>
      )}
    </>
  )
}
