import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Dropdown, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listAudioDetails, updateAudio } from '../actions/audioActions'
import { AUDIO_UPDATE_RESET } from '../constants/audioConstants'

const AudioEditScreen = () => {
  const params = useParams()
  const audioId = params.id
  const navigate = useNavigate()

  const [audioTitle, setAudioTitle] = useState('')
  const [mp3file, setMp3file] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')

  const [uploading, setUploading] = useState(false)

  /* All Audios Dropdown content*/
  const audioList = useSelector((state) => state.audioList)
  const { audios } = audioList

  const dispatch = useDispatch()

  const audioDetails = useSelector((state) => state.audioDetails)
  const { loading, error, audio } = audioDetails

  const audioUpdate = useSelector((state) => state.audioUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = audioUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: AUDIO_UPDATE_RESET })
      navigate('/admin/audio')
    } else {
      if (!audio.audioTitle || audio._id !== audioId) {
        dispatch(listAudioDetails(audioId))
      } else {
        setAudioTitle(audio.audioTitle)
        setMp3file(audio.mp3file)
        setCategory(audio.category)
        setSubcategory(audio.subcategory)
      }
    }
  }, [dispatch, navigate, audioId, audio, successUpdate, audios])

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0]
  //   const formData = new FormData()
  //   formData.append('upload', file)
  //   setUploading(true)

  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }

  //     const { data } = await axios.post('/api/upload', formData, config)

  //     setMp3file(data)
  //     setUploading(false)
  //   } catch (error) {
  //     console.error(error)
  //     setUploading(false)
  //   }
  // }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateAudio({
        _id: audioId,
        audioTitle,
        mp3file,
        category,
        subcategory,
      })
    )
  }

  return (
    <>
      <Link to='/admin/audio' className='btn btn-back my-3'>
        Zpět
      </Link>
      <FormContainer>
        <h1>Audio</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='audio-title'>
              <Form.Label>Název (napr. Bůh v listu Římanům I)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Název'
                value={audioTitle}
                onChange={(e) => setAudioTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='audio-file' className='mb-3'>
              <Form.Label>Linka z Google drive (bez uvozovek)</Form.Label>
              <Image
                className='audio-edit-iframe'
                src='/images/iframe.webp'
                alt='iframe'
              />
              <Form.Control
                type='text'
                placeholder='Linka z Google drive'
                value={mp3file}
                onChange={(e) => setMp3file(e.target.value)}
              ></Form.Control>
              {/* <Form.Control
                type='file'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />} */}
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Kategorie</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
                  className='category-dropdown rounded'
                >
                  Kategorie
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    key='Slova života'
                    value='Slova života'
                    onClick={() => setCategory('Slova života')}
                  >
                    <h5 className='language-dropdown-lang'>Slova života</h5>
                  </Dropdown.Item>
                  <Dropdown.Item
                    key='Studium života'
                    value='Studium života'
                    onClick={() => setCategory('Studium života')}
                  >
                    <h5 className='language-dropdown-lang'>Studium života</h5>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Form.Control
                type='text'
                placeholder='Kategorie'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {category !== 'Studium života' && (
              <Form.Group controlId='subcategory' className='my-3'>
                <Form.Label>Podkategorie</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    variant='success'
                    id='dropdown-basic'
                    className='category-dropdown rounded'
                  >
                    Podkategorie
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      key='Bůh v listu Římanům'
                      value='Bůh v listu Římanům'
                      onClick={() => setSubcategory('Bůh v listu Římanům')}
                    >
                      <h5 className='language-dropdown-lang'>
                        Bůh v listu Římanům
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Boží evangelium'
                      value='Boží evangelium'
                      onClick={() => setSubcategory('Boží evangelium')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Boží evangelium
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Člověk a dva stromy'
                      value='Člověk a dva stromy'
                      onClick={() => setSubcategory('Člověk a dva stromy')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Člověk a dva stromy
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Evangelium království'
                      value='Evangelium království'
                      onClick={() => setSubcategory('Evangelium království')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Evangelium království
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Fakt, víra a prožitek'
                      value='Fakt, víra a prožitek'
                      onClick={() => setSubcategory('Fakt, víra a prožitek')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Fakt, víra a prožitek
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Hlavní Kristovy kroky'
                      value='Hlavní Kristovy kroky'
                      onClick={() => setSubcategory('Hlavní Kristovy kroky')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Hlavní Kristovy kroky
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Charakter Pánova pracovníka'
                      value='Charakter Pánova pracovníka'
                      onClick={() =>
                        setSubcategory('Charakter Pánova pracovníka')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Charakter Pánova pracovníka
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Kristovo vzkříšení'
                      value='Kristovo vzkříšení'
                      onClick={() => setSubcategory('Kristovo vzkříšení')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Kristovo vzkříšení
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Kristus jako slitovnice'
                      value='Kristus jako slitovnice'
                      onClick={() => setSubcategory('Kristus jako slitovnice')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Kristus jako slitovnice{' '}
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Křesťanský život'
                      value='Křesťanský život'
                      onClick={() => setSubcategory('Křesťanský život')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Křesťanský život
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Milostivé léto'
                      value='Milostivé léto'
                      onClick={() => setSubcategory('Milostivé léto')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Milostivé léto
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Naplnění Starého zákona'
                      value='Naplnění Starého zákona'
                      onClick={() => setSubcategory('Naplnění Starého zákona')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Naplnění Starého zákona{' '}
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Nevystižitelné Kristovo bohatství'
                      value='Nevystižitelné Kristovo bohatství'
                      onClick={() =>
                        setSubcategory('Nevystižitelné Kristovo bohatství')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Nevystižitelné Kristovo bohatství
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='O člověku'
                      value='O člověku'
                      onClick={() => setSubcategory('O člověku')}
                    >
                      <h5 className='language-dropdown-lang'> O člověku</h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='O Duchu'
                      value='O Duchu'
                      onClick={() => setSubcategory('O Duchu')}
                    >
                      <h5 className='language-dropdown-lang'> O Duchu</h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='O Kristu'
                      value='O Kristu'
                      onClick={() => setSubcategory('O Kristu')}
                    >
                      <h5 className='language-dropdown-lang'> O Kristu</h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Poselství evangelia'
                      value='Poselství evangelia'
                      onClick={() => setSubcategory('Poselství evangelia')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Poselství evangelia
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Prožívání Krista'
                      value='Prožívání Krista'
                      onClick={() => setSubcategory('Prožívání Krista')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Prožívání Krista
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Rozdílení života'
                      value='Rozdílení života'
                      onClick={() => setSubcategory('Rozdílení života')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Rozdílení života
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Řada pro nové věřící'
                      value='Řada pro nové věřící'
                      onClick={() => setSubcategory('Řada pro nové věřící')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Řada pro nové věřící
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Spasení'
                      value='Spasení'
                      onClick={() => setSubcategory('Spasení')}
                    >
                      <h5 className='language-dropdown-lang'> Spasení</h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Struktura Božího evangelia'
                      value='Struktura Božího evangelia'
                      onClick={() =>
                        setSubcategory('Struktura Božího evangelia')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Struktura Božího evangelia
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Svědomí'
                      value='Svědomí'
                      onClick={() => setSubcategory('Svědomí')}
                    >
                      <h5 className='language-dropdown-lang'> Svědomí</h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Trojnásobné semeno'
                      value='Trojnásobné semeno'
                      onClick={() => setSubcategory('Trojnásobné semeno')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Trojnásobné semeno
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Učení apoštolů'
                      value='Učení apoštolů'
                      onClick={() => setSubcategory('Učení apoštolů')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Učení apoštolů
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Věčný Boží plán'
                      value='Věčný Boží plán'
                      onClick={() => setSubcategory('Věčný Boží plán')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Věčný Boží plán
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Vypořádání se s hříchy'
                      value='Vypořádání se s hříchy'
                      onClick={() => setSubcategory('Vypořádání se s hříchy')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Vypořádání se s hříchy
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Vypořádání se se světem'
                      value='Vypořádání se se světem'
                      onClick={() => setSubcategory('Vypořádání se se světem')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Vypořádání se se světem
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Vzepřít se Satanovi'
                      value='Vzepřít se Satanovi'
                      onClick={() => setSubcategory('Vzepřít se Satanovi')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Vzepřít se Satanovi
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Základní prvky křesťanského života'
                      value='Základní prvky křesťanského života'
                      onClick={() =>
                        setSubcategory('Základní prvky křesťanského života')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Základní prvky křesťanského života
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Zjevení života'
                      value='Zjevení života'
                      onClick={() => setSubcategory('Zjevení života')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Zjevení života
                      </h5>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key='Zkušenosti věřících s Kristovým vzkříšením'
                      value='Zkušenosti věřících s Kristovým vzkříšením'
                      onClick={() =>
                        setSubcategory(
                          'Zkušenosti věřících s Kristovým vzkříšením'
                        )
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Zkušenosti věřících s Kristovým vzkříšením
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Zkušenost života'
                      value='Zkušenost života'
                      onClick={() => setSubcategory('Zkušenost života')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Zkušenost života
                      </h5>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  type='text'
                  placeholder='Podkategorie'
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}

            {category === 'Studium života' && (
              <Form.Group controlId='subcategory' className='my-3'>
                <Form.Label>Podkategorie</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    variant='success'
                    id='dropdown-basic'
                    className='category-dropdown rounded'
                  >
                    Podkategorie
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      key='Studium života'
                      value='Studium života'
                      onClick={() => setSubcategory('Studium života')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Studium života
                      </h5>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  type='text'
                  placeholder='Podkategorie'
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              // <Form.Group controlId='subcategory' className='my-3'>
              //   <Form.Label>Podkategorie</Form.Label>

              //   <Form.Control
              //     className='rounded-5'
              //     type='text'
              //     placeholder='Podkategorie'
              //     value={subcategory}
              //     onChange={(e) => setSubcategory(e.target.value)}
              //   ></Form.Control>
              // </Form.Group>
            )}

            <Button
              className='my-5 btn-blue rounded'
              type='submit'
              variant='primary'
            >
              Uložit
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default AudioEditScreen
