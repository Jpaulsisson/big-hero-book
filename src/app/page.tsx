'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import styles from './page.module.css'
import { ChangeEvent } from 'react';

export default function Home() {

  const router = useRouter();

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    router.push(`?hero=${e.target.value}`)
  }

  return (
    <main>
      <h1 className={styles.title}>Super Hero Big Book</h1>
      <form className={styles.form}>
        <input type='text' name='search' id='search' className={styles.search} onChange={handleSearchChange} placeholder='Search by name' />
        <button className={styles.searchButton}>Search Supes</button>
      </form>
      <div className={styles.book}>
        <div className={styles.cover}>The Cover!!!</div>
        <div className={styles.page}></div>
        <div className={styles.page}></div>
        <div className={styles.page}></div>
        <div className={styles.page}></div>
        <div className={styles.page}></div>
        <div className={styles.heroPage}></div>
        <div className={styles.backCover}>Back Cover!!!</div>
      </div>
    </main>
  )
}
