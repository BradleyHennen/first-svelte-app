import { writable } from 'svelte/store';

export const loading = writable(false);
export const lyrics = writable(null);
export const lyricError = writable(null);
export const showHistory = writable(false);

export async function fetchLyrics (artist, song) {
    loading.set(true);

    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
        const data = await response.json();
        console.warn('response', data);
        console.warn('No lyrics', data.error);

        if (data.error) {
            lyricError.set(data.error);
        }
        else {
            lyrics.set(data);
        }

        loading.set(false);
    } catch (error) {
        loading.set(true);
        console.warn('Error', error)
    }
}