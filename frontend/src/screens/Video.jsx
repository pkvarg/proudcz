import React from 'react'
import YoutubeEmbed from '../components/YouTubeEmbed'
import { links } from '../youtubeLinks/youtubeLinks'

const Video = () => {
  // sort by abc
  links.sort((a, b) => {
    return a.videoTitle.localeCompare(b.videoTitle)
  })
  return (
    <>
      <div className='my-3'>
        <h1>Video</h1>
        {links.map((link) => (
          <YoutubeEmbed key={link._id} embedId={link.code} />
        ))}
      </div>
    </>
  )
}

export default Video
