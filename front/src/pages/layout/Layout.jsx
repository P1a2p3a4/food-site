 import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import './layout.css'

const Layout = ({ children }) => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        {children}
      </div>
    </div>
  )
}

export default Layout