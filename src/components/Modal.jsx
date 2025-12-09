import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiPlay } from 'react-icons/fi'

/**
 * Modal component - displays full-screen video preview
 * @param {Boolean} isOpen - Whether modal is open
 * @param {Function} closeModal - Function to close modal
 * @param {Object} short - Short data object to display
 */
const Modal = ({ isOpen, closeModal, short }) => {
  /**
   * Handle escape key press to close modal
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeModal])

  if (!short) return null

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 50
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/70 hover:bg-black/90 rounded-full text-white transition-colors backdrop-blur-sm"
                aria-label="Close modal"
              >
                <FiX className="text-2xl" />
              </button>

              {/* Video Container */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={short.videoUrl}
                  title={short.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 space-y-4">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {short.title}
                </h2>

                {/* Tags */}
                {short.tags && short.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {short.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {short.description}
                </p>

                {/* Duration */}
                <div className="flex items-center gap-2 text-gray-400">
                  <FiPlay className="text-lg" />
                  <span className="text-sm font-medium">{short.duration}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal

