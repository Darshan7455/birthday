"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import GradientButton from "../GradientButton"
import { Gift, Sparkles, Heart } from "lucide-react"
import confetti from "canvas-confetti"

export default function IntroScreen({ playAudio, onNext }) {
    useEffect(() => {
        // Sparkle effect on mount
        setTimeout(() => {
            confetti({
                particleCount: 40,
                spread: 50,
                origin: { y: 0.4, x: 0.5 },
                colors: ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"],
            })
        }, 600)
    }, [])

    const startSurprise = () => {
        // Play birthday song
        playAudio?.("/audio/5.mpeg")
        onNext?.()
    }

    const floatingEmojis = ["??", "??", "??", "??", "?"]

    return (
        <div className="py-10 md:py-14 text-center relative overflow-hidden">
            {/* Floating emojis background */}
            <div className="absolute inset-0 pointer-events-none">
                {floatingEmojis.map((emoji, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: [0, 1, 0], y: -100 }}
                        transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
                        className="absolute text-3xl md:text-4xl"
                        style={{
                            left: `${(i * 20) + 10}%`,
                        }}
                    >
                        {emoji}
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-col items-center gap-6 relative z-10">
                {/* Animated image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-full blur-2xl opacity-40 scale-110"></div>
                    <img
                        src="/gifs/intro.gif"
                        alt="Cute birthday animation topper"
                        className="w-[140px] md:w-[180px] object-cover relative z-10 rounded-full"
                    />
                </motion.div>

                <div>
                    {/* Animated title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-pretty text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow leading-tight flex items-center justify-center gap-2 flex-wrap"
                        style={{
                            filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))",
                        }}
                    >
                        <Heart className="text-pink-400" size={32} />
                        A Cutiepie was born today, 20 years ago!
                        <Heart className="text-pink-400" size={32} />
                    </motion.h1>

                    {/* Animated subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-4 text-xl text-pink-200"
                    >
                        Yes, it's YOU! A little surprise awaits...
                    </motion.p>
                </div>

                {/* Animated button with pulse effect */}
                <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <GradientButton
                        onClick={startSurprise}
                        className="text-lg px-8 py-3"
                    >
                        <Gift size={20} />
                        Start the surprise
                        <Sparkles size={20} />
                    </GradientButton>
                </motion.div>
            </div>
        </div>
    )
}
