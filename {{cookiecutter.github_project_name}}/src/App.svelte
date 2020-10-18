<script>
  export let value;
  export let model;
  function updateValue() {
    model.set('value', 'NEW VAL');
    model.save_changes();
    value = 'NEW VAL';
  }
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {value}!</h1>
<button on:click={() => updateValue()}>update val</button>
