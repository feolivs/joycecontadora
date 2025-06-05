import { motion } from 'framer-motion'
import { useAnimation } from '../hooks/useAnimation'

interface AnimatedElementProps {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
  once?: boolean
  amount?: number
}

const AnimatedElement = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  once = true,
  amount = 0.3,
}: AnimatedElementProps) => {
  const { ref, isInView, variants, transition } = useAnimation({
    threshold,
    once,
    amount,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      exit="exit"
      variants={variants}
      transition={{
        ...transition,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedElement 