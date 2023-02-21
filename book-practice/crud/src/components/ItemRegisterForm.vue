<template>
  <form @submit.prevent="fireAddPost">
    <table>
      <tr>
        <th>상품명</th>
        <td>
          <input type="text" v-model="itemName">
        </td>
      </tr>
      <tr>
        <th>상품가격</th>
        <td><input type="text" v-model="price"> 원</td>
     </tr>
     <tr>
       <th>상품파일</th>
       <td><input type="file" @change="changeFile($event)"></td>
     </tr>
     <tr>
       <th>상품설명</th>
       <td>
         <textarea v-model="description" rows="5"></textarea>
       </td>
     </tr>
    </table>

    <div>
      <button type="submit">등록</button>
      <router-link :to="{ name: 'ItemListView' }">취소</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const itemName = ref('');
    const price = ref('');
    const description = ref('');
    const file = ref('');
  }
}
</script>
