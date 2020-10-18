import { writable } from 'svelte/store';

export function createValue(model, n) {
  const name = n;
  const curVal = writable(0);

  model.on(
    'change:' + name,
    () => {
      console.log(model.get(name), name);
      curVal.set(model.get(name));
    },
    null
  );

  return {
    set: (v) => {
      curVal.set(v);
      model.set(name, v);
      model.save_changes();
    },
    get: () => curVal.get(),
    subscribe: curVal.subscribe,
    update: (func) => {
      curVal.update((curVal) => {
        let out = func(curVal);
        model.set(name, out);
        model.save_changes();
        return out;
      });
    },
  };
}
