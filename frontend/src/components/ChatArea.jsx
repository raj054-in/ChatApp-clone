import React from 'react'
import { useUserStore } from '../store/useUserStore'
import SendMessage from './SendMessage'
import DisplayMessage from './DisplayMessage'

const ChatArea = () => {
  const {messages,participant}=useUserStore()

  




  return (
    <div className='flex h-full min-h-0 flex-col overflow-hidden'>
      <div className="chat-area">
        <div className="chat-header h-1/10">
          <img className='user-avatar' src={participant?.profilePic} alt="" />
          <div>
            <div className='font-semibold'>{participant?.fullName}</div>
            <div className='text-sm text-[rgba(255,255,255,0.5)]'>Active now</div>
          </div>
        </div>

        <div id="chat" className="chat-list h-6/10">
          {
            messages.map((message) => (
             <DisplayMessage key={message._id} message={message} />
            ))
          }

        </div>

        <div className="chat-footer h-2/10">
          <SendMessage />
        </div>
      </div>
    </div>
  )
}

export default ChatArea