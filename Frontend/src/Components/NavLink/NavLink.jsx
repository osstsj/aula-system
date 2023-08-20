import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { use } from 'react'


export const NavLink = ({ href, name, className = '' }) => {
  const router = useRouter()
  const isActive = router.pathname === href


  return (
    <Link
      href={href}
    >
      {name}
    </Link>
  )
}
