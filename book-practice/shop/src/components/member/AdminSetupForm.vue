<template>
  <div>
    <form @submit.prevent="fireRegisterAdmin">
      <table>
        <tr>
          <th>관리자 아이디</th>
          <td><input type="text" v-model="userId"></td>
        </tr>
        <tr>
          <th>비밀번호</th>
          <td><input type="password" v-model="userPw"></td>
        </tr>
        <tr>
          <th>관리자명</th>
          <td><input type="text" v-model="userName"></td>
        </tr>
      </table>

      <div>
        <button type="submit">등록</button>
      </div>
    </form>
    
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AdminSetupForm',
  emits: ['register-admin'],
  
  setup(props, context) {
    const userId = ref('')
    const userName = ref ('')
    const userPw = ref('')

    const fireRegisterAdmin = (payload) => {
      context.emit('register-admin', {
        userId:userId.value,
        userName: userName.value,
        userPw: userPw.value
      })
    }

    return {
      userId, userName, userPw,
      fireRegisterAdmin
    }
  }

}
</script>