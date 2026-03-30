"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import GradientButton from "../GradientButton"
import { ArrowRight, Sparkles, Gift, Lock } from "lucide-react"
import confetti from "canvas-confetti"

export default function MessageScreen({ onNext }) {
    const [revealed, setRevealed] = useState([false, false, false])
    const allRevealed = revealed.every(r => r)
    
    const photos = [
        "/images/55.jpeg",
        "/images/66.jpeg",
        "/images/77.jpeg"
    ]
    const giftsContent = [
        { emoji: "/images/55.jpeg", label: "" },
        { emoji: "/images/66.jpeg", label: "" },
        { emoji: "/images/77.jpeg", label: "" }
    ]

    useEffect(() => {
        // Sparkle effect on mount
        setTimeout(() => {
            confetti({
                particleCount: 30,
                spread: 60,
                origin: { y: 0.3, x: 0.5 },
                colors: ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"],
            })
        }, 500)
    }, [])

    const revealGift = (index) => {
        setRevealed(prev => {
            const newRevealed = [...prev]
            newRevealed[index] = true
            return newRevealed
        })
        
        confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.4, x: Math.random() },
            colors: ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"],
        })
    }

    const messageParts = [
        "You deserve all the happiness, love, and smiles in the world today and always.",
        "You have this special way of making everything around you brighter. Your smile, kindness, and the way you make people feel truly cared for is amazing.",
        "You're truly one of a kind! Keep being the amazing person you are, spreading joy wherever you go."
    ]

    return (
        <div className="px-4 md:px-6 py-10 text-center relative">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-4 leading-tight flex items-center justify-center gap-2"
            >
                <Sparkles size={28} className="text-pink-400" />
                Special gifts for you
                <Sparkles size={28} className="text-pink-400" />
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-pink-300 text-lg mb-8 font-semibold"
            >
            </motion.p>

            {/* Gift Boxes - Interactive Puzzle */}
            <div className="mx-auto max-w-3xl">
                <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {messageParts.map((part, index) => (
                        <motion.button
                            key={index}
                            onClick={() => revealGift(index)}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            disabled={revealed[index]}
                            className="relative h-40 cursor-pointer group focus:outline-none"
                        >
                            {/* Gift Box */}
                            <motion.div
                                animate={revealed[index] ? { scale: 1.1, rotate: 6 } : { y: [0, -8, 0] }}
                                transition={revealed[index] ? {} : { duration: 2, repeat: Infinity }}
                                className={`absolute inset-0 rounded-lg transition-all overflow-hidden ${
                                    revealed[index]
                                        ? "bg-white"
                                        : "bg-gradient-to-br from-red-400 via-pink-400 to-purple-400 group-hover:shadow-xl group-hover:shadow-pink-500/50"
                                }`}
                            >
                                {revealed[index] ? (
                                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                                            className="relative w-full h-full flex items-center justify-center p-4"
                                        >
                                            <img
                                                src={photos[index]}
                                                alt={`Gift ${index + 1}`}
                                                className="max-w-full max-h-full  object-contain rounded-lg"
                                            />
                                            {/* Glowing wrapped effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 via-transparent to-transparent pointer-events-none rounded-lg"></div>
                                        </motion.div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Gift Ribbon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-full h-1 bg-yellow-300"></div>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="h-full w-1 bg-yellow-300"></div>
                                        </div>

                                        {/* Gift Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Gift size={48} className="text-white drop-shadow-lg" />
                                        </div>
                                    </>
                                )}
                            </motion.div>

                            {/* Lock icon before revealing */}
                            {!revealed[index] && (
                                <motion.div
                                    animate={{ y: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute top-2 right-2 bg-yellow-300 rounded-full p-1 text-xs font-bold text-black"
                                >
                                    {index + 1}
                                </motion.div>
                            )}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Revealed Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: allRevealed ? 1 : 0, y: allRevealed ? 0 : 20 }}
                    transition={{ duration: 0.8 }}
                    className="mt-10"
                >
                    <div className="relative group">
                        {/* Animated border effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-3xl p-0.5 opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>

                        {/* Card content */}
                        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-3xl p-8 md:p-10 backdrop-blur-sm border border-white/10">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: allRevealed ? 1 : 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                            >
                                <p className="text-2xl md:text-3xl mb-6 text-pink-300 font-semibold">
                                    Happy Birthday, Cutiepie! 🎂
                                </p>

                                <p className="text-lg md:text-xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-fuchsia-200 to-purple-200 font-light mb-6">
                                    {messageParts.map((part, i) => (
                                        <span key={i}>
                                            {part}
                                            {i < messageParts.length - 1 && <br />}
                                            {i < messageParts.length - 1 && <br />}
                                        </span>
                                    ))}
                                </p>

                                
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* End button - shows when all gifts revealed */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: allRevealed ? 1 : 0, y: allRevealed ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10"
            >
                <GradientButton onClick={onNext} className="gap-2">
                    <Sparkles size={20} />
                    End of Surprise
                    <ArrowRight size={20} />
                </GradientButton>
            </motion.div>
        </div>
    )
}
