import React from 'react';

function Album(props) {

    const album = {
        artist: 'Muse',
        album: 'Black Holes & Revelations',
        release: '2006-07-11',
        url: 'https://www.metacritic.com/music/black-holes-revelations/muse',
        genres: ['Rock', ' Alternative']
    }

    return (
        <div>
            <div>Artist: {album.artist}</div>
            <div>Album: {album.album}</div>
            <div>Release: {album.release}</div>
            <div>Genres: {album.genres.map( (genre, index) => {
                if (index !== (album.genres.length - 1)) {
                    return `${genre},`
                } else {
                    return `${genre}`
                }
            })}</div>
        </div>
    );
}

export default Album;