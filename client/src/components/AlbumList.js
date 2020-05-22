import React, { useState, useEffect } from 'react';

import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';

import { fetchAlbums } from '../actions/albumsFetchActions';

import Album from './Album';
import GenresBar from './GenresBar';

function AlbumList(props) {

  const selectValues = ['Select genre...', 'Rock', 'Alternative', 'Pop', 'Alternative Rock', 'Rap'];

  const [fetchedAlbums, setFetchedAlbums] = useState([]);
  const [values, setValues] = useState({
    genre1: null,
    genre2: null,
    genre3: null
  });

  const albumState = useSelector(state => state.album);
  const { albumsFetchPending, albumsFetchSuccess, albumsFetchError } = albumState;

  const { fetchAlbums } = props;

  const onGenreChange = function(event) {
    event.persist();
    const value = event.target.value !== 'Select genre...' ? event.target.value : null;
    setValues(oldValues => ({
      ...oldValues,
      [event.target.id]: value,
    }));
  }

  console.log('values', values);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  // Pending
  useEffect(() => {
    if (albumsFetchPending) {
        console.log("Pending");
    } else {
        console.log("Not pending");
    }
  }, [albumsFetchPending]);

  // Success
  useEffect(() => {
    setFetchedAlbums(albumsFetchSuccess);
  }, [albumsFetchSuccess]);

  // Error
  useEffect(() => {
    if (albumsFetchError) {
        console.error(albumsFetchError);
    }
  }, [albumsFetchError]);


  let albums = [];

  if (fetchedAlbums.length > 0) {
    for (let i = 0; i < fetchedAlbums.length; i++) {
      albums.push(<li key={i}><Album album={fetchedAlbums[i]}/></li>);
    }
  }

  if (albumsFetchPending) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (albumsFetchError !== null) {
    return (
      <div>
        <GenresBar onSelectChange={onGenreChange} selectValues={selectValues}/>
        <h3>{albumsFetchError.error}</h3>
      </div>
    );
  }

  if (fetchedAlbums.length > 0) {
    return (
      <div>
        <GenresBar onSelectChange={onGenreChange} selectValues={selectValues}/>
        <ul>
          {fetchedAlbums.map((album, index) => <li key={index}><Album album={album}/></li>)}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <GenresBar onSelectChange={onGenreChange} selectValues={selectValues}/>
        <h3>No albums available</h3>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAlbums: fetchAlbums
}, dispatch);
  
export default connect(undefined, mapDispatchToProps)(AlbumList);