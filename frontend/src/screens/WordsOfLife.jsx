import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { wordsOflife } from '../functions'

const WordsOfLife = () => {
  const [subcategory, setSubcategory] = useState('Božie evanjelium')
  const myRef = useRef(null)
  const subHandler = (sub) => {
    myRef.current.scrollIntoView({ behavior: 'smooth' })
    setSubcategory(sub)
  }

  const category = 'SLOVÁ ŽIVOTA A PRAVDY'

  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Zpět
      </Link>

      <div className='podcast'>
        <h1 className='my-3'>Posluchárna</h1>
        <h3 className='my-3'>SLOVA ŽIVOTA A PRAVDY</h3>
        <p>
          Pořad Slova života a pravdy, který odvysílalo Rádio 7, je založen na krátkých úryvcích z knih Watchmana Neeho a Witnesse Leeho. Jednotlivé, zhruba patnáctiminutové nahrávky přinášejí svěží pohled na pravdu zjevenou v Písmu z perspektivy božského života, z něhož se těší všichni věřící v Krista.{' '}
        </p>
      </div>
      <div className='subcategories'>
        <div className='subcategories-frame no-mobile'>Předmět</div>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Boh v liste Rimanom')}
        >
          Bůh v listu Římanům
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Božie evanjelium')}
        >
          Boží evangelium
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Charakter Pánovho pracovníka')}
        >
          Charakter Pánova pracovníka
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Človek a dva stromy')}
        >
          Člověk a dva stromy
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Evanjelium kráľovstva')}
        >
          Evangelium království
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Fakt viera a skúsenosť')}
        >
          Fakt, víra a prožitek
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Hlavné Kristove kroky')}
        >
          Hlavní Kristovy kroky
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Kresťanský život')}
        >
          Křesťanský život
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Kristovo vzkriesenie')}
        >
          Kristovo vzkříšení
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Kristus ako zľutovnica')}
        >
          Kristus jako slitovnice
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Naplnenie starého zákona')}
        >
          Naplnění Starého zákona
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Nevystihnuteľné Kristovo bohatstvo')}
        >
          Nevystižitelné Kristovo bohatství
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('O človeku')}
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
          onClick={() => subHandler('Porátať sa s hriechmi')}
        >
          Vypořádání se s hříchy
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Porátať sa so svetom')}
        >
          Vypořádání se se světem
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Posolstvo evanjelia')}
        >
          Posolství evangelia
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Prežívanie Krista')}
        >
          Prožívání Krista
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Rada pre nových veriacich')}
        >
          Řada pro nové věřící
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Rok milosti')}
        >
          Milostivé léto
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() =>
            subHandler('Skúsenosti veriacich s Kristovým vzkriesením')
          }
        >
          Zkušenosti věřících s Kristovým vzkříšením
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Skúsenosť života')}
        >
          Zkušenost života
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Spasenie')}
        >
          Spasení
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Štruktúra Božieho evanjelia')}
        >
          Struktura Božího evangelia
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Svedomie')}
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
          onClick={() => subHandler('Učenie apoštolov')}
        >
          Učení apoštolů
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Udeľovanie života')}
        >
          Rozdílení života
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Večný Boží plán')}
        >
          Věčný Boží plán
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Vzoprieť sa satanovi')}
        >
          Vzepřít se Satanovi
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Základné prvky kresťanského života')}
        >
          Základní prvky křesťanského života
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Zjavenie života')}
        >
          Zjevení života
        </button>
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
