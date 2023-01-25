<template>
  <Modal>
    <template v-slot:title>
      Delete Todo
    </template>
    <template v-slot:body>
      할 일을 삭제할까요?
    </template>
    <template #footer>
      <button type="button" class="btn btn-secondary"
        @click.stop="onClose"          
      >Close</button>
      <button type="button" class="btn btn-danger"
        @click.stop="onDelete"
      >Delete</button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
export default {
  components: {
    Modal
  },

  setup(props, {emit}) {
    const onClose = () => {
      emit('close')
    };
    const onDelete = () => {
      emit('delete')
    };

    return {
      onClose,
      onDelete
    }

  },
}
</script>

<style>

</style>