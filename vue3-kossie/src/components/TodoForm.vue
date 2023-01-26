<template>
  <div v-if="loading">loading. . .</div>

  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <Input label="Subject"
          :error="subjectError"
          v-model:subject="todo.subject"
        />
      </div>
      <div v-if="editing" class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div class="d-block">
            <button
              type="button"
              class="btn"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? "Completed" : "Incomplete" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea
            v-model="todo.body"
            class="form-control"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
    </div>

    <button class="btn btn-outline-dark me-2" @click="movoToTodoListPage">
      취소
    </button>
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      {{ editing ? "Update" : "Create" }}
    </button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/axios";
import _ from "lodash";

import { useToast } from "@/composables/toast.js";
import Input from "./Input.vue";

export default {
  components: {
    Input
  },
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: "",
      completed: false,
      body: "",
    });
    const subjectError = ref("");
    const originalTodo = ref(null);
    const loading = ref(false);

    const {
          toastMessage,
          toastAlertType,
          showToast,
          triggerToast
        } = useToast();

    const todoId = route.params.id;

    const getTodo = async () => {
      loading.value = true;

      try {
        const res = await axios.get(`todos/${todoId}`);

        todo.value = { ...res.data };//참조가 아닌 복사
        originalTodo.value = { ...res.data };
        loading.value = false;
      } catch (err) {
        loading.value = false;
        triggerToast("오류가 발생했습니다.", "danger");
      }
    };

    if (props.editing) {
      getTodo();
    }

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };    

    const movoToTodoListPage = () => {
      router.push({
        name: "Todos",
      });
    };

    const onSave = async () => {
      if (!todo.value.subject) {
        subjectError.value = "Subject는 필수항목입니다";
        return;
      }

      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };
        if (props.editing) {
          res = await axios.put(`todos/${todoId}`, data);

          originalTodo.value = { ...res.data };
        } else {
          res = await axios.post('todos', data);
          todo.value.subject = "";
          todo.value.body = "";
        }

        const message =
          "Successfully " + (props.editing ? "Updated" : "Created");
        triggerToast(message);

        if (!props.editing) {
          router.push({
            name: 'Todos'
          })
        }
      } catch (err) {
        triggerToast("에러가 발생했습니다.", "danger");
      }
    };

    return {
      todo,
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
      loading,
      toggleTodoStatus,
      movoToTodoListPage,
      onSave,
      todoUpdated,
      subjectError,
    };
  },
};
</script>
<style scoped>


.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>