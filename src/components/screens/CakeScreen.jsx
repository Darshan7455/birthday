"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { ArrowRight, Flame, WandSparkles, Sparkles } from "lucide-react"

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"];

export default function CakeScreen({ playAudio, onNext, onDecorate }) {
  const [decorated, setDecorated] = useState(false)
  const [lit, setLit] = useState(false)

  useEffect(() => {
    // Initial sparkle effect
    setTimeout(() => {
      confetti({
        particleCount: 15,
        spread: 60,
        origin: { y: 0.5, x: 0.5 },
        colors: confettiColors,
      })
    }, 300)
  }, [])

  const decorate = () => {
    if (decorated) return
    setDecorated(true)
    setTimeout(() => {
      onDecorate()
    }, 500);
  }

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    setTimeout(() => burst(), 500);
    setTimeout(() => burst(), 1000);
  }

  const burst = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors,
    })
  }

  return (
    <div className="px-4 md:px-6 py-10 text-center relative">
      {/* Decorative sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            className="absolute text-3xl"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 5}%`
            }}
          >
            ?
          </motion.div>
        ))}
      </div>

      {lit && (
        <motion.div 
          className="fixed top-32 lg:top-40 left-0 w-full text-center text-[40px] md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow leading-tight px-4 z-20"
          style={{ filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))" }}
          initial={{ opacity: 0, scale: 0.8, }}
          animate={{ opacity: 1, scale: 1, }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
        >
           Happy Birthday, Cutiepie! 
        </motion.div>
      )}

      <div className="relative flex flex-col items-center gap-8 mt-52">
        {/* Cake wrapper with glow */}
        <motion.div 
          className="relative mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-fuchsia-500/30 to-purple-500/30 rounded-full blur-3xl scale-150"></div>
          <Cake lit={lit} />
        </motion.div>

        <AnimatePresence mode="wait">
          {!lit ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <GradientButton onClick={lightCandle} className="text-lg px-8 py-3">
                <Flame size={20} />
                Light the Candle
                <Sparkles size={20} />
              </GradientButton>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 2 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <GradientButton onClick={onNext} className="text-lg px-8 py-3">
                Next
                <ArrowRight size={20} className="mt-0.5" />
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div >
  )
}

function Cake({ lit }) {
  return (
    <div className="flex flex-col items-center">
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="candle">
          {lit && <motion.div
            initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            className="flame"></motion.div>}
        </div>
      </div>
    </div>
  )
}
