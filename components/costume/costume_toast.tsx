"use client"

import { useState, useEffect } from 'react'
import { X, ExternalLink, OctagonAlert } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'

function CostumeToast() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const x = useMotionValue(0)
  const opacity = useTransform(x, [0, 50], [1, 0.5])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsMinimized(true)
  }

  const handleExpand = () => {
    setIsMinimized(false)
  }

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 10) {
      setIsMinimized(true)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-16 right-4 z-50">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          // Minimized icon button
          <motion.button
            key="minimized"
            onClick={handleExpand}
            initial={{ scale: 0, borderRadius: 8 }}
            animate={{ scale: 1, borderRadius: 50 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.4
            }}
            className="w-12 h-12 bg-destructive text-white rounded-full shadow-xl flex items-center justify-center cursor-pointer"
            title="Show notification"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <OctagonAlert size={24} />
            </motion.div>
          </motion.button>
        ) : (
          // Full toast
          <motion.div
            key="expanded"
            drag="x"
            dragConstraints={{ left: 0, right: 100 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ x, transformOrigin: 'top right' }}
            initial={{ scale: 0.3, opacity: 0, borderRadius: 50, originX: 1, originY: 0 }}
            animate={{ scale: 1, opacity: 1, borderRadius: 8, x: 0 }}
            exit={{ scale: 0.3, opacity: 0, borderRadius: 50, x: 50 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
              duration: 0.5
            }}
            className="w-80 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 overflow-hidden cursor-grab active:cursor-grabbing"
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between px-4 py-3 bg-destructive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <OctagonAlert className="text-white" size={20} />
              <motion.span
                className="text-white font-semibold text-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                Important Notice
              </motion.span>
              <motion.button
                onClick={handleClose}
                className="text-white/80 hover:text-white cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </motion.div>

            {/* Content */}
            <motion.div
              className="px-4 py-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                To attend the event, you must <strong>register</strong> to save your place at DevFest Constantine 2025!
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Don&apos;t know how? Check this video tutorial 👇
              </p>

              {/* Tutorial Link */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Link
                  href="https://www.instagram.com/p/DRsJv6YCKBe/"
                  target="_blank"
                  className="flex items-center gap-2 mt-3 px-3 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Watch Tutorial
                  <ExternalLink size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CostumeToast
