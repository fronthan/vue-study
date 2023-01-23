import { ref, onUnmounted } from 'vue';

export const useToast = () => {
  const toastMessage = ref('');
  const toastAlert = ref('');
  const showToast = ref(false);
  const toastTimeout = ref(null);

  const triggerToast = (msg, type = 'success') => {
    toastMessage.value=msg;
    toastAlert.value = type;
    showToast.value = true;
    
    toastTimeout.value = setTimeout(()=> {
      toastMessage.value = '';
      toastAlert.value = '';
      showToast.value = false;
    }, 3000);

    onUnmounted(() => {
       console.log('unmounted')
      clearTimeout(timeout.value);
    });
  }

  return {
    toastMessage,
    showToast,
    triggerToast,
    toastAlert
  }
}