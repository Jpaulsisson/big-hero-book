'use client';

import Image, { StaticImageData } from 'next/image';
import styles from './page.module.css';
import React, { ChangeEvent, useState } from 'react';
import { Bangers, Cinzel, Comic_Neue } from 'next/font/google';
import { characters } from './characterIDs.js';
import FallbackImage from '/public/fallback.png'
import Int from '/public/brain.svg';
import Str from '/public/strength.svg';
import Spd from '/public/lightning.svg';
import Dur from '/public/shield.svg';
import Pwr from '/public/power.svg';
import Cmbt from '/public/combat.svg';


const HeroFont = Bangers({
  weight: '400',
  subsets: ['latin'],
});

const WritingFont = Comic_Neue({
  weight: '300',
  subsets: ['latin'],
  style: ['italic', 'normal'],
});

const BookTitleFont = Cinzel({
  weight: '400',
  subsets: ['latin']
})

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
      "response": "",
      "id": 0,
      "name": "",
      "powerstats": {
          "intelligence": 0,
          "strength": 0,
          "speed": 0,
          "durability": 0,
          "power": 0,
          "combat": 0,
      },
      "biography": {
          "full-name": "",
          "alter-egos": ".",
          "aliases": [
              "",
              ""
          ],
          "place-of-birth": "",
          "first-appearance": "",
          "publisher": "",
          "alignment": ""
      },
      "appearance": {
          "gender": "",
          "race": "",
          "height": [
              "",
              ""
          ],
          "weight": [
              "",
              ""
          ],
          "eye-color": "",
          "hair-color": ""
      },
      "work": {
          "occupation": "",
          "base": ""
      },
      "connections": {
          "group-affiliation": "",
          "relatives": ""
      },
      "image": {
          "url": FallbackImage
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
      <div className={closed ? styles.bookContainerClosed : styles.bookContainerOpen}>
        
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
        <div className={closed ? [styles.coverClosed, BookTitleFont.className].join(' ') : [styles.coverOpen, BookTitleFont.className].join(' ')}>
          <h2>The Big Book of Super Heroes and Villains</h2>
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

        <div className={closed ? [styles.heroPageLeftClosed, WritingFont.className].join(' ') : [styles.heroPageLeftOpen, WritingFont.className].join(' ')}>
            {!imageError &&
                <Image
                  priority={true}
                  src={characterData.image.url}
                  alt={characterData.name}
                  className={styles.characterImage}
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
          <h2 className={styles.characterInfo}><span className={styles.characterInfoLabel}>Supe name:</span> {characterData.name}</h2>
          <h2 className={styles.characterInfo}><span className={styles.characterInfoLabel}>Birth name:</span> {characterData.biography['full-name']}</h2>

          <h2 className={styles.characterInfo}><span className={styles.characterInfoLabel}>Birth place:</span> {characterData.biography['place-of-birth'] === '-' ? 'unknown' : `${characterData.biography['place-of-birth']}`}</h2>
          <h2 className={styles.characterInfo}><span className={styles.characterInfoLabel}>Publisher:</span> {characterData.biography.publisher}</h2>
          {characterData.biography.alignment === 'good' ?
          <h2  style={{ color: 'green'}} className={styles.characterInfo}><span style={{ color: 'black'}} className={styles.characterInfoLabel}>Good/Bad:</span> {characterData.biography.alignment.toUpperCase()}</h2>
          :
          <h2 style={{ color: 'crimson'}} className={styles.characterInfo}><span style={{ color: 'black'}} className={styles.characterInfoLabel}>Good/Bad:</span> {characterData.biography.alignment.toUpperCase()}</h2>}
          
        </div>




        <div className={styles.heroPageRight}>
          <h2 className={[HeroFont.className, styles.statsHeader].join(' ')}>STATS</h2>
          <div className={styles.statsContainer}>
            <p className={styles.stat} style={{ 
              background: `radial-gradient(circle at center, antiquewhite 0% 60%, transparent 60% 100%), conic-gradient(navy 0 calc(${characterData.powerstats.intelligence} * 3.6deg), antiquewhite calc(${characterData.powerstats.intelligence} * 3.6deg) 360deg) `}}>
              <Image src={Int} alt='intelligence' width={45} height={45}  className={styles.statIcon}/>
            </p>
            <p className={styles.stat} style={{ 
              background: `radial-gradient(circle at center, antiquewhite 0% 60%, transparent 60% 100%), conic-gradient(crimson 0 calc(${characterData.powerstats.strength} * 3.6deg), antiquewhite calc(${characterData.powerstats.strength} * 3.6deg) 360deg) `}}>
              <Image src={Str} alt='strength' width={45} height={45}  className={styles.statIcon}/>
            </p>
            <p className={styles.stat} style={{ 
              background: `radial-gradient(circle at center, antiquewhite 0% 60%, transparent 60% 100%), conic-gradient(goldenrod 0 calc(${characterData.powerstats.speed} * 3.6deg), antiquewhite calc(${characterData.powerstats.speed} * 3.6deg) 360deg) `}}>
              <Image src={Spd} alt='speed' width={45} height={45}  className={styles.statIcon}/>
            </p>
            <p className={styles.stat} style={{ 
              background: `radial-gradient(circle at center, antiquewhite 0% 60%, transparent 60% 100%), conic-gradient(darkgreen 0 calc(${characterData.powerstats.durability} * 3.6deg), antiquewhite calc(${characterData.powerstats.durability} * 3.6deg) 360deg) `}}>
              <Image src={Dur} alt='durability' width={45} height={45}  className={styles.statIcon}/>
            </p>
            <p className={styles.stat} style={{ 
              background: `radial-gradient(circle at center, antiquewhite 0% 60%, transparent 60% 100%), conic-gradient( #810134 0 calc(${characterData.powerstats.power} * 3.6deg), antiquewhite calc(${characterData.powerstats.power} * 3.6deg) 360deg) `}}>
              <Image src={Pwr} alt='power' width={45} height={45}  className={styles.statIcon}/>
            </p>
            <p className={styles.stat} style={{ 
              background: `radial-gradient(circle at center, antiquewhite 0% 60%, transparent 60% 100%), conic-gradient(orangered 0 calc(${characterData.powerstats.combat} * 3.6deg), antiquewhite calc(${characterData.powerstats.combat} * 3.6deg) 360deg) `}}>
              <Image src={Cmbt} alt='combat' width={45} height={45}  className={styles.statIcon}/>
            </p>
          </div>
            <button onClick={() => setClosed(true)} className={[styles.closeButton, WritingFont.className].join(' ')}>Close</button>

        </div>
        <div className={styles.backCover}>Back Cover!!!</div>
      </div>
    </main>
  );
}
