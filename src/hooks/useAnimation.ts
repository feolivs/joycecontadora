import { useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'

interface AnimationConfig {
  threshold?: number
  once?: boolean
  amount?: number
  delay?: number
  duration?: number
}

const defaultConfig = {
  threshold: 0.1,
  once: true,
  amount: 0.3,
  delay: 0,
  duration: 0.5,
}

export const useAnimation = (config: AnimationConfig = {}) => {
  const ref = useInView({
    threshold: config.threshold ?? defaultConfig.threshold,
    once: config.once ?? defaultConfig.once,
    amount: config.amount ?? defaultConfig.amount,
  })

  const variants: Variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideIn: {
      hidden: { x: -20, opacity: 0 },
      visible: { x: 0, opacity: 1 },
      exit: { x: 20, opacity: 0 },
    },
    scaleIn: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
    },
    rotateIn: {
      hidden: { rotate: -10, opacity: 0 },
      visible: { rotate: 0, opacity: 1 },
      exit: { rotate: 10, opacity: 0 },
    },
    bounceIn: {
      hidden: { y: -20, opacity: 0 },
      visible: { y: 0, opacity: 1 },
      exit: { y: 20, opacity: 0 },
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    staggerItem: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  }

  return {
    ref,
    variants,
    isInView: ref.isInView,
  }
} 