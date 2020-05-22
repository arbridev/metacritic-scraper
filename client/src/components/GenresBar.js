import React from 'react';

import GenreSelect from './GenreSelect';

import styles from './GenresBar.module.css';

function GenresBar(props) {

  const { onSelectChange, selectValues } = props;

  return (
    <div className={styles.bar}>
      <GenreSelect onChange={onSelectChange} values={selectValues} id='genre1'/>
      <GenreSelect onChange={onSelectChange} values={selectValues} id='genre2'/>
      <GenreSelect onChange={onSelectChange} values={selectValues} id='genre3'/>
    </div>
  );
}

export default GenresBar;