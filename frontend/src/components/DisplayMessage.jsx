import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const DisplayMessage = ({ message }) => {
  const { authUser } = useAuthStore()
  const authUserId = authUser.user._id
  const isOwnMessage = String(message.senderId) === String(authUserId)
  console.log(isOwnMessage)
  console.log(authUser)
  console.log(message.senderId)



  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      {message.text || message.image ? (
        <div className={`msg-bubble ${isOwnMessage ? 'msg-own' : 'msg-other'}`}>
          {message.text && <p className="wrap-break-word">{message.text}</p>}

          {message.image && (
            <img
              className="msg-image mt-2"
              src={message.image}
              alt="message"
            />
          )}
        </div>
      ) : null}
    </div>
  )
}

export default DisplayMessage