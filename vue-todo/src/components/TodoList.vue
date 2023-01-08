<template>
  <section>
    <!-- <ul> -->
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" class="shadow" :key="todoItem">
        <i class="checkBtn fas fa-check" aria-hidden="true"></i>
        {{ todoItem }}
        <span class="removeBtn" type="button" @click="removeTodo(todoItem,index)">
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    <!-- </ul> -->
    </transition-group>
  </section>
</template>

<script>
export default {
  props: ['propsdata'],
  
  methods: { 
    removeTodo(todoItem, index){
      // localStorage.removeItem(todoItem);
      // this.todoItems.splice(index, 1);
      this.$emit('removeTodo', todoItem, index);
    }
  }
}
</script>

<style scoped>
  ul {
    padding-left:0;
    margin-top: 0;
    list-style: none;
    text-align: left;
  }

  li {
    display:flex;
    min-height:50px;
    line-height:50px;
    margin: .5rem 0;
    padding:0 .9rem;
    border-radius: 5px;
    background-color: #fff;
  }

  .checkBtn {
    line-height: 45px;
    margin-right: 10px;
    color: #62acde;
  }

  .removeBtn {
    margin-left: auto;
    color:#de4343;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform:translateY(30px);
  }
</style>
