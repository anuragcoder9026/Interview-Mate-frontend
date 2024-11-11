'use client'
import React, { useState, useEffect } from 'react'
import { FaUser, FaCalendar, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa'
import user from "../assets/images/user.png";

const EventCard = ({
  creatorName = "Jane Doe",
  creatorImage = user,
  eventTitle = "Weekly Team Sync",
  eventDescription = "Join us for our weekly team sync where we'll discuss project progress and upcoming tasks.",
  eventDateTime = "2024-11-13T22:00:00",
  eventLocation = "Online - Interview Mate",
  participants = 15,
  maxParticipants = 20
}) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isEventStarted, setIsEventStarted] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const eventTime = new Date(eventDateTime).getTime()
      const difference = eventTime - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setIsEventStarted(true)
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, []) // Removed `eventDateTime` from the dependency array

  const CountdownUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  )

  return (
    <div className="w-full overflow-hidden bg-white rounded-lg border border-gray-300 shadow-lg">
      <div className="h-3 bg-gradient-to-r from-purple to-pink" />
      <div className="flex items-center gap-4 p-4 pb-2">
        <div className="relative w-12 h-12">
          <img
            src={creatorImage}
            alt={creatorName}
            className="w-full h-full rounded-full object-cover border-2 border-white shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{eventTitle}</h2>
          <p className="text-sm text-gray-600">Hosted by {creatorName}</p>
        </div>
      </div>
      <div className="px-4 py-2">
        <p className="mb-4 text-sm text-gray-600">{eventDescription}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <FaCalendar className="text-blue-500" />
            <time dateTime={eventDateTime} className="text-gray-600">
              {new Date(eventDateTime).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
            </time>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaMapMarkerAlt className="text-red-500" />
            <span className="text-gray-600">{eventLocation}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaUsers className="text-yellow-500" />
            <span className="text-gray-600">{participants} / {maxParticipants} participants</span>
          </div>
        </div>
        <div className="bg-gray-200 rounded-lg p-4 mb-4">
          <h3 className="text-center text-sm font-semibold mb-2">
            {isEventStarted ? "Event has started!" : "Time Remaining"}
          </h3>
          {!isEventStarted && (
            <div className="flex justify-between">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <CountdownUnit value={timeLeft.minutes} label="Minutes" />
              <CountdownUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3">
        <button className="w-full py-2 px-4 bg-gradient-to-r from-purple to-pink text-white font-semibold rounded-md  hover:from-pink hover:to-purple transition-all duration-300">
          {isEventStarted ? "Join Now" : "Set Reminder"}
        </button>
      </div>
    </div>
  )
}

export default EventCard;
