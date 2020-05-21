import React from 'react';

import GenreSelect from './GenreSelect';
import styles from './GenresBar.module.css';

function GenresBar(props) {
  return (
    <div className={styles.bar}>
      <GenreSelect/>
      <GenreSelect/>
      <GenreSelect/>
    </div>
  );
}

export default GenresBar;