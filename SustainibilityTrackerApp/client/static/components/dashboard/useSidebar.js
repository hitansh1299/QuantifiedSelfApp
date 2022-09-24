const isOpen = Vue.ref(false)

export function useSidebar() {
  return {
    isOpen
  };
}
