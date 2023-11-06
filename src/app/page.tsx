'use client';

import Image, { StaticImageData } from 'next/image';
import styles from './page.module.css';
import React, { ChangeEvent, useState } from 'react';
import { Bangers, Comic_Neue } from 'next/font/google';
import { characters } from './characterIDs.js';
import FallbackImage from '/public/fallback.png'


const HeroFont = Bangers({
  weight: '400',
  subsets: ['latin'],
});

const WritingFont = Comic_Neue({
  weight: '300',
  subsets: ['latin'],
  style: ['italic', 'normal'],
});

type TCurrentCharacter = {
  "response": string,
  "id": number,
  "name": string,
  "powerstats": {
      "intelligence": number,
      "strength": number,
      "speed": number,
      "durability": number,
      "power": number,
      "combat": number
  },
  "biography": {
      "full-name": string,
      "alter-egos": string,
      "aliases": string[],
      "place-of-birth": string,
      "first-appearance": string,
      "publisher": string,
      "alignment": string,
  },
  "appearance": {
      "gender": string,
      "race": string,
      "height": string[],
      "weight": string[],
      "eye-color": string,
      "hair-color": string,
  },
  "work": {
      "occupation": string,
      "base": string,
  },
  "connections": {
      "group-affiliation": string,
      "relatives": string,
  },
  "image": {
      "url": string | StaticImageData
  }
};

export default function Home() {

  const [closed, setClosed] = useState(true);
  const [currentSearch, setCurrentSearch] = useState('');
  const [imageError, setImageError] = useState(false);
  const [characterData, setCharacterData] = useState<TCurrentCharacter>(
    {
      "response": "success",
      "id": 233,
      "name": "Dr Manhattan",
      "powerstats": {
          "intelligence": 88,
          "strength": 100,
          "speed": 42,
          "durability": 100,
          "power": 100,
          "combat": 42
      },
      "biography": {
          "full-name": "Jonathan Osterman",
          "alter-egos": "No alter egos found.",
          "aliases": [
              "Jon Osterman",
              "Doctor Manhattan"
          ],
          "place-of-birth": "-",
          "first-appearance": "Watchmen #1 (September, 1986)",
          "publisher": "DC Comics",
          "alignment": "good"
      },
      "appearance": {
          "gender": "Male",
          "race": "Human / Cosmic",
          "height": [
              "-",
              "0 cm"
          ],
          "weight": [
              "- lb",
              "0 kg"
          ],
          "eye-color": "White",
          "hair-color": "No Hair"
      },
      "work": {
          "occupation": "Scientist",
          "base": "New York City; formerly Mars"
      },
      "connections": {
          "group-affiliation": "Watchmen, Crimebusters",
          "relatives": "-"
      },
      "image": {
          "url": "https://www.superherodb.com/pictures2/portraits/10/100/884.jpg"
      }
  });

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(currentSearch?.toLowerCase())
  );

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    if (!closed) setClosed(true);
    if (imageError){
        setImageError(false)};
        setCharacterData((prev) => ({
            ...prev,
            "image": {
              "url": FallbackImage
          }
        }))
    setCurrentSearch(e.target.value);
  }

  async function handleClick(id: string) {
    const response = await fetch(`/api/hero?id=${id}`)
    const data = await response.json();

    setCharacterData({
      ...data
    });
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

        <div className={closed ? styles.heroPageLeftClosed : styles.heroPageLeftOpen}>
            {!imageError &&
              <Image
                priority={true}
                src={characterData.image.url} 
                alt={characterData.name} 
                width={100} 
                height={100}
                onError={() => setImageError(true)}
              />
              }
              {imageError &&
                <div className={styles.noImage}>
                  <div className={styles.fallbackImageContainer}>
                    <Image src={FallbackImage} alt='failed image load fallback' width={100} height={100}/>
                    No image available 
                  </div>
                </div>
              }
          
          <h2>{characterData.name}</h2>
        </div>
        <div className={styles.heroPageRight}></div>
        <div className={styles.backCover}>Back Cover!!!</div>
      </div>
    </main>
  );
}
