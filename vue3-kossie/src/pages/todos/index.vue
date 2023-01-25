<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button @click="moveToCreatePage" class="btn btn-primary">
        할일만들기
      </button>
    </div>

    <input
      class="form-control" type="text" placeholder="검색"
      v-model="searchText"
      @keyup.enter="searchTodo"
    />

    <hr />

    <!--h4>count : {{ count }}</h4>
    <h4>doubleCount : {{ doubleCount }}</h4>
    <button @click="count++">add 1</button-->
    <!-- 템플릿 내에서는 count.value로 접근하지 않아도 된다.
    computed 는 값이 리턴되므로 state처럼 접근한다.
    다만 파라미터를 받아올 수 없다.
    캐시를 갖고 있으므로 두 번 사용하더라도 계산되는 경우 한 번만 실행된다.
    -->

    <!-- <TodoSimpleForm @add-todo="addTodo" /> -->

    <div v-if="!todos.length">표시할 것이 없습니다.</div>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />

    <hr />

    <TodoPagination
      :currentPage="currentPage"
      :numberOfPages="numberOfPages"
      @get-todos="getTodos"
    />
    <Toast v-if="showToast" :message="toastMessage" :type="toastAlert" />
  </div>
</template>

<script>
import { ref, computed, watch } from "vue"; //data를 reactive하게
import { useRouter } from "vue-router";
import axios from "axios";
import TodoList from "@/components/TodoList.vue";
// import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoPagination from "@/components/TodoPagination.vue";
import { useToast } from "@/composables/toast.js";
import Toast from "@/components/Toast.vue";

export default {
  components: {
    // TodoSimpleForm,
    TodoList,
    TodoPagination,
    Toast,
  },
  setup() {
    const router = useRouter();

    /* v-model 은 양방향 바인딩을 위함 */
    const todos = ref([]);
    const error = ref("");
    const searchText = ref('');

    const numberOfTodos = ref(0);
    let limit = 5;
    const currentPage = ref(1);

    const { toastMessage, showToast, triggerToast, toastAlert } = useToast();
    // watch(currentPage, (currentPage, prev) => {
    //   console.log(currentPage, prev)
    // });    

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000);
    });
    
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });
    
    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?subject_like=${searchText.value}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`
        );

        numberOfTodos.value = res.headers["x-total-count"];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        triggerToast("에러가 발생했습니다.", "danger");
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      //데이터베이스 투두를 저장
      try {
        await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.completed,
        });

        getTodos(1);
        // todos.value.push(res.data)
      } catch (err) {
        console.log(err);
        triggerToast("에러가 발생했습니다.", "danger");
      }
    };

    const deleteTodo = async (id) => {
      error.value = "";

      // const id = todos.value[idx].id; todoList에서 id 가져오기 전에 씀

      try {
        await axios.delete("http://localhost:3000/todos/" + id);
        // console.log(res);
        // todos.value.splice(idx,1);
        getTodos(1);
      } catch (err) {
        console.log(err);
        // error.value = 'Something went wrong.';
        triggerToast("오류가 발생했습니다.", "danger");
      }
    };

    const toggleTodo = async (index, checked) => {
      const id = todos.value[index].id;
      try {
        await axios.patch("http://localhost:3000/todos/" + id, {
          completed: checked,
        });
        todos.value[index].completed = checked;
      } catch (err) {
        console.log(err);
        triggerToast("에러가 발생했습니다.", "danger");
      }
    };    

    const moveToCreatePage = () => {
      router.push({
        name: "TodoCreate",
      });
    };

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    

    // const count = ref(1);
    // const doubleCount = computed(()=> {
    //   return count.value * 2;
    // });

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
      searchText,
      getTodos,
      numberOfPages,
      currentPage,
      searchTodo,
      toastMessage,
      toastAlert,
      showToast,
      moveToCreatePage,
      //  count,
      //  filteredTodos,
    };
  },
};
</script>

<style>
.todo {
  color: pink;
}
.error {
  color: red;
}
</style>