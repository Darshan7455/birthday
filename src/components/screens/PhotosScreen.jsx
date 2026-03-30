"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import { Mail, Sparkles, Gift } from "lucide-react"
import GradientButton from "../GradientButton"
import confetti from "canvas-confetti"
import Image from "next/image"

export default function PhotosScreen({ playAudio, onNext }) {
  const swiperRef = useRef(null)
  const [openedPhotos, setOpenedPhotos] = useState({})
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Map photos to their corresponding songs
  const photos = [
    "/images/11.jpeg",
    "/images/22.jpeg",
    "/images/33.jpeg",
    "/images/44.jpeg",
  ]

  const songs = [
    "/audio/1.mpeg",
    "/audio/2.mpeg",
    "/audio/3.mpeg",
    "/audio/4.mpeg",
  ]

  useEffect(() => {
    // Confetti on load
    setTimeout(() => {
      confetti({
        particleCount: 25,
        spread: 70,
        origin: { y: 0.3, x: 0.5 },
        colors: ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"],
      })
    }, 300)
  }, [])

  // Play music when photo is opened (unwrapped)
  const playPhotoAudio = (index) => {
    playAudio?.(songs[index])
  }

  const togglePhoto = (index) => {
    setCurrentPhotoIndex(index)
    
    // Only play music when opening/unwrapping the photo
    if (!openedPhotos[index]) {
      playPhotoAudio(index)
    }
    
    setOpenedPhotos(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
    
    if (!openedPhotos[index]) {
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.4, x: 0.5 },
        colors: ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"],
      })
    }
  }

  return (
    <div className="px-4 md:px-6 py-10">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow flex items-center justify-center gap-2"
        >
          <Sparkles className="text-pink-400" size={32} />
          Some Sweet Moments
          <Sparkles className="text-pink-400" size={32} />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm text-rose-100/90 mt-1"
        >
          (Unwrap the gifts to see memories 🎁)
        </motion.p>
      </div>

      <div className="relative flex justify-center">
        {/* Decorative glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-fuchsia-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10"></div>

        <motion.div 
          initial={{ opacity: 0, y: 8, scale: 0.95 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Swiper
            effect="cards"
            grabCursor
            modules={[EffectCards]}
            onSwiper={(sw) => (swiperRef.current = sw)}
            className="w-[280px] h-[420px] md:w-[340px] md:h-[460px]"
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <motion.button
                  onClick={() => togglePhoto(i)}
                  className="h-full w-full rounded-2xl focus:outline-none relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {openedPhotos[i] ? (
                    // Opened - Show photo
                    <div className="h-full w-full rounded-2xl relative group">
                      {/* Glowing border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-2xl p-0.5 -z-10 opacity-75 group-hover:opacity-100 transition-opacity"></div>
                      <img
                        src={src}
                        alt={`Memory ${i + 1}`}
                        className="h-full w-full rounded-xl object-cover relative shadow-lg"
                      />
                      {/* Overlay counter */}
                      <div className="absolute top-3 right-3 bg-pink-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-semibold">
                        {i + 1}/{photos.length}
                      </div>
                      {/* Click hint */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-xs bg-black/40 backdrop-blur px-2 py-1 rounded"
                      >
                        Click to wrap
                      </motion.div>
                    </div>
                  ) : (
                    // Closed - Show gift box
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-full w-full rounded-2xl bg-gradient-to-br from-red-400 via-pink-400 to-purple-400 group-hover:shadow-xl group-hover:shadow-pink-500/50 overflow-hidden shadow-lg"
                    >
                      {/* Gift Ribbon - Horizontal */}
                      <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-yellow-300 z-10"></div>
                      
                      {/* Gift Ribbon - Vertical */}
                      <div className="absolute left-1/2 -translate-x-1/2 h-full w-2 bg-yellow-300 z-10"></div>

                      {/* Ribbon bow at center */}
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl z-20"
                      >
                        🎀
                      </motion.div>

                      {/* Gift icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Gift size={64} className="text-white drop-shadow-lg" />
                        </motion.div>
                      </div>

                      {/* Click hint */}
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs font-semibold text-center bg-black/30 backdrop-blur px-2 py-1 rounded"
                      >
                        Click to unwrap
                      </motion.div>
                    </motion.div>
                  )}
                </motion.button>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="mt-8 flex justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <GradientButton onClick={onNext} className="text-lg px-8 py-3">
          <Mail size={20} className="mt-0.5" />
          Open My Message
          <Sparkles size={20} />
        </GradientButton>
      </motion.div>
    </div>
  )
}
