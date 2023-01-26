<template>
      <!-- <div
      v-for="(todo, idx) in todos"
      :key="todo.id"
      class="card mt-2"
      > -->
  <List :items="todos">
    <template #default="{item,idx}">
      <div class="card-body p-2 d-flex align-items-center" style="cursor:pointer"
        @click="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <input class="me-2 ml-2" type="checkbox"
            :checked="item.completed"
            @change="toggleTodo(idx, $event)"
            @click.stop
          >
          <span class="txt"
            :class="{todo : item.completed}"
            :style="item.completed ? todoStyle : {}"
          >
            {{ item.subject }}
          </span>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm"
            @click.stop="openModal(item.id)"
          >
            delete
          </button>
        </div>      
      </div>
    </template>
  </List>

  <teleport to="#modal">
    <Modal
      v-if="showModal" 
      @close="closeModal"  
      @delete="deleteTodo"
    /> 
  </teleport>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Modal from '@/components/DeleteModal.vue';
import List from '@/components/List.vue';

export default {
  //props: ['todos']
  components: {
    Modal,
    List
  },
  props: {
    todos: {
      type:Array,
      required:true
    }
  },
  emits: ['delete-todo', 'toggle-todo'],

  setup(props, { emit }){   
  
    const router = useRouter();

    const showModal = ref(false);
    const todoDeleteId = ref(null);
    
    //emit 부모로 이벤트를 보낸다.
    const toggleTodo = (index, event) => {      
      emit('toggle-todo', index, event.target.checked);
    };
    const deleteTodo = () => {
      emit('delete-todo', todoDeleteId.value);

      showModal.value = false;
      todoDeleteId.value = null
    }


    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    }    
    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
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

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };   

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal,
      todoStyle,
    }    
  }
}
</script>

<style scoped>
  .txt {display: inline-block; cursor: pointer;}
</style>