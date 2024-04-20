import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { lifeStudy } from '../functions'

const LifeStudy = () => {
  const [subcategory, setSubcategory] = useState('Štúdium života')

  const category = 'ŠTÚDIUM ŽIVOTA'

  return (
    <div className='margined'>
      <Link className='btn btn-back my-3' to='/'>
        Zpět
      </Link>

      <div className='give2-physical'>
        <h1 className='my-3'>Posluchárna</h1>

        <h3 className='my-3'>STUDIUM ŽIVOTA</h3>
        <p>
          Dvacetiminutové relace jsou věnovány rozsáhlému dílu Witnesse Leeho – Studiu života v Bibli. Studium života v Bibli je obsáhlé a klasické knižní dílo, které navazuje na vše, co Pán zjevil své církvi v průběhu minulých staletí až do dnešních dnů. Se svými více než 25 000 stranami komentářů ke všem biblickým knihám se řadí k nejbohatším současným a aktuálním výkladům biblické pravdy.
        </p>
      </div>
      <div className='iframes-grid'>
        {lifeStudy.map((url) => (
          <div key={url._id} className='iframe-w life-study-top'>
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
        ))}
      </div>
    </div>
  )
}

export default LifeStudy
