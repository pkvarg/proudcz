import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState(null)
  const [unsubscribers, setUnsubscribers] = useState(null)
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  useEffect(() => {
    const getSubscribers = async () => {
      const { data } = await axios.get(`/api/subscribers/subscribed`, config)
      setSubscribers(data)
    }
    const getUnsubscribers = async () => {
      const { data } = await axios.get(`/api/subscribers/unsubscribed`, config)
      setUnsubscribers(data)
    }

    getSubscribers()
    getUnsubscribers()
  }, [])

  const extractEmails = (element) => {
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g
    const text = element.innerText
    return text.match(emailRegex) || []
  }

  const copyEmails = () => {
    const emailContainer = document.getElementById('email-container')
    if (emailContainer) {
      const emails = extractEmails(emailContainer)
      const emailText = emails.join('; ')

      navigator.clipboard
        .writeText(emailText)
        .then(() => {
          alert('Emails copied to clipboard!')
        })
        .catch((err) => {
          console.error('Failed to copy emails: ', err)
        })
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>Odběratelé novinek</h1>
      </div>

      <div id='email-container'>
        {subscribers?.map((user) => (
          <div key={user._id}>
            <p>
              {user.name} {user.email}
            </p>
          </div>
        ))}
      </div>
      <button onClick={copyEmails}>Kopírovat mailové adresy odběratelů</button>
      <div>
        <h1>Odběr zrušili</h1>
        <div id='email-container'>
          {unsubscribers?.map((user) => (
            <div key={user._id}>
              <p>
                {' '}
                {user.name} {user.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Subscribers
