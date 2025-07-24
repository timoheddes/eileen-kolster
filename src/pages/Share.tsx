import { Helmet } from 'react-helmet';
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
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
    </>
  );
};

export default Share;
