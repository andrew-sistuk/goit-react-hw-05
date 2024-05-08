import { PacmanLoader } from 'react-spinners';
import { forwardRef } from 'react';

import css from './Loader.module.css';

const Loader = forwardRef(function Loader(props, ref) {
  return (
    <div className={css.loader} ref={ref}>
      <PacmanLoader loading={props.loading}size="30px" color="#c0c0c0" />
    </div>
  );
});

export default Loader;