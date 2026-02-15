import type { TimelineItemType } from '../components/Timeline/Timeline';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

import iMomClimax from '../assets/video/iMomClimax-web.mp4';
import iMomCooking from '../assets/video/iMomCooking-web.mp4';

import dieoramaCreativeProcess from '../assets/video/DieoramaCreativeProcess-web.mp4';
import dieoramaPublicPlacements from '../assets/video/Dieoramatown-web.mp4';

import migratory_birds from '../assets/images/photos/migratory-birds.webp';

export const work: TimelineItemType[] = [
  {
    title: 'iMom',
    dates: 'Independent Rescoring',
    body: (
      <>
        <h2>iMom</h2>
        <small>Original Film by Ariel Martin</small>
        <p>
          A satirical sci-fi horror that explores the chilling consequences of a
          world where humanoid technology has replaced traditional parenting.
        </p>
        <hr />
        <h3>Scene: The Climax</h3>
        <p>
          <strong>Goal:</strong> To build an escalating sense of doom that
          mirrors the characters&apos; ambiguous nature.
        </p>
        <p>
          {' '}
          I blended metallic vibraphone textures and modulated violins to create
          a sense of tonal instability.
        </p>
        <p>
          Tactile found-object sounds - including gas stove clicks and flame
          ignitions - were integrated into a percussive rhythm to foreshadow the
          reveal with an industrial edge and visceral dark synths.
        </p>
        <VideoPlayer
          src={iMomClimax}
          posterTime={10}
          style={{
            width: '80%',
            maxWidth: '700px',
          }}
        />
        <br />

        <h3>Scene: Cooking</h3>
        <p>
          <strong>Goal:</strong> To underscore the iMom&apos;s emerging
          malfunction during a mundane domestic task.
        </p>
        <p>
          I contrasted organic and synthetic textures by blending and layering
          East Asian percussion and found-sounds into a lopsided rhythm to
          create a sense of mechanical instability that reflects the unsettling,
          odd nature of the character.
        </p>
        <VideoPlayer
          src={iMomCooking}
          posterTime={4}
          style={{
            width: '80%',
            maxWidth: '700px',
          }}
        />
      </>
    ),
  },

  {
    title: 'Dieorama',
    dates: 'Independent Rescoring',
    body: (
      <>
        <h2>Dieorama</h2>
        <small>Original Documentary by Kevin Staake</small>
        <p>
          A portrait of Abigail Goldman, a Criminal Defense Investigator who
          spends her nights creating intricate, gruesome miniatures of murder
          scenes.
        </p>
        <hr />
        <h3>Scene: Creative Process</h3>
        <p>
          <strong>Goal:</strong> To capture a sense of creative awe that creates
          a jarring contrast with the grizzly subject matter of the miniatures.
        </p>
        <p>
          I utilized mallet percussion to evoke a sense of childlike wonder,
          paired with a theremin to create an off-kilter, curious atmosphere
          that mirrors the artist&apos;s unusual craft.
        </p>
        <VideoPlayer
          src={dieoramaCreativeProcess}
          posterTime={26}
          style={{
            width: '80%',
            maxWidth: '700px',
          }}
        />
        <br />

        <h3>Scene: Public Placements</h3>
        <p>
          <strong>Goal:</strong> To reflect the surreal, mysterious nature of
          discovering violent dioramas hidden in everyday public spaces.
        </p>
        <p>
          <strong>Solution:</strong> I blended ethereal synth textures with
          tactile, manipulated sounds—including paper tearing and scissor
          snips—to build a quirky sonic palette that highlights the mystery of
          her public art.
        </p>
        <VideoPlayer
          src={dieoramaPublicPlacements}
          posterTime={32}
          style={{
            width: '80%',
            maxWidth: '700px',
          }}
        />
      </>
    ),
  },

  {
    title: 'Migratory Birds',
    dates: 'Upcoming',
    body: (
      <>
        <h2>Migratory Birds (Original Score)</h2>
        <small>Film by Sanskriti Shrivastava</small>
        <p>
          A story of displacement and resilience following Laura, a South
          African stand-up comedian who relocates to the Netherlands.
        </p>
        <p>
          The film explores how love and memory migrate across borders through
          the central metaphor of a saree. I am currently in the process of
          developing various sonic palettes for this project.
        </p>
        <hr />
        <figure
          className="image-border overlay"
          style={{
            width: '80%',
          }}
        >
          <figcaption>Migratory Birds</figcaption>
          <img src={migratory_birds} alt="Migratory Birds" loading="lazy" />
        </figure>
        <p>
          The film&apos;s narrative is driven by a continuous, intimate
          voiceover, which requires a highly nuanced textural underscore. My
          approach is focused on creating a sonic bed that mirrors the
          character&apos;s journey and exploring a range of aesthetics from
          folky, neoclassical acoustic elements to experimental synths and
          brass.
        </p>
        <p>
          The goal is to build an atmosphere that supports and interacts with
          the character&apos;s spoken word without intruding, capturing her
          sentiment as she moves through different memories and surroundings.
        </p>
        <br />
      </>
    ),
  },
];
