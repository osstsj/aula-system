import React from 'react'
import food from '../Footer/Footer.module.scss'
import { useRouter } from 'next/router'
import { NavLink } from '@/components/NavLink/NavLink'
import Image from 'next/image'

export const Footer = () => {

  return (
    <footer className={food.footer}>
    <div className={food.image_container}>
      <img src="/img/logo.png" alt="Imagen 1" className={food.footer_image} />
      <img src="/img/logo.png" alt="Imagen 2" className={food.footer_image} />
    </div>
  </footer>
  )
}
