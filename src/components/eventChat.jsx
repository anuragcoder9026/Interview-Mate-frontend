'use client'

import { useState, useEffect, useRef } from 'react'
import { MoreVertical, X, Send, Gift, ChevronDown, CornerUpLeft } from 'lucide-react'
import user from "../assets/images/user.png";
import { useUserContext } from '../context/usercontext';
export default function EventChat() {
    const {userdata}=useUserContext();
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'JohnDoe',
      content: 'Great stream! Loving the content.',
      userType: 'member',
      avatar: user,
      badge: 'Member'
    },
    {
      id: 2,
      user: 'Alice123',
      content: 'When will the next stream be?',
      userType: 'default',
      avatar: user
    },
    {
      id: 3,
      user: 'ModTom',
      content: 'Please keep the chat respectful, everyone!',
      userType: 'moderator',
      avatar:user,
      badge: 'Moderator'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [userCount, setUserCount] = useState(1024)
  const [streamDuration, setStreamDuration] = useState(0)
  const [replyingTo, setReplyingTo] = useState(null)
  const [showDropdown, setShowDropdown] = useState(null)

  const scrollAreaRef = useRef(null)
  const bottomRef = useRef(null)

  const currentUser = {
    name: 'AdminUser',
    avatar: user,
    userType: 'admin'
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamDuration(prev => prev + 1)
      if (Math.random() > 0.7) {
        addNewUser()
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addNewUser = () => {
    const newUser = `User${Math.floor(Math.random() * 1000)}`
    const newUserMessage = {
      id: Date.now(),
      user: newUser,
      content: '',
      userType: 'default',
      avatar: user,
      isNewUser: true
    }
    setMessages(prev => [...prev, newUserMessage])
    setUserCount(prev => prev + 1)
  }

  const handleSendMessage = (event) => {
    event.preventDefault()
    if (newMessage.trim() === '') return

    const newMsg = {
      id: Date.now(),
      user: currentUser.name,
      content: newMessage,
      userType: currentUser.userType,
      avatar: currentUser.avatar,
      replyTo: replyingTo
    }

    setMessages(prev => [...prev, newMsg])
    setNewMessage('')
    setReplyingTo(null)
  }

  const handleReply = (message) => {
    setReplyingTo({
      id: message.id,
      user: message.user,
      content: message.content
    })
    setShowDropdown(null)
  }

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full text-white min-h-screen flex flex-col" style={{backgroundColor:"#0f0f0f"}}>
      <div className="sticky -top-1 z-10 border-b border-gray-800" style={{backgroundColor:"#0f0f0f"}}>
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-medium flex items-center gap-2">
            Live chat
            <ChevronDown className="w-4 h-4" />
          </h2>
          <div className="flex items-center gap-2">
            <button className="text-white hover:bg-gray-800 p-2 rounded-full">
              <MoreVertical className="w-5 h-5" />
            </button>
            <button className="text-white hover:bg-gray-800 p-2 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="px-4 py-2 text-sm text-gray-400 flex justify-between items-center">
          <span>{userCount.toLocaleString()} watching now</span>
          <span>Stream duration: {formatDuration(streamDuration)}</span>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start gap-3 ${message.isNewUser ? 'animate-pulse' : ''}`}>
              <img src={message.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                {message.isNewUser ? (
                  <div className="flex items-center gap-2 bg-blue-500 bg-opacity-20 p-2 rounded-md">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                    <span className="font-medium text-blue-400">{message.user} joined the chat</span>
                    <Gift className="w-4 h-4 text-yellow-500" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-medium ${
                        message.userType === 'admin' 
                          ? 'text-[#ff0000]'
                          : message.userType === 'moderator' 
                            ? 'text-[#2ba640]' 
                            : message.userType === 'member' 
                              ? 'text-[#2196f3]' 
                              : 'text-[#fff]'
                      }`}>
                        {message.user}
                      </span>
                      {message.badge && (
                        <span className="bg-transparent border border-gray-600 text-gray-300 text-xs px-1 py-0.5 rounded">
                          {message.badge}
                        </span>
                      )}
                      {message.userType === 'admin' && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                    {message.replyTo && (
                      <div className="mt-1 mb-2 text-sm text-gray-400 flex items-center gap-1">
                        <CornerUpLeft className="w-3 h-3" />
                        <span>Replying to {message.replyTo.user}</span>
                      </div>
                    )}
                    <p className="text-[#fff] mt-0.5 break-words">{message.content}</p>
                  </>
                )}
              </div>
              {currentUser.userType === 'admin' && message.userType !== 'admin' && !message.isNewUser && (
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(showDropdown === message.id ? null : message.id)}
                    className="text-white hover:bg-gray-800 p-1 rounded-full"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {showDropdown === message.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                          onClick={() => handleReply(message)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          role="menuitem"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-[#0f0f0f] border-t border-gray-800 p-4">
        <form onSubmit={handleSendMessage} className="space-y-2">
          {replyingTo && (
            <div className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
              <span className="text-sm text-gray-400">
                Replying to {replyingTo.user}: {replyingTo.content.slice(0, 50)}...
              </span>
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="text-gray-400 hover:text-white p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="flex items-center gap-4">
            <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Chat ${replyingTo ? 'in reply' : 'publicly'} as ${currentUser.name}`}
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2"
            />
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}