<template>  
<div class="container">
  <h2>To-Do List</h2>
  
  <TodoSimpleForm  @add-todo="addTodo" />
  
  <div v-if="!todos.length">추가된 할 일이 없습니다.</div>
  <TodoList :todos="todos" @toggle-todo="toggleTodo"/>

</div>
</template>

<script>
import { ref } from 'vue';//data를 reactive하게
import TodoList from './components/TodoList.vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default {
  components : {
    TodoSimpleForm,
    TodoList
  }, 
  setup() {
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };    

    /* v-model 은 양방향 바인딩을 위함 */
    const todos = ref([]);
    
    const deleteTodo = (idx) => {
      todos.value.splice(idx,1);
    };

    const addTodo = (todo) => {
      todos.value.push(todo)
    };

    const toggleTodo = (index) => {
      //console.log(index)
      todos.value[index].completed = !todos.value[index].completed
    };

    return {
      todos,
      todoStyle,
      deleteTodo,
      addTodo,
      toggleTodo
    }
  }
}
</script>

<style>
.todo {
  color:pink
}
.error {color:red; }
</style>