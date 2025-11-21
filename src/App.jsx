import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './component/shared/Navbar'
import Home from './component/Home'
import PdfUpload from './component/PdfUpload'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<PdfUpload />} />
      </Routes>
    </Router>
  )
}

export default App
