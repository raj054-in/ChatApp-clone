import React, { useState } from 'react'
import { useUserStore } from '../store/useUserStore'

const SendMessage = () => {
  const [message, setMessage] = useState({ text: '', image: null })
  const{SendMessage,participant}=useUserStore()

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;

    if (type === 'file') {
      setMessage(prev => ({
        ...prev,
        [name]: files?.[0] || null,
      }))
      return
    }

    setMessage(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData=new FormData()
    formData.append('text',message.text)
    formData.append('image',message.image)

    if (!message.text.trim() && !message.image) {
      return
    }
    SendMessage(formData,participant._id)


    setMessage({ text: '', image: null })
    event.target.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-800 bg-gray-950 p-3">
      <div className="flex items-end gap-2 rounded-2xl border border-gray-800 bg-gray-900/80 p-2 shadow-lg shadow-black/10">
        <label
          htmlFor="messageImage"
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-gray-700 bg-gray-900 text-gray-400 transition hover:border-indigo-500 hover:text-indigo-400"
          aria-label="Upload image"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l5-5 5 5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v12" />
          </svg>
        </label>

        <div className="flex-1">
          <textarea
            id="messageText"
            name="text"
            value={message.text}
            onChange={handleChange}
            placeholder="Type a message..."
            rows="2"
            className="min-h-11 w-full resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>

        <input
          id="messageImage"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        <button
          type="submit"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          Send
        </button>
      </div>
    </form>
  )
}

export default SendMessage