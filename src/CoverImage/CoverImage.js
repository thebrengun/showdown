import React from 'react'
import './CoverImage.css'

// import guitar from './images/guitar.png'
// import harmonica from './images/harmonica.png'
// import keyboard from './images/keyboard.png'
// import sax from './images/sax.png'

const guitar = '/wp-content/themes/showdown2018/static/media/keyboard.81baa7e6.png'
const harmonica = '/wp-content/themes/showdown2018/static/media/harmonica.4eaaae7c.png'
const keyboard = '/wp-content/themes/showdown2018/static/media/guitar.d351fcb4.png'
const sax = '/wp-content/themes/showdown2018/static/media/sax.5d5f335c.png'

export default ({url}) => {
  const images = [guitar, harmonica, keyboard, sax]
  const randomImage = () => images[parseInt(Math.random() * images.length, 10)]
  console.log(randomImage())
  return (
    <div className='monster-container'>
      <img
        className='monster'
        src={randomImage()}
      />
    </div>
  )
}
