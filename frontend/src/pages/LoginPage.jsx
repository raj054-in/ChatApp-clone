import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const LoginPage = () => {
  const navigate=useNavigate()
  const {isLoggingIn,logIn}=useAuthStore()
  const [form,setForm]=useState({
    email:"",
    password:""
  })
  const handleChange=(e)=>{
    const {name,value}=e.target
    setForm(prev=>({...prev ,[name]:value}))
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    logIn(form)
    if (!isLoggingIn) {
      navigate('/')  
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Welcome back</h2>

        <label className="block mb-4">
          <span className="text-sm text-gray-300">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm text-gray-300">Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </label>

        <button
          type='submit'
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Log in
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-indigo-400">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage