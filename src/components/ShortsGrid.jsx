import { motion } from 'framer-motion'
import ShortCard from './ShortCard'

/**
 * ShortsGrid component - displays a responsive grid of short cards
 * @param {Array} shorts - Array of short objects to display
 * @param {Function} onCardClick - Callback function when a card is clicked
 */
const ShortsGrid = ({ shorts, onCardClick }) => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {shorts.length > 0 ? (
        shorts.map((short, index) => (
          <ShortCard
            key={short.id}
            short={short}
            onClick={() => onCardClick(short)}
            index={index}
          />
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full text-center py-16"
        >
          <p className="text-gray-400 text-lg">No shorts found. Try a different search or filter.</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ShortsGrid

