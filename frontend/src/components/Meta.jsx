import { Helmet } from 'react-helmet'
import React from 'react'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Proud života',
  description: 'Přinášet bohatství Božího slova všemu Božímu lidu',
  keywords:
    'křesťanské knihy, křesťanská literatura, duchovní knihy, duchovní literatúra, Bůh, trojjediný Bůh, Kristus, Ježíš Kristus, Duch, Duch Svatý, Život, Studium života, Bible, svatá Bible, studium Biblie, Písmo, Svaté Písmo, křesťanství, křesťané, církev, Církev, místní církev, místní cirkve',
}

export default Meta
