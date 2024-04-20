import axios from 'axios'

export let images = []
export const myImages = async () => {
  const { data } = await axios.get(`/api/banner`)
  const banners = data.banners
  banners.map((banner) => {
    return images.push(banner)
  })
}

myImages()
