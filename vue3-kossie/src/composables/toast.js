import { ref, onUnmounted } from 'vue';

export const useToast = () => {
  const toastMessage = ref('');
  const toastAlert = ref('');
  const showToast = ref(false);
  const timeout = ref(null);

  const triggerToast = (msg, type = 'success') => {
    toastMessage.value = msg;
    toastAlert.value = type;
    showToast.value = true;
    
    timeout.value = setTimeout(()=> {
      showToast.value = false;
      toastMessage.value = '';
      toastAlert.value = '';
    }, 3000);

    onUnmounted(() => {
      console.log('unmounted');
      clearTimeout(timeout.value);
    });
  }


  return {
    toastMessage,
    showToast,
    toastAlert,
    triggerToast
  }
}