import { ref, watch } from 'vue';

export function useLocalStorage(key: string, initialValue = null) {
  const storageValue = ref(localStorage.getItem(key) || initialValue);

  // Atualiza o valor reativo quando o localStorage muda (externamente)
  window.addEventListener('storage', (event) => {
    if (event.key === key) {
      storageValue.value = event.newValue;
    }
  });

  // Atualiza o localStorage quando o valor reativo mudar
  const updateLocal = (newValue: string | null) => {
    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, newValue);
    }
    storageValue.value = newValue;
  };

  // Watch para sincronizar o valor reativo e o localStorage
  watch(storageValue, (newValue) => {
    updateLocal(newValue!);
  });

  return {
    storageValue,
    updateLocal
  };
}
