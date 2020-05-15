import React from 'react';
import Album from './Album';

function AlbumList(props) {

    let albums = [];

    for (let i = 0; i < 10; i++) {
        albums.push(<li key={i}><Album/></li>);
    }

    return (
        <div>
            <ul>
                {albums}
            </ul>
        </div>
    );
}

export default AlbumList;