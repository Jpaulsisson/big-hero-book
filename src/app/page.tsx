'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import { ChangeEvent, useState } from 'react';
import { Bangers } from 'next/font/google';
import { characters } from './characterIDs.js';

const HeroFont = Bangers({
  weight: '400',
  subsets: ['latin'],
});

const characterNames: string[] = [];
const getNames = characters.map((character) => {
  characterNames.push(character.name);
});


export default function Home() {
  const router = useRouter();



  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    router.push(`?hero=${e.target.value}`);
  }

  return (
    <main>
      <h1 className={[styles.title, HeroFont.className].join(' ')}>
        Super Hero Big Book
      </h1>
      <form className={styles.form}>
        <input
          type="text"
          name="hero"
          id="hero"
          className={styles.search}
          onChange={handleSearchChange}
          placeholder="Search by name"
        />
        <button className={styles.searchButton}>Search Supes</button>
      </form>
      <div className={styles.book}>
        <div className={styles.cover}>The Cover!!!</div>
        <div className={styles.page}></div>
        <div className={styles.page}></div>
        <div className={styles.page}></div>
        <div className={styles.page}></div>
        <div className={styles.page}>
          <span className={styles.square}></span>
        </div>
        <div className={styles.heroPage}>
          <Image
            src="https://source.unsplash.com/random"
            alt="super hero"
            width={100}
            height={100}
            className={styles.heroImage}
          />
          <h2>Spider-man</h2>

          {/* stats */}
          <div className={styles.statsContainer}>
            {/* Intelligence */}
            <label className={styles.statLabel}>
              Int
              <div
                className={styles.stat}
                style={{
                  background: `radial-gradient(circle at center, beige 0 40%, transparent 40% 100%),conic-gradient(#11378b 0deg calc(3.6 * ${75}deg), beige calc(3.6 * ${75}deg) 360deg)`,
                }}
              ></div>
            </label>

            {/* Strength */}
            <label className={styles.statLabel}>
              Str
              <div
                className={styles.stat}
                style={{
                  background: `radial-gradient(circle at center, beige 0 40%, transparent 40% 100%),conic-gradient(#741b1b 0deg calc(3.6 * ${55}deg), beige calc(3.6 * ${55}deg) 360deg)`,
                }}
              ></div>
            </label>

            {/* Speed */}
            <label className={styles.statLabel}>
              Spd
              <div
                className={styles.stat}
                style={{
                  background: `radial-gradient(circle at center, beige 0 40%, transparent 40% 100%),conic-gradient(#d5bb29 0deg calc(3.6 * ${63}deg), beige calc(3.6 * ${63}deg) 360deg)`,
                }}
              ></div>
            </label>

            {/* Durability */}
            <label className={styles.statLabel}>
              Dur
              <div
                className={styles.stat}
                style={{
                  background: `radial-gradient(circle at center, beige 0 40%, transparent 40% 100%),conic-gradient(#46525b 0deg calc(3.6 * ${70}deg), beige calc(3.6 * ${70}deg) 360deg)`,
                }}
              ></div>
            </label>

            {/* Power */}
            <label className={styles.statLabel}>
              Pwr
              <div
                className={styles.stat}
                style={{
                  background: `radial-gradient(circle at center, beige 0 40%, transparent 40% 100%),conic-gradient(#1a4222 0deg calc(3.6 * ${66}deg), beige calc(3.6 * ${66}deg) 360deg)`,
                }}
              >
                66
              </div>
            </label>

            {/* Combat */}
            <label className={styles.statLabel}>
              Com
              <div
                className={styles.stat}
                style={{
                  background: `radial-gradient(circle at center, beige 0 40%, transparent 42% 100%),conic-gradient(#421a42 0deg calc(3.6 * ${70}deg), beige calc(3.6 * ${70}deg) 360deg)`,
                }}
              ></div>
            </label>
          </div>
          {/* Bio */}
          <p>Name</p>
          <p>Hometown</p>
          <p>First Appearance</p>
          <p>Publisher</p>
          <p>Good guy / bad guy</p>
        </div>
        <div className={styles.backCover}>Back Cover!!!</div>
      </div>
    </main>
  );
}
