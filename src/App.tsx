// import { useState } from 'react'
import './App.css';
import Logo from './components/Logo';
import AudioWave from './components/AudioWave';
import Particles from './components/Particles';

import surface from './assets/music/Beneath the Surface.wav';
import ocean from './assets/music/Call of the Ocean.wav';
import golden from './assets/music/Golden Hour Immersion.wav';
import shared from './assets/music/Shared Shores.wav';
import { FractalSVG } from './FractalSVG';
import { FractalLink } from './components/FractalLink';

function App() {
  return (
    <>
      <FractalSVG />
      <Logo text="Eileen Kolster" />
      <p
        className="text-center"
        style={{
          maxWidth: '800px',
          textAlign: 'center',
          margin: '0 auto',
          marginBottom: '2em',
        }}
      >
        Eileen Kolster is an emerging composer based in{' '}
        <FractalLink effect="line" variant={2}>
          Amsterdam
        </FractalLink>
        . Classically trained in violin and piano, her scores blend
        traditional with modern ambient textures to create versatile
        musical landscapes that enhance storytelling and deliver
        emotional depth.
      </p>
      <AudioWave title="Beneath the surface" file={surface} />
      <AudioWave title="Call of the Ocean" file={ocean} />
      <AudioWave title="Golden Hour Immersion" file={golden} />
      <AudioWave title="Shared Shores" file={shared} />
      <Particles numParticles={300} />
    </>
  );
}

export default App;
