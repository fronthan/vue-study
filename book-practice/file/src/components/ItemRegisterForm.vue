<template>
  <div>
    <form @submit.prevent="fireAddPost">
      <table>
        <tr>
          <th>상품명</th>
          <td><input type="text" v-model="itemName"></td>
        </tr>
        <tr>
          <th>상품가격</th>
          <td><input type="text" v-model="price"> 원</td>
        </tr>
        <tr>
          <th>상품파일</th>
          <td><input type="file" @change="changeFile($event)" /></td>
        </tr>
        <tr>
          <th>상품설명</th>
          <td><textarea rows="5" v-model="description"></textarea></td>
        </tr>
      </table>

      <div>
        <button type="submit">등록</button>
        <router-link
          :to="{ name: 'ItemListView' }"
        >취소</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ItemRegisterForm',
  emits: ['add-post'],

  setup(props, context) {
    const itemName = ref('');
    const price = ref('');
    const description = ref('');
    const file = ref('');

    const fireAddPost = () => {
      context.emit('add-post', {
        itemName : itemName.value,
        price: price.value,
        description: description.value,
        file: file.value
      })
    }

    const changeFile = (evt) => {
      file.value = evt.target.files[0]
    }

    return {
      itemName, price, description, file,
      fireAddPost, changeFile,
    }
  }
}
</script>

<style>

</style>