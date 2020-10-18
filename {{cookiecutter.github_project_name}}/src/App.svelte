<script>
  export let model;

  import { createValue } from './stores.js';

  let value = createValue(model, 'value');

  let i = 0;

  function updateValue() {
    value.set('VAL ' + i);
    i++;
  }
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {$value}!</h1>
<button on:click={() => updateValue()}>update val</button>
