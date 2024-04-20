import axios from 'axios'

export let links = []
const myLinks = async () => {
  const { data } = await axios.get(`/api/video`)
  const videos = data.videos
  videos.map((video) => {
    return links.push(video)
  })
}

myLinks()
