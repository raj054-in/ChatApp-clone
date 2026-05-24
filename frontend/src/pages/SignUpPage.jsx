import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const SignUpPage = () => {
  const navigate = useNavigate()
  const {signUp,isSigningUp}=useAuthStore()
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  
  
  const handleChange=(e)=>{
    const {name,value}=e.target
    setForm(prev=>({...prev,[name]:value}))
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
   const isSignedUp= signUp(form)
   if (isSignedUp) {
    navigate('/')
    
   }
   
   
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create account</h2>

        <label className="block mb-4">
          <span className="text-sm text-gray-300">Full name</span>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your full name"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-gray-300">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm text-gray-300">Password</span>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={isSigningUp}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold py-2 px-4 rounded-md"
        >
          {isSigningUp ? 'Creating...' : 'Sign up'}
        </button>

        
        <p className="mt-4 text-center text-sm text-gray-400">Already have an account? <Link to='/login' className=' text-indigo-400' >LogIn</Link></p>
      </form>
    </div>
  )
}

export default SignUpPage