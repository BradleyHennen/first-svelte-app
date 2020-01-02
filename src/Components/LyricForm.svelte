<script>
    import Loader from './Loader.svelte';
    import {fade, fly} from 'svelte/transition';
    import {fetchLyrics, loading, lyrics, showHistory, currentArtist, currentSong} from '../Store/stores.js';

    console.warn($lyrics);
    let artist = '';
    let song = '';

    function newSearch() {
        lyrics.set(null);
        artist = '';
        song = '';
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
</script>

<section>
    {#if !$showHistory}
        {#if !$loading && !$lyrics}
        <span in:fade>
            <h2>Search For Lyrics</h2>
            <form>
                <label for="artist">
                    Artist
                    <input id="artist" type="text" class="validate" bind:value={artist}>
                </label>
                <label for="song">
                    Song
                    <input id="song" type="text" class="validate" bind:value={song}>
                </label>
                <br/>
                <button on:click|preventDefault={() => fetchLyrics(artist, song)}>
                    Search
                </button>
            </form>
        </span>
        {/if}

        {#if $loading}
            <Loader/>
        {/if}

        {#if !$loading && $lyrics}
            <span in:fly="{{ y: 200, duration: 2000 }}" out:fade="{{duration: 1500 }}">
                <h3>Artist: {$currentArtist}</h3>
                <h3>Song: {$currentSong}</h3>
                <p>{$lyrics.lyrics}</p>
                <button on:click|preventDefault={() => newSearch()}>New Search</button>
            </span>
        {/if}
    {/if}
</section>


<style>
    label, input {
        margin: 4%;
    }

    input {
        padding: 4%;
        border: 1px solid darkgrey;
        border-radius: 4px;
    }

    button {
        margin-bottom: 6%;
    }

    section, form, p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    p {
        margin: 2%;
        white-space: pre-wrap;
    }
</style>
