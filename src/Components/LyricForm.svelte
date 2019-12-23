<script>
    import Loader from './Loader.svelte';
    import {fetchLyrics, loading, lyrics, showHistory, currentArtist, currentSong} from '../Store/stores.js';

    $: console.warn($lyrics);
    let artist = '';
    let song = '';
</script>

<section>
    {#if !$showHistory}
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
        {#if $loading}
            <Loader/>
        {/if}

        {#if !$loading && $lyrics}
            <h3>Artist: {$currentArtist}</h3>
            <h3>Song: {$currentSong}</h3>
            <p>{$lyrics.lyrics}</p>
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
