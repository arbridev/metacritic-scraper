import React from 'react';

import Form from 'react-bootstrap/Form';

import styles from './GenreSelect.module.css';

function GenreSelect(props) {

  const handleSelectChange = function(event) {
    event.persist();
    console.log('event', event.target.value);
  }

  return (
    <Form.Control className={styles.select} as='select' onChange={(event) => handleSelectChange(event)}>
        <option>Rock</option>
        <option>Alternative</option>
        <option>Pop</option>
        <option>Alternative Rock</option>
        <option>Rap</option>
      </Form.Control>
  );
}

export default GenreSelect;