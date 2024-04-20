import React, { useLayoutEffect } from 'react'

const TradeRules = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 200)
  })

  return (
    <div className='margined'>
      <div className='my-3 info'>
        <h1>Obchodní podmínky</h1>
      </div>
    </div>
  )
}

export default TradeRules
