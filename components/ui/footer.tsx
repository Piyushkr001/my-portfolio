import React from 'react'


const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className='p-5 h-10 bg-gradient-to-br from-black via-neutral-600 to-stone-900 text-white'>Made with Axe {year}</footer>
  )
}
