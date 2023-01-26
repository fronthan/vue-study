<template>
  <Modal>
    <template v-slot:title>
      Delete Todo
    </template>
    <template v-slot:body>
      할 일을 삭제할까요?
    </template>
    <template #footer>
      <button type="button" class="btn btn-secondary">Close</button>
      <button type="button" class="btn btn-danger"
        @click.stop="onDelete"
      >Delete</button>
    </template>
  </Modal>
</template>

<script>
import { useContext } from 'vue';

import Modal from '@/components/Modal.vue';

export default {
  components: {
    Modal
  },

  setup() {
    const { emit } = useContext();

    const onDelete = () => {
      emit('delete')
    };

    return {
      onDelete
    }

  },
}
</script>

<style>

</style>