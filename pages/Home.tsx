import React from 'react';
import { Language } from '../types';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Gallery } from '../components/Gallery';
import { Contact } from '../components/Contact';

interface HomeProps {
  lang: Language;
}

export const Home: React.FC<HomeProps> = ({ lang }) => {
  return (
    <>
      <Hero lang={lang} />
      <Services lang={lang} />
      <Gallery lang={lang} />
      <Contact lang={lang} />
    </>
  );
};