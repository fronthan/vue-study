<template>
  <div class="todo_input">
    <input type="text" v-model="newTodo"
      v-on:keypress.enter="addTodo"
    >
    <button @click="addTodo">추가</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  emits: ['add-todo'],
  
  setup(props, {emit}) {

    const newTodo = ref('');

    //todo 항목 추가 함수
    const addTodo = () => {
      if(newTodo.value !== '') {
        const inpVal = newTodo.value && newTodo.value.trim()
        
        emit('add-todo', inpVal);
        clearInput();
      }
    }

    //todo 인풋 초기화
    const clearInput = () => {
      newTodo.value = '';
    }

    return {
      newTodo,
      addTodo,

    }
  }
}

</script>

<style scoped>
  .todo_input {background-color: #fff;}
</style>