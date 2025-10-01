import { useParams } from 'wouter';
import useShareState from '../store/shareState';
import { useEffect } from 'react';

const Share = () => {
  const { track } = useParams();
  const { setTrack } = useShareState();

  useEffect(() => {
    setTrack(track || '');
  }, [track, setTrack]);

  return (
    <>
      <meta name="robots" content="noindex" />
    </>
  );
};

export default Share;
