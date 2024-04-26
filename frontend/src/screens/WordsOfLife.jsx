import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { wordsOflife } from '../functions'

const WordsOfLife = () => {
  const [subcategory, setSubcategory] = useState('Boží evangelium')
  const myRef = useRef(null)
  const subHandler = (sub) => {
    myRef.current.scrollIntoView({ behavior: 'smooth' })
    setSubcategory(sub)
  }

  const category = 'SLOVA ŽIVOTA A PRAVDY'

  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Zpět
      </Link>

      <div className='podcast'>
        <h1 className='my-3'>Posluchárna</h1>
        <h3 className='my-3'>SLOVA ŽIVOTA A PRAVDY</h3>
        <p>
          Pořad Slova života a pravdy, který odvysílalo Rádio 7, je založen na
          krátkých úryvcích z knih Watchmana Neeho a Witnesse Leeho. Jednotlivé,
          zhruba patnáctiminutové nahrávky přinášejí svěží pohled na pravdu
          zjevenou v Písmu z perspektivy božského života, z něhož se těší
          všichni věřící v Krista.{' '}
        </p>
      </div>
      <div className='subcategories'>
        <div className='subcategories-frame no-mobile'>Předmět</div>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Bůh v listu Římanům')}
        >
          Bůh v listu Římanům
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Boží evangelium')}
        >
          Boží evangelium
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Charakter Pánova pracovníka')}
        >
          Charakter Pánova pracovníka
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Člověk a dva stromy')}
        >
          Člověk a dva stromy
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Evangelium království')}
        >
          Evangelium království
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Fakt, víra a prožitek')}
        >
          Fakt, víra a prožitek
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Hlavní Kristovy kroky')}
        >
          Hlavní Kristovy kroky
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Kristovo vzkříšení')}
        >
          Kristovo vzkříšení
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Kristus jako slitovnice')}
        >
          Kristus jako slitovnice
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Křesťanský život')}
        >
          Křesťanský život
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Milostivé léto')}
        >
          Milostivé léto
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Naplnění Starého zákona')}
        >
          Naplnění Starého zákona
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Nevystižitelné Kristovo bohatství')}
        >
          Nevystižitelné Kristovo bohatství
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('O člověku')}
        >
          O člověku
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('O Duchu')}
        >
          O Duchu
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('O Kristovi')}
        >
          O Kristu
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Poselství evangelia')}
        >
          Poselství evangelia
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Prožívání Krista')}
        >
          Prožívání Krista
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Rozdílení života')}
        >
          Rozdílení života
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Řada pro nové věřící')}
        >
          Řada pro nové věřící
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Spasení')}
        >
          Spasení
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Struktura Božího evangelia')}
        >
          Struktura Božího evangelia
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Svědomí')}
        >
          Svědomí
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Trojnásobné semeno')}
        >
          Trojnásobné semeno
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Učení apoštolů')}
        >
          Učení apoštolů
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Věčný Boží plán')}
        >
          Věčný Boží plán
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Vypořádání se s hříchy')}
        >
          Vypořádání se s hříchy
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Vypořádání se se světem')}
        >
          Vypořádání se se světem
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Vzepřít se Satanovi')}
        >
          Vzepřít se Satanovi
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Základní prvky křesťanského života')}
        >
          Základní prvky křesťanského života
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Zjevení života')}
        >
          Zjevení života
        </button>
        <button
          className='btn-subcategory'
          onClick={() =>
            subHandler('Zkušenosti věřících s Kristovým vzkříšením')
          }
        >
          Zkušenosti věřících s Kristovým vzkříšením
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Zkušenost života')}
        >
          Zkušenost života
        </button>{' '}
      </div>

      <div ref={myRef}></div>
      <div className='iframes-grid'>
        {wordsOflife.map(
          (url) =>
            url.subcategory === subcategory && (
              <div key={url._id} className='iframe-w'>
                <div className='mp3-frame-desc'>
                  <p className='sub'>{url.subcategory}</p>
                  <p className='tit'>{url.audioTitle}</p>
                  <p className='download'>Stáhnout</p>
                </div>
                <iframe
                  src={url.mp3file}
                  width='640'
                  height='480'
                  allow='autoplay'
                ></iframe>
              </div>
            )
        )}
      </div>
    </>
  )
}

export default WordsOfLife
