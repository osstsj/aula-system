import Head from 'next/head';
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header, { Navbar } from '@/Components/Navbar/Navbar'
import { Footer } from '@/Components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Navbar></Navbar>
    <main className={styles.main}>
        <p>Contenido de la página</p>
      </main>
    <Footer></Footer>
    </>
  )
}
