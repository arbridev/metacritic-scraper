import React from 'react';

import styles from './Album.module.css';

function Album(props) {

    const { album } = props;

    return (
        <div className={styles.albumwrapper}>
            <div className={styles.album}>
                <div>
                    <span className={styles.title}>Artist:</span> <span className={styles.content}>{album.artist}</span>
                </div>
                <div>
                    <span className={styles.title}>Album:</span> <span className={styles.content}>{album.title}</span>
                </div>
                <div>
                    <span className={styles.title}>Release:</span> <span className={styles.content}>{album.release}</span>
                </div>
                <div><span className={styles.title}>Genres:</span> <span className={styles.content}>{album.genres.map( (genre, index) => {
                    if (index !== (album.genres.length - 1)) {
                        return `${genre}, `
                    } else {
                        return `${genre}`
                    }
                })}</span></div>
            </div>
        </div>
    );
}

export default Album;