<script>
    import {loading, showHistory} from '../Store/stores.js';
    import Loader from './Loader.svelte';
</script>

<header>
<!--    {#if $loading}-->
<!--        <Loader/>-->
<!--    {/if}-->
    <h1>Svelte Application</h1>
    <h3>Lyric Finder</h3>
    <nav>
        <p on:click={() => showHistory.set(false)}>Home</p>
        <p on:click={() => showHistory.set(true)}>Search History</p>
    </nav>
</header>

<style>
    header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: teal;
    }

    nav {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        border-top: 1px solid black;
        font-weight: bold;
    }
</style>
