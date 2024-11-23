import axios from 'axios'

export let mp3s = []
export let wordsOflife = []
export let lifeStudy = []
export const myList = async () => {
  const { data } = await axios.get(`/api/audio`)
  const audios = data.audios
  // By categories
  audios.map((audio) => {
    if (audio.category === 'Slová života') {
      return wordsOflife.push(audio)
    } else {
      return lifeStudy.push(audio)
    }
  })
}

myList()
