<script>
    import Loader from './Loader.svelte';
    import {fetchLyrics, loading, lyrics, showHistory} from '../Store/stores.js';

    $: console.warn($lyrics);
    let artist = '';
    let song = '';
</script>

<section>
    {#if !$showHistory}
        <h2>Search For Lyrics</h2>
        <form>
            <label>
                Artist
                <input bind:value={artist}/>
            </label>
            <label>
                Song
                <input bind:value={song}/>
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
            <p>{$lyrics.lyrics}</p>
        {/if}
    {/if}
</section>


<style>
    section, form, p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        margin: 2%;
    }

    p {
        margin: 5%;
        white-space: pre-wrap;
    }

</style>
