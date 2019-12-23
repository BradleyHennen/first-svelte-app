<script>
    import {showHistory, history, loading, fetchLyrics} from '../Store/stores.js';
    import Loader from './Loader.svelte';

    $: console.log('history', $history)
</script>

<section>
    {#if $showHistory}
        <h1>History</h1>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Artist</th>
                    <th>Song</th>
                </tr>
            </thead>
            <tbody>
                {#each $history as {artist, song}, i}
                    <tr on:click={() => fetchLyrics(artist, song, true)}>
                        <td>{i + 1}</td>
                        <td>{artist}</td>
                        <td>{song}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
    {#if $loading && $showHistory}
        <Loader/>
    {/if}
</section>

<style>
    table {
        width: 100%;
        display: table;
        border-spacing: 0;
        border-collapse: collapse;
    }

    thead {
        display: table-header-group;
        vertical-align: middle;
        border-color: inherit;
    }

    tbody {
        display: table-row-group;
        vertical-align: middle;
        border-color: inherit;
    }

    tr {
        color: inherit;
        display: table-row;
        outline: 0;
        vertical-align: middle;
        border-color: inherit
    }

    th {
        color: rgba(0, 0, 0, 0.87);
        font-weight: 500;
        line-height: 1.5rem;
        display: table-cell;
        padding: 16px;
        font-size: 0.875rem;
        text-align: left;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        border-bottom: 1px solid rgba(224, 224, 224, 1);
        letter-spacing: 0.01071em;
        vertical-align: inherit;
    }

    td {
        color: rgba(0, 0, 0, 0.87);
        display: table-cell;
        padding: 16px;
        font-size: 0.875rem;
        text-align: left;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 400;
        line-height: 1.43;
        border-bottom: 1px solid rgba(224, 224, 224, 1);
        letter-spacing: 0.01071em;
        vertical-align: inherit;
    }
</style>