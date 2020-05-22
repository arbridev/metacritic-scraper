import React from 'react';

import Form from 'react-bootstrap/Form';

import styles from './GenreSelect.module.css';

function GenreSelect(props) {

  const { onChange, values, id } = props;

  return (
    <Form.Control className={styles.select} as='select' onChange={(event) => onChange(event)} id={id}>
      {values.map((v, index) => <option key={index}>{v}</option>)}
    </Form.Control>
  );
}

export default GenreSelect;