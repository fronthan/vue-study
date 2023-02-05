<template>
  <div class="todo_list">
    <ul>
      <li v-for="(todo, idx) in todos" :key="idx">
        <span v-if="!isEditing(index)" @dblclick="handleDblClick(index)">{{ todo.content }}</span> 
        
        <input v-else type="text" ref="editInput" 
          :value="todo.content"
          v-on:blur="handleBlur()"
          @keydown.enter="updateTodo(todo.id, $event)"
        />
        <button @click="removeTodo(index)">삭제</button>
      </li>     
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['todos', 'editingId'],
  emits: ['remove-todo', 'update-todo'],

  setup(props, {emit}) {
    const todos = props.todos;

    const removeTodo = (idx) => {
      emit('remove-todo', idx);
      todos.value.splice(idx, 1);
    }

    const editInput = ref(null);
    const handleDblClick = (idx) => {
     // todos[idx].isEditing = true;

      const { id } = todos[idx];

      emit('set-editing-id', id)

      nextTick(() => {
        editInput.value.focus()
      })
    }

    const handleBlur = () => {
      emit('reset-editing-id')
    }

    const updateTodo = (id, e) => {
      const content = e.target.value.trim();

      if(content.length <= 0) {
        return false;
      }

      emit('update-todo', content, id)

      editInput.value.blur()
    }

    const isEditing = (index) => {
      if(todos[index]) {
        return todos[index].id === props.editingId
      }

      return false
    }

    return { todos, removeTodo, editInput, handleDblClick, updateTodo, isEditing }
  }
}
</script>

<style>
.todo_list {background-color: #ff0;}
</style>