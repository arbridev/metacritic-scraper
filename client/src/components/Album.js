import React from 'react';

function Album(props) {

    const { album } = props;

    return (
        <div>
            <div>Artist: {album.artist}</div>
            <div>Album: {album.title}</div>
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