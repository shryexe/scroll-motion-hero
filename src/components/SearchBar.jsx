import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'

/**
 * SearchBar component for filtering shorts
 * @param {Function} onSearch - Callback function called when search query changes
 * @param {Function} onTagFilter - Callback function called when tag is clicked
 * @param {Array} allTags - Array of all available tags for filtering
 */
const SearchBar = ({ onSearch, onTagFilter, allTags = [] }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)

  /**
   * Handle search input change
   */
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch(value)
  }

  /**
   * Clear search input
   */
  const clearSearch = () => {
    setSearchQuery('')
    onSearch('')
  }

  /**
   * Handle tag chip click
   */
  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      // Deselect if already selected
      setSelectedTag(null)
      onTagFilter(null)
    } else {
      setSelectedTag(tag)
      onTagFilter(tag)
    }
  }

  // Get unique tags
  const uniqueTags = [...new Set(allTags)]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full mb-8"
    >
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search shorts by title or tags..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          )}
        </div>
      </div>

      {/* Tag Filter Chips */}
      {uniqueTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {uniqueTags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default SearchBar

