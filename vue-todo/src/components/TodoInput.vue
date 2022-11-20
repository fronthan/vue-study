<template>
  <div class="inputBox shadow">
    <input
      type="text"
      v-model="newTodoItem"
      placeholder="할 일을 입력하세영"
      v-on:keyup.enter="addTodo"
    />
    <!-- <button v-on:click="addTodo">추가</button> -->
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>


    <modal v-if="shadowModal" @close="showModal = false">
      <h3 slot="header">경고</h3>
      <span slot="footer" @click="showModal = false">
        할 일을 입력하세영.
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </modal>
  </div>
</template>

<script>
import Modal from "./common/Modal.vue"

export default {
  props: ['propsdata'],
  data() {
    return {
      newTodoItem: '',
      showModal: false
    };
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {
        var value = this.newTodoItem && this.newTodoItem.trim();
        this.$emit("addTodo", value);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.newTodoItem = "";
    }
  },
  components: {
    Modal
  }
};
</script>

<style scoped>
.inputBox {
  overflow: hidden;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  background-color: #fff;
}
.inputBox input {
  display: block;
  width: calc(100% - 3rem);
  height: 100%;
  float: left;
  border-style: none;
  font-size: 0.9rem;
}
input:focus {
  outline: none;
}

.addContainer {
  float: right;
  width: 3rem;
  border-radius: 0 5px 5px 0;
  background: linear-gradient(to right, #6478fb, #8763fb);
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>
