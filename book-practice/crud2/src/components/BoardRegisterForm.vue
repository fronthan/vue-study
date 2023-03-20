<template>
  <div>
    <form @submit.prevent="fireAddPost">
      <table>
        <tr>
          <th>제목</th>
          <td>
            <input type="text" v-model="title">
          </td>
        </tr>
        <tr>
          <th>작성자</th>
          <td><input type="text" v-model="writer"></td>
      </tr>
      <tr>
        <th>내용</th>
        <td>
          <textarea v-model="content" rows="5"></textarea>
        </td>
      </tr>
      </table>

      <div>
        <button type="submit">등록</button>
        <router-link :to="{ name: 'BoardListView' }">취소</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  emits: ['add-post'],

  setup(props, context) {
    const title = ref('')
    const writer = ref('')
    const content = ref('')

    const fireAddPost = () => {
      context.emit('add-post', {
        title:title.value, 
        writer: writer.value,
        content: content.value
      })
    }

    return {
      fireAddPost,
      title, writer, content,
    }
  }
  
}
</script>