<template>
  <div class="todo_list">
    <ul>
      <li v-for="(val, idx) in todos" :key="idx">
        {{ val }}<button>삭제</button>
      </li>     
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const todos = ref(['todo1', 'todo2', 'todo3']);

    return {
      todos,
    }
  }
}
</script>

<style>
.todo_list {background-color: #ff0;}
</style>