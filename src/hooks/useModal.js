import { useState } from 'react'

/**
 * Custom hook to manage modal state
 * @returns {Object} Modal state and control functions
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  /**
   * Open modal with selected short item
   * @param {Object} item - The short item to display in modal
   */
  const openModal = (item) => {
    setSelectedItem(item)
    setIsOpen(true)
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  /**
   * Close modal and reset state
   */
  const closeModal = () => {
    setIsOpen(false)
    setSelectedItem(null)
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = 'unset'
  }

  return {
    isOpen,
    openModal,
    closeModal,
    selectedItem
  }
}

