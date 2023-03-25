<template>
  <div>
    <form @submit.prevent="fireSignin">
      <table>
        <tr>
          <th>ID</th>
          <td><input type="text" v-model="userId"></td>
        </tr>
        <tr>
          <th>PW</th>
          <td><input type="password" v-model="password"></td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <button type="submit">로그인</button>
          </td>
        </tr>
      </table>
    </form>
    
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SigninForm',
  emits: ['sign-in'],
  
  setup(props, context) {
    const userId = ref('')
    const password = ref('')

    const fireSignin = () => {
      context.emit('sign-in', {
        userId: userId.value,
        password: password.value
      })
    }

    return {
      userId, password,
      fireSignin
    }
  }

}
</script>