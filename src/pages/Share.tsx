import { useParams } from 'wouter';
import useShareState from '../store/shareState';
import { useEffect } from 'react';

const Share = () => {
  const { track } = useParams();
  const { setSharedTrack } = useShareState();

  useEffect(() => {
    setSharedTrack(track || '');
  }, [track, setSharedTrack]);
  return (
    <>
      <meta name="robots" content="noindex" />
    </>
  );
};

export default Share;
