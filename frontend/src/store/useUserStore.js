import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'




export const useUserStore=create((set)=>({
    isUsersLoading:false,
    users:[],
    getUsers:async ()=>{
        set({isUsersLoading:true})
        try {
            const res= await axiosInstance.get('/message/get-all-users')
            set({users:res.data})
           
            
        } catch (error) {
            console.log(error.message)
            set({users:null})
            
        }finally{
            set({isUsersLoading:false})
        }

    },
    isMessagesLoading:false,
    messages:[],
    getMessages:async(participantId)=>{
        set({isMessagesLoading:true})
        try {
            const res=await axiosInstance.get(`/message/get-all-messages/${participantId}`)
            set({messages:res.data})
            console.log("messages",res.data)


        } catch (error) {
            console.log(error.message)
            set({messages:null})
        }finally{
            isMessagesLoading:false
        }

    },
    isParticipantSelected:false,
    participant:null,
    isMessageSending:false,


    SendMessage:async (message,participantId)=>{
        set({isMessageSending:true})
        try {
            const  res=await axiosInstance.post(`/message/send-message/${participantId}`,message)

            
        } catch (error) {
            console.log(error)
            
        }finally{
            isMessageSending:false
        }
    },
    
    



}))