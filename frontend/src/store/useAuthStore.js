import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'



export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/profile')
            set({ authUser: res.data })
            console.log('check auth response', res.data)
        } catch (error) {
            console.log('error in check auth', error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (form) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', form)
            // backend may return the user object directly or under `user`
            const user = res.data.user ?? res.data
            set({ authUser: user })
            toast.success(res.data?.message || 'Successfully signed up')
            
        } catch (error) {
            set({ authUser: null })
            const msg = error?.response?.data?.message || error?.message || 'Signup failed'
            toast.error(msg)
        } finally {
            set({ isSigningUp: false })
        }
    },
    logIn:async(form)=>{
        set({isLoggingIn:true})
        try {
            const res =await axiosInstance.post('/auth/login',form)
            const user= res.data.user?? res.data
            set({authUser:user})
            toast.success(res.data.message||"User logged in")
            
        } catch (error) {
            set({authUser:null})
            toast.error(res.data.message)  
        }
        finally{
        set({isLoggingIn:false})

        }

    },
    isProfileUpdating:false,
    updateProfile:async(profilePic)=>{
        set({isProfileUpdating:true})
        try {
            const res=await axiosInstance.put(`/auth/update-profile`,profilePic)
            toast.success(res.data.message)
            console.log( "profile updated")
        } catch (error) {
            toast.error(res.data.message)
            
        }
        finally{
            set({isProfileUpdating:false})

        }
    }






}))