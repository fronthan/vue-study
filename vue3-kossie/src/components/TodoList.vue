<template>
  <div>
    <div
    v-for="(todo, idx) in todos"
    :key="todo.id"
    class="card mt-2"
    >
      <div
        class="card-body p-2 d-flex align-items-center"
      >
        <div class="form-check flex-grow-1">
          <input class="form-check-input" type="checkbox" :checked="todo.completed"
           @change="toggleTodo(idx, $event)"
           @click.stop
          >
          <label
            class="form-check-label"
            :class="{todo : todo.completed}"
            :style="todo.completed ? todoStyle : {}"           
            @click="moveToPage(todo.id)"
          >
            {{ todo.subject }}
          </label>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm"
            @click.stop="deleteTodo(idx)"
          >delete
          </button>
        </div>      
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  //props: ['todos']
  props: {
    todos: {
      type:Array,
      required:true
    }
  },
  emits: ['delete-todo', 'toggle-todo'],

  setup(props, { emit }){
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };    

    const router = useRouter();
    
    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const deleteTodo = (index) => {
      emit('delete-todo', index);
    }

    const moveToPage = (id) => {
      //console.log(id)
      // router.push('/todos/' + id);
      router.push({
        name: 'Todo',
        params: {
          id: id
        }//속성이름은 router에서 줬던 path name과 동일해야 한다.
      })
    }

    return {
      toggleTodo,
      deleteTodo,
      todoStyle,
      moveToPage,
    }    
  }

}
</script>

<style>

</style>