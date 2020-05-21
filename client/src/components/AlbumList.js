import React, { useState, useEffect } from 'react';

import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';

import { fetchAlbums } from '../actions/albumsFetchActions';

import Album from './Album';

function AlbumList(props) {

    const [fetchedAlbums, setFetchedAlbums] = useState([]);

    const albumState = useSelector(state => state.album);
    const { albumsFetchPending, albumsFetchSuccess, albumsFetchError } = albumState;

    const { fetchAlbums } = props;

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
                <h3>{albumsFetchError.error}</h3>
            </div>
        );
    }

    if (fetchedAlbums.length > 0) {
        return (
            <div>
                <ul>
                    {fetchedAlbums.map((album, index) => <li key={index}><Album album={album}/></li>)}
                </ul>
            </div>
        );
    } else {
        return (
            <div>
                <h3>No albums available</h3>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAlbums: fetchAlbums
}, dispatch);
  
export default connect(undefined, mapDispatchToProps)(AlbumList);