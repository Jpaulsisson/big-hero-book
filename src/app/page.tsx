'use client';

import Image from 'next/image';
import styles from './page.module.css';
import React, { ChangeEvent, useState } from 'react';
import { Bangers, Comic_Neue } from 'next/font/google';
import { characters } from './characterIDs.js';

const HeroFont = Bangers({
  weight: '400',
  subsets: ['latin'],
});

const WritingFont = Comic_Neue({
  weight: '300',
  subsets: ['latin'],
  style: ['italic', 'normal'],
});

export default function Home() {

  const [closed, setClosed] = useState(true);
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentCharacter, setCurrentCharacter] = useState({});

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(currentSearch?.toLowerCase())
  );

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    if (closed === false) setClosed(true);
    setCurrentSearch(e.target.value);
  }

  async function handleClick(id: string) {
    const response = await fetch(`/api/hero?id=${id}`)
    const data = await response.json();
    console.log(data);
    setCurrentCharacter(data);
    setClosed(false);
  }

  return (
    <main>
      {/* Title */}
      <h1 className={[styles.title, HeroFont.className].join(' ')}>
        Super Hero Big Book
      </h1>

      {/* Search */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          name="hero"
          id="hero"
          className={styles.search}
          onChange={handleSearchChange}
          placeholder="Search by name"
        />
      </div>

      {/* Book */}
      <div className={styles.bookContainer}>
        <div className={styles.heroList}>
          <h2 className={[styles.listTitle, HeroFont.className].join(' ')}>
            Choose One!!!
          </h2>
          <div className={styles.resultsList}>
            {filteredCharacters.length === 0 ? 
              <div className={[styles.noCharactersAlert, WritingFont.className].join(' ')}>
                <p>No characters by that name in this book. Try your local comic book store, bud. Good luck!</p>
              </div>
              :
              <>
              {filteredCharacters.map((character, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleClick(String(character.id))}
                  className={styles.selectButton}
                >
                  {character.name}
                </button>
              );
            })}
            </>
            }
            
          </div>
        </div>
        <div className={closed ? styles.coverClosed : styles.coverOpen}>
          The Cover!!!
        </div>
        
        <div className={closed ? styles.pageClosed : styles.pageOpen}>
          <div className={styles.fauxPageHeader}>
            <div className={styles.fauxImageOutline}></div>
            <div className={styles.headerFillerLine}></div>
            <div className={styles.headerFillerLine}></div>
          </div>
          <div className={styles.fillerLine}></div>
          <div className={styles.fillerLine}></div>
          <div className={styles.fillerLine}></div>
          <div className={styles.fillerLine}></div>
        </div>
        <div className={closed ? styles.pageClosed : styles.pageOpen}>
          <div className={styles.fauxPageHeader}>
            <div className={styles.fauxImageOutline}></div>
            <div className={styles.headerFillerLine}></div>
            <div className={styles.headerFillerLine}></div>
          </div>
          <div className={styles.fillerLine}></div>
          <div className={styles.fillerLine}></div>
          <div className={styles.fillerLine}></div>
          <div className={styles.fillerLine}></div>
        </div>

        <div className={styles.heroPageLeft}></div>
        <div className={styles.heroPageRight}></div>
        <div className={styles.backCover}>Back Cover!!!</div>
      </div>
    </main>
  );
}
