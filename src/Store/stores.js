import { writable } from 'svelte/store';

export const loading = writable(false);
export const lyrics = writable(null);
export const lyricError = writable(null);
export const showHistory = writable(false);
export const history = writable([]);
export const currentArtist = writable('');
export const currentSong =writable('');

export function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export async function fetchLyrics (artist, song, fromHistoryPage = false) {
    loading.set(true);
    const titleCaseArtist = toTitleCase(artist);
    const titleCaseSong = toTitleCase(song);
    currentArtist.set(titleCaseArtist);
    currentSong.set(titleCaseSong);

    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${titleCaseArtist}/${titleCaseSong}`);
        const data = await response.json();
        console.warn('response', data);
        console.warn('No lyrics', data.error);

        if (data.error) {
            lyricError.set(data.error);
        }
        else if (fromHistoryPage) {
            lyricError.set(null);
            lyrics.set(data);
            showHistory.set(false);
        }
        else {
            lyricError.set(null);
            lyrics.set(data);
            history.update(history => [...history, {artist: titleCaseArtist, song: titleCaseSong}])
        }

        loading.set(false);
    } catch (error) {
        loading.set(true);
        console.warn('Error', error)
    }
}