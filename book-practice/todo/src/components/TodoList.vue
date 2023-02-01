<template>
  <div class="todo_list">
    <ul>
      <li v-for="(val, idx) in todos" :key="idx">
        <span v-if="!todo.isEditing" @dblclick="handleDblClick(idx)">{{ val.content }}</span> 
        
        <input v-else type="text" ref="editInput" 
          :value="val.content"
          v-on:blur="handleBlur(idx)"
          @keydown.enter="updateTodo(idx, $event)"
        />
        <button @click="removeTodo(idx)">삭제</button>
      </li>     
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['todos'],
  emits: ['remove-todo', 'update-todo'],

  setup(props, {emit}) {
    const todos = props.todos;

    const removeTodo = (idx) => {
      emit('remove-todo', idx);
      todos.value.splice(idx, 1);
    }

    const editInput = ref(null);
    const handleDblClick = (idx) => {
      todos[idx].isEditing = true;

      nextTick(() => {
        editInput.value.focus()
      })
    }

    const updateTodo = (index, e) => {
      const content = e.target.value.trim();

      if(content.length <= 0) {
        return false;
      }

      emit('update-todo', content, index)

      editInput.value.blur()
    }

    return { todos, removeTodo, editInput, handleDblClick, updateTodo }
  }
}
</script>

<style>
.todo_list {background-color: #ff0;}
</style>