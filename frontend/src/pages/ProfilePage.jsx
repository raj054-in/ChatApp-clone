import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ProfilePage = () => {
  const { authUser,isProfileUpdating,updateProfile } = useAuthStore()
  const user = authUser?.user ?? authUser
  const [profilePic,setProfilePic]=useState(null)

  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U'
    const handleChange=(e)=>{
      setProfilePic(e.target.files?.[0]??null)


    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      if(!profilePic) return
      const formData=new FormData()
      formData.append('profilePic',profilePic)
      updateProfile(formData)

    }

  return (
    <main className="min-h-screen bg-slate-950 px-4 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center">
        <section className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/30">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800 text-2xl font-semibold text-white">
              {user?.profilePic ? (
                <img src={user.profilePic} alt={user.fullName || 'Profile'} className="h-full w-full object-cover" />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-semibold text-white">{user?.fullName || 'User profile'}</h1>

            <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4 text-left">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Update profile photo</label>
                <input
                onChange={handleChange}
                  type="file"
                  className="block w-full cursor-pointer rounded-xl border border-dashed border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Display name</label>
                <input
                  type="text"
                  value={user?.fullName || ''}
                  readOnly
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={!profilePic || isProfileUpdating}
                className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
                  profilePic && !isProfileUpdating
                    ? 'cursor-pointer bg-cyan-600 hover:bg-cyan-500'
                    : 'cursor-not-allowed bg-cyan-600 opacity-60'
                }`}
              >
                Update profile
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProfilePage