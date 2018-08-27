import React from 'react'

import guitar from './images/guitar.png'
import harmonica from './images/harmonica.png'
import keyboard from './images/keyboard.png'
import sax from './images/sax.png'

const images = [guitar, harmonica, keyboard, sax]

export default ({url}) => {
  const randomImage = () => images[parseInt(Math.random * images.length, 10)]
  return (
    <img src={randomImage()} />
  )
}
