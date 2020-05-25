import React, { useState, useEffect } from 'react';

import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';

import { fetchAlbums } from '../actions/albumsFetchActions';
import { fetchGenres } from '../actions/genresFetchActions';

import Album from './Album';
import GenresBar from './GenresBar';

function AlbumList(props) {

  const [fetchedGenres, setFetchedGenres] = useState([]);
  const [fetchedAlbums, setFetchedAlbums] = useState([]);
  const [values, setValues] = useState({
    genre1: null,
    genre2: null,
    genre3: null
  });

  const genreState = useSelector(state => state.genre);
  const albumState = useSelector(state => state.album);
  const { genresFetchPending, genresFetchSuccess, genresFetchError } = genreState;
  const { albumsFetchPending, albumsFetchSuccess, albumsFetchError } = albumState;

  const { fetchGenres, fetchAlbums } = props;

  const onGenreChange = function(event) {
    event.persist();
    const value = event.target.value !== 'Select genre...' ? event.target.value : null;
    setValues(oldValues => ({
      ...oldValues,
      [event.target.id]: value,
    }));
  }

  const onSearchAlbums = function(event) {
    const valuesArray = Object.values(values).filter( value => value !== null);
    fetchAlbums(undefined, undefined, valuesArray);
  }

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  // Genres Pending
  useEffect(() => {
    if (genresFetchPending) {
      console.log("Pending genres");
    } else {
      console.log("Not pending genres");
    }
  }, [genresFetchPending]);

  // Genres Success
  useEffect(() => {
    setFetchedGenres(genresFetchSuccess);
    if (genresFetchSuccess.length > 0) {
      fetchAlbums(0, 10, undefined);
    }
  }, [genresFetchSuccess, fetchAlbums]);

  // Genres Error
  useEffect(() => {
    if (genresFetchError) {
      console.error(genresFetchError);
    }
  }, [genresFetchError]);

  // Albums Pending
  useEffect(() => {
    if (albumsFetchPending) {
      console.log("Pending albums");
    } else {
      console.log("Not pending albums");
    }
  }, [albumsFetchPending]);

  // Albums Success
  useEffect(() => {
    setFetchedAlbums(albumsFetchSuccess);
  }, [albumsFetchSuccess]);

  // Albums Error
  useEffect(() => {
    if (albumsFetchError) {
      console.error(albumsFetchError);
    }
  }, [albumsFetchError]);


  let selectValues = [];

  if (fetchedGenres.length > 0) {
    selectValues.push('Select genre...');
    for (let i = 0; i < fetchedGenres.length; i++) {
      selectValues.push(fetchedGenres[i].name);
    }
  }

  let albums = [];

  if (fetchedAlbums.length > 0) {
    for (let i = 0; i < fetchedAlbums.length; i++) {
      albums.push(<li key={i}><Album album={fetchedAlbums[i]}/></li>);
    }
  }

  if (genresFetchPending || albumsFetchPending) {
    return (
      <div>
        {genresFetchPending ? 
        <h4>Loading available genres...</h4> : 
        <GenresBar onSelectChange={onGenreChange} selectValues={selectValues}/>}
        {albumsFetchPending ? 
        <h3>Loading albums...</h3> : 
        <ul>
          {fetchedAlbums.map((album, index) => 
          <li key={index}><Album album={album}/></li>)}
        </ul>}
      </div>
    );
  }

  if (albumsFetchError !== null || genresFetchError !== null) {
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
        <GenresBar onSelectChange={onGenreChange} selectValues={selectValues} onSearch={onSearchAlbums}/>
        <ul>
          {fetchedAlbums.map((album, index) => <li key={index}><Album album={album}/></li>)}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <GenresBar onSelectChange={onGenreChange} selectValues={selectValues} onSearch={onSearchAlbums}/>
        <h3>No albums available</h3>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAlbums: fetchAlbums,
    fetchGenres: fetchGenres
}, dispatch);
  
export default connect(undefined, mapDispatchToProps)(AlbumList);