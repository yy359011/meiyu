/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slidesCount = HERO_SLIDES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slidesCount) % slidesCount);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slidesCount);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 26 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.6 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 26 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section className="relative w-full h-[180px] sm:h-[280px] md:h-[400px] lg:h-[480px] overflow-hidden bg-stone-900 border-b border-[#e4d7c0]/20" id="hero-carousel">
      {/* Background Slides */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* The Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 z-10" />
            <img
              src={HERO_SLIDES[currentIndex].image}
              alt={HERO_SLIDES[currentIndex].title}
              className="w-full h-full object-cover select-none transform transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />

            {/* Captions Text with staggered transitions */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24">
              <div className="max-w-2xl bg-black/25 backdrop-blur-[2px] p-4 rounded-lg border-l-4 border-[#d9ab6a] drop-shadow-lg">
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-4.5xl font-black text-white tracking-widest leading-tight drop-shadow-md"
                >
                  {HERO_SLIDES[currentIndex].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm lg:text-base text-amber-100 font-sans tracking-wide font-light drop-shadow-sm line-clamp-2"
                >
                  {HERO_SLIDES[currentIndex].subtitle}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Exquisite Double Diamond Chinese Traditional Mesh Outline Overlay (From Screenshot) */}
      <div className="absolute right-8 sm:right-16 md:right-28 lg:right-40 top-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 pointer-events-none opacity-40 z-20 hidden sm:block">
        <div className="relative w-full h-full">
          {/* Inner rotated square */}
          <div className="absolute inset-4 border border-[#fffdf0] rotate-45 transform-gpu" />
          {/* Outer rotated square offset */}
          <div className="absolute inset-0 border border-[#fffdf0]/60 rotate-45 transform-gpu" />
          {/* Subtle decoration lines inside */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#fffdf0]/40 to-transparent" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#fffdf0]/40 to-transparent" />
        </div>
      </div>

      {/* Control Chevron Left */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white text-stone-800 flex items-center justify-center shadow-lg transition-transform hover:scale-105 duration-200 focus:outline-none"
        aria-label="前一张"
        id="btn-carousel-prev"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Control Chevron Right */}
      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white text-stone-800 flex items-center justify-center shadow-lg transition-transform hover:scale-105 duration-200 focus:outline-none"
        aria-label="后一张"
        id="btn-carousel-next"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Indicators / Circle Dots */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
              idx === currentIndex ? 'w-5 sm:w-6 bg-[#b11e22]' : 'w-2 sm:w-2.5 bg-white/80'
            }`}
            aria-label={`跳转到第 ${idx + 1} 张`}
            id={`carousel-dot-${idx}`}
          />
        ))}
      </div>
    </section>
  );
}
