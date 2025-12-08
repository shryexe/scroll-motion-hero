import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Modal from './components/Modal'
import { useModal } from './hooks/useModal'

function App() {
  const { isOpen, openModal, closeModal, selectedItem } = useModal()

  return (
    <div className="App min-h-screen">
      <Navbar />
      <Home openModal={openModal} />
      <Modal 
        isOpen={isOpen} 
        closeModal={closeModal} 
        short={selectedItem} 
      />
    </div>
  )
}

export default App

