import React from 'react'
import nav from '../Navbar/Navbar.module.scss'
import { useRouter } from 'next/router'
import { NavLink } from '@/components/NavLink/NavLink'
import Image from 'next/image'

export const Navbar = ({ href, children }) => {
  const router = useRouter()

  const isActive = router.pathname === href

  return (
    <nav className=''>

      <div className={nav.header}>
        <div className={nav.logo}>
          <Image
            src='/img/logo.png'
            className={nav.logo1}
            alt='Picture of the author '
            width={500}
            height={500}
          />

        </div>
        <div className={nav.menu}>
        <ul className={nav.list}>
          <NavLink href='/' name='Materia' />

          {/* Menú desplegable de Nosotros */}
          <li className={nav.dropdown}>
            <a href='/about'>Cargas</a>
            <div className={nav.dropdownContent}>
              <NavLink href='/campus' name='Cargas de Planteles' />
              <NavLink href='/careers' name='Cargas de carreras' />
              <NavLink href='/subjects' name='Cargas de materias' />
            </div>
          </li>

          {/* Menú desplegable de Beneficios */}
          <li className={nav.dropdown}>
            <a href='/otros'>otros</a>
            <div className={nav.dropdownContent}>
              <NavLink href='/benefit1' name='Beneficio 1' />
              <NavLink href='/benefit2' name='Beneficio 2' />
              <NavLink href='/benefit3' name='Beneficio 3' />
            </div>
          </li>
        </ul>
        </div>
        <div className={nav.button}>
          {/* <button className={nav.button1} > <NavLink className={nav.button_link}  href="/register" name='Prueba gratis'></NavLink> </button> */}
          <button className={nav.logout_button}>
      <span>Cerrar sesión</span>
    </button>
        </div>
      </div>

    </nav>
  )
}
