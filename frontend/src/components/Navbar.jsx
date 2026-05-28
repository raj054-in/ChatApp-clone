import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'


const Navbar = () => {
  const {logOut}=useAuthStore()



  const handleLogout = () => {
      logOut()
  




    console.log('logout clicked')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
              <path d="M12 3C6.48 3 2 6.94 2 11.8c0 2.66 1.34 5.04 3.46 6.65V22l3.22-1.77c1.06.29 2.18.45 3.32.45 5.52 0 10-3.94 10-8.8S17.52 3 12 3zm-3.2 9.3a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zm3.2 0a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zm3.2 0a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" />
            </svg>
          </span>
          <span className="text-sm font-semibold tracking-wide text-white sm:text-base">ChatApp</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/settings"
            className="inline-flex items-center gap-2 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-xs font-medium text-gray-200 transition hover:border-gray-500 hover:text-white sm:text-sm"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 15.5A3.5 3.5 0 1012 8.5a3.5 3.5 0 000 7z" />
              <path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06A1.7 1.7 0 0015 19.4a1.7 1.7 0 00-1 .32 1.7 1.7 0 01-2 0 1.7 1.7 0 00-1-.32 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.7 1.7 0 004.6 15a1.7 1.7 0 00-.32-1 1.7 1.7 0 010-2 1.7 1.7 0 00.32-1 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06A1.7 1.7 0 009 4.6c.35 0 .69-.11 1-.32a1.7 1.7 0 012 0c.31.21.65.32 1 .32.72 0 1.4-.24 1.91-.66l.06-.06a2 2 0 112.83 2.83l-.06.06A1.7 1.7 0 0019.4 9c0 .35.11.69.32 1a1.7 1.7 0 010 2c-.21.31-.32.65-.32 1z" />
            </svg>
            <span className="hidden sm:inline">Settings</span>
          </Link>

          <Link
            to="/profile"
            className="inline-flex items-center gap-2 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-xs font-medium text-gray-200 transition hover:border-gray-500 hover:text-white sm:text-sm"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M20 21a8 8 0 10-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="hidden sm:inline">Profile</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500 sm:text-sm"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar