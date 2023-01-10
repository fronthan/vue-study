<template>  
<div class="container">
  <h2>To-Do List</h2>
  
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input class="form-control"
        type="text"
        v-model="todo"
        placeholder="새로운 할 일을 입력"
        >
      </div>
      <div class="">
        <button type="submit"
          class="btn btn-primary"
        >
          Add
        </button>
      </div>
    </div>
    <div v-show="hasError" class="error">입력된 값이 없습니다.</div>
  </form>
  
  <div class="card mt-2"
    v-for="todo in todos"
    :key="todo.id"
  >
    <div class="card-body p-2" >
      <div class="form-check">
        <label
          class="form-check-label"
          :class="{todo : todo.completed}"
          :style="todo.completed ? todoStyle : {}"
        >
          <input class="form-check-input" type="checkbox" v-model="todo.completed">
          {{ todo.subject }}
        </label>
      </div>
      
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';//data를 reactive하게

export default {
  setup() {
    const todo = ref('');
    /* v-model 은 양방향 바인딩을 위함 */
    const todos = ref([]);
    const hasError = ref(false);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };

    const onSubmit = () => {
      if (todo.value == '') {
        hasError.value = true;
      } else {        
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          completed:false
        });
        hasError.value = false;
        todo.value = '';
      }
    };

    return {
      todo,
      todos,
      onSubmit,
      hasError,
      todoStyle
    }
  }
}
</script>

<style>
.todo {
  color:pink
}
.error {color:red;}
</style>