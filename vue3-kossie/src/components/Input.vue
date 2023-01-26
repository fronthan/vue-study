<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input type="text" class="form-control"
      :value="subject"
      @input="onInput"
    />
    <div v-if="error" class="err_msg">
      {{ error }}
    </div>
  </div>
</template>

<script>
//import { useContext } from 'vue';

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    error: {
      type: String
    },
    subject: {
      type:String,
      required: true
    }
  },

  setup(props, { emit }) {
   // const { emit } = useContext();//props를 사용하지 않고 emit만 쓸 때

    const onInput = (e) => {
      emit('update:subject', e.target.value);
    }


    return {
      onInput
    }
  }

};
</script>

<style scoped>
.err_msg {
  color: tomato;
}
</style>