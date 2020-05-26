import React from 'react';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import GenreSelect from './GenreSelect';

import styles from './GenresBar.module.css';

import searchIcon from '../images/search_btn.png';


function GenresBar(props) {

  const { onSelectChange, selectValues, onSearch } = props;

  return (
    <div className={styles.bar}>
      <GenreSelect onChange={onSelectChange} values={selectValues} id='genre1'/>
      <GenreSelect onChange={onSelectChange} values={selectValues} id='genre2'/>
      <GenreSelect onChange={onSelectChange} values={selectValues} id='genre3'/>
      <Button className={styles.button} variant="outline-secondary" onClick={onSearch}>
        <Image className={styles.icon} src={searchIcon} fluid/>
      </Button>
    </div>
  );
}

export default GenresBar;