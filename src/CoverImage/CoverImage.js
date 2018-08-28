import React from 'react'
import './CoverImage.css'

import guitar from './images/guitar.png'
import harmonica from './images/harmonica.png'
import keyboard from './images/keyboard.png'
import sax from './images/sax.png'

export default ({url}) => {
  const images = [guitar, harmonica, keyboard, sax]
  const randomImage = () => images[parseInt(Math.random() * images.length, 10)]
  console.log(randomImage())
  return (
    <img
      className='monster'
      src={randomImage()}
    />
  )
}
