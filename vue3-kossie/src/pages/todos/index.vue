<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input class="form-control" type="text"
      v-model="searchText"
      placeholder="검색"
      @keyup.enter="searchTodo"
    >
        
    <hr>

    <!--h4>count : {{ count }}</h4>
    <h4>doubleCount : {{ doubleCount }}</h4>
    <button @click="count++">add 1</button-->
    <!-- 템플릿 내에서는 count.value로 접근하지 않아도 된다.
    computed 는 값이 리턴되므로 state처럼 접근한다.
    다만 파라미터를 받아올 수 없다.
    캐시를 갖고 있으므로 두 번 사용하더라도 계산되는 경우 한 번만 실행된다.
    -->
    
    <TodoSimpleForm @add-todo="addTodo" />
    
    <div v-if="!todos.length">표시할 것이 없습니다.</div>
  
    <TodoList
    :todos="todos" 
    @toggle-todo="toggleTodo"
    @delete-todo="deleteTodo"
    />

    <hr>

    <TodoPagination 
      :currentPage="currentPage"
      :numberOfPages="numberOfPages"
      @get-todos="getTodos" 
    />
  </div>
</template>

<script>
import { ref , computed, watch } from 'vue';//data를 reactive하게
import axios from "axios";
import TodoList from '@/components/TodoList.vue';
import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoPagination from '@/components/TodoPagination.vue';

export default {
  components : {
    TodoSimpleForm,
    TodoList,
    TodoPagination
  }, 
  setup() {

    /* v-model 은 양방향 바인딩을 위함 */
    const todos = ref([]);
    const error = ref('');

    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);

    // watch(currentPage, (currentPage, prev) => {
    //   console.log(currentPage, prev)
    // });
    const numberOfPages = computed(()=> {
      return Math.ceil(numberOfTodos.value/limit);
    })
    
    const deleteTodo = async (idx) => {
      error.value = '';
      const id = todos.value[idx].id;
      try {
       await axios.delete('http://localhost:3000/todos/'+id);
       // console.log(res);
        // todos.value.splice(idx,1);
        getTodos(1);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
    };

    const searchText = ref('');

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?subject_like=${searchText.value}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`);

        numberOfTodos.value = res.headers['x-total-count'];

        todos.value = res.data;
      } catch( err ) {
        console.log(err);
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      //데이터베이스 투두를 저장
      try {

        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed
        });

          getTodos(1);
          // todos.value.push(res.data)
        } catch(err) {
          console.log(err)
        }
    };

    const toggleTodo = async (index) => {
      const id = todos.value[index].id;
      try {
        await axios.patch('http://localhost:3000/todos/'+id, {
          completed: !todos.value[index].completed
        }); 
        todos.value[index].completed = !todos.value[index].completed;
      } catch(err) {
        console.log(err)
     }
    };

    const count = ref(1);
    // const doubleCount = computed(()=> {
    //   return count.value * 2;
    // });    

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };
    
    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000);
    });
    // const filteredTodos = computed(()=> {
    //   if(searchText.value) {
    //     return todos.value.filter(t => {
    //       return t.subject.includes(searchText.value);
    //     });
    //   }

    //   return todos.value;
    // });

    return {
      todos,
      deleteTodo,
      addTodo,
      toggleTodo,
      count,
      searchText,
    //  filteredTodos,
      getTodos,
      numberOfPages,
      currentPage,
      searchTodo,
    }
  }
}
</script>

<style>
.todo {
  color:pink;
}
.error {color:red; }
</style>