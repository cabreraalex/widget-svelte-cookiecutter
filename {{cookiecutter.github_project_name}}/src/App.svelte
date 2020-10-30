<script>
  export let model;

  import { createValue } from './stores';
  let value = createValue(model, 'value');
  let intro = createValue(model, 'intro');
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>{$intro} {$value}!</h1>
<button on:click={() => value.update((d) => d + 1)}>update val</button>
<br />
<input bind:value={$intro} />
