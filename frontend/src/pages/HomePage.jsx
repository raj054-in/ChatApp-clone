import React, { use, useEffect, useEffectEvent } from 'react'
import Navbar from '../components/Navbar'
import { useUserStore } from '../store/useUserStore'
import ChatArea from '../components/ChatArea'
import { useAuthStore } from '../store/useAuthStore'

export const HomePage = () => {
  const {isUsersLoading,users,getUsers,isMessagesLoading,messages,getMessages,isParticipantSelected,participant}=useUserStore()
  const {onlineUsers}=useAuthStore()
  useEffect(() => {
    
    getUsers()
  }, [])
  console.log(users)





  const chatSelected=(user)=>{
    const participantId=user._id
    getMessages(participantId)
    
    useUserStore.setState({isParticipantSelected:true})
    useUserStore.setState({participant:user})
    console.log(user)
    console.log(participant)
  }
  





  return (
   
    <div className='h-screen w-screen bg-black text-white flex flex-col'>
      <Navbar/>
      <div id="homepageBody" className='homepage-body'>
      <aside className='homepage-aside'>
      {
        users.map((user)=>(
          <div onClick={()=>{chatSelected(user)}} key={user._id} className='user-card flex items-center w-full'>
            {user.profilePic ? (
              <img src={user.profilePic} alt={user.fullName} className='w-10 h-10 rounded-full object-cover mr-3' />
            ) : (
              <div className='w-10 h-10 rounded-full bg-white/6 mr-3 flex items-center justify-center text-sm font-semibold'>
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <h3 className='user-name flex-1'>{user.fullName}</h3>
            {
              onlineUsers?.includes(String(user._id))? (
                <div className='h-3 w-3 rounded-full bg-green-500 ml-auto'></div>
                
              ):null
            }
          </div>
        ))
      }

      </aside>


      <main id="chatArea" className='homepage-main overflow-hidden'>
      {
        isParticipantSelected? <ChatArea/> : <div className='h-full w-full flex items-center justify-center'><h2 className='text-2xl empty-state'>Select a user to start chatting</h2></div>
      }
       


      </main>

      </div>

      
    </div>
  )
}
