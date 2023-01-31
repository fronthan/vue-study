<template>
  <div class="todo_input">
    <input type="text" v-model="newTodo">
    <button>추가</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const newTodo = ref('');

    return {
      newTodo,
    }
  }
}

</script>

<style scoped>
  .todo_input {background-color: #fff;}
</style>