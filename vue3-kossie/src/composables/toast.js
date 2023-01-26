import { computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
  const store = useStore();
  const toasts = computed(() => store.state.toast.toasts);
  // const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile']);
  // const toastAlert = computed(() => store.state.toast.toastAlert);
  // const showToast = computed(() => store.state.toast.showToast);  

  const triggerToast = (message, type = 'success') => {
    store.dispatch('toast/triggerToast', {message, type});
  }

  return {
    // toastMessage,
    // showToast,
    // toastAlert,
    triggerToast,
    toasts
  }
}