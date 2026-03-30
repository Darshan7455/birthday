"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Sparkles } from "lucide-react"

export default function LoaderScreen({ onDone }) {
    const [count, setCount] = useState(3)
    const [isClient, setIsClient] = useState(false)

    // Generate sparkle positions only on client
    const sparklePositions = useMemo(() => {
        if (!isClient) return []
        return [...Array(6)].map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100
        }))
    }, [isClient])

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        const t = setInterval(() => {
            setCount((c) => {
                if (c <= 1) {
                    clearInterval(t)
                    // Confetti burst on countdown complete
                    setTimeout(() => {
                        confetti({
                            particleCount: 100,
                            spread: 360,
                            origin: { y: 0.5, x: 0.5 },
                            colors: ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"],
                        })
                    }, 200)
                    setTimeout(() => onDone?.(), 420)
                    return 0
                }
                return c - 1
            })
        }, 900)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="w-full grid place-items-center relative">
            {/* Animated background sparkles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {sparklePositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                        transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                        className="absolute text-2xl"
                        style={{
                            left: `${pos.left}%`,
                            top: `${pos.top}%`
                        }}
                    >
                        ✨
                    </motion.div>
                ))}
            </div>

            <div className="relative">
                <div className="spinner">
                    <div className="spinner1"></div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        key={count}
                        initial={{ scale: 0.3, opacity: 0, rotate: -180 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        className="text-[110px] md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 drop-shadow-[0_0_30px_rgba(236,72,153,0.25)] p-0.5 pt-7"
                    >
                        {count}
                    </motion.div>
                </div>
            </div>
            <motion.h1
                className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 mt-14 text-center py-1.5 flex items-center justify-center gap-2"
                animate={{ opacity: [0.8, 1, 0.8], scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <Sparkles size={24} />
                Crafting your special moment...
                <Sparkles size={24} />
            </motion.h1>
        </div>
    )
}
