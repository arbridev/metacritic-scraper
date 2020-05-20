import React, { useState, useEffect } from 'react';

import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';

import { fetchAlbum } from '../actions/albumFetchActions';

import Album from './Album';

function AlbumList(props) {

    const [modelAlbum, setModelAlbum] = useState({});

    const albumState = useSelector(state => state.album);
    const { albumFetchPending, albumFetchSuccess, albumFetchError } = albumState;

    const { fetchAlbum } = props;

    useEffect(() => {
        fetchAlbum('2');
    }, [fetchAlbum]);

    // Pending
    useEffect(() => {
        if (albumFetchPending) {
            console.log("Pending");
        } else {
            console.log("Not pending");
        }
    }, [albumFetchPending]);

    // Success
    useEffect(() => {
        setModelAlbum(albumFetchSuccess);
    }, [albumFetchSuccess]);

    // Error
    useEffect(() => {
        if (albumFetchError) {
            console.error(albumFetchError);
        }
    }, [albumFetchError]);


    let albums = [];

    if (modelAlbum.title) {
        for (let i = 0; i < 10; i++) {
            albums.push(<li key={i}><Album album={modelAlbum}/></li>);
        }
    }

    if (albumFetchPending) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        );
    }

    if (albums.length > 0) {
        return (
            <div>
                <ul>
                    {albums}
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
    fetchAlbum: fetchAlbum
}, dispatch);
  
export default connect(undefined, mapDispatchToProps)(AlbumList);