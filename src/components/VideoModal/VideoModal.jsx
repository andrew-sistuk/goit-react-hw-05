import ReactModal from 'react-modal';
import { MdOutlineClose } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { callTrailer } from '../../helpers/tmdbApi';

import css from './VideoModal.module.css';

const VideoModal = ({ isOpen, handleClose }) => {
  const [urlVideo, setUrlVideo] = useState('');
  const { movieId } = useParams();
  useEffect(() => {
    async function initPage() {
      try {
        const trailer = await callTrailer(movieId);
        setUrlVideo(trailer.results[0].key);
        console.log(trailer);
      } catch (error) {
        console.log(error);
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
      <iframe
        className={css.video}
        src={`https://www.youtube.com/embed/${urlVideo}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <MdOutlineClose className={css.close} onClick={handleClose} />
    </ReactModal>
  );
};

export default VideoModal;
