import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import { MdOutlineClose } from 'react-icons/md';

// import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { ErrorMsg } from 'components';

import { callTrailer } from 'helpers';

import css from './VideoModal.module.css';

const VideoModal = ({ isOpen, handleClose }) => {
  const [error, setError] = useState(false);
  const [urlVideo, setUrlVideo] = useState('');
  const { movieId } = useParams();
  useEffect(() => {
    async function initPage() {
      try {
        const trailer = await callTrailer(movieId);
        if (trailer.results.length !== 0) {
          setUrlVideo(trailer.results[0].key);
        }
        console.log(trailer);
      } catch (errorMsg) {
        setError(true);
        console.log(errorMsg);
      }
    }
    initPage();
  }, [movieId]);

  return (
    <ReactModal
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          border: 'transparent',
        },
      }}
      isOpen={isOpen}
      appElement={document.getElementById('root')}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      preventScroll={true}
      onRequestClose={handleClose}
    >
      {error ? (
        <ErrorMsg />
      ) : urlVideo ? (
        <iframe
          className={css.video}
          src={`https://www.youtube.com/embed/${urlVideo}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Trailer is missing</p>
      )}
      <MdOutlineClose className={css.close} onClick={handleClose} />
    </ReactModal>
  );
};

export default VideoModal;