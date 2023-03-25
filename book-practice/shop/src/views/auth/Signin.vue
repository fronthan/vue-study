<template>
  <div align="center">
    <h2>로그인</h2>
    <SigninForm @sign-in="login"/>
  </div>
</template>

<script>
import { inject } from 'vue'
import SigninForm from '@/components/auth/SigninForm.vue'
import { useAuth } from '@/compositions/useAuth.js'
import { router } from '@/router/router.js'

export default {
  name: 'Signin',
  components: {SigninForm},

  setup() {
    //공유된 로그인 함수 주입
    const signin = inject("signin")

    //로그인 처리 메서드
    const login = (payload) => {
      signin(payload).then(res=> {
        alert('로그인 되었습니다.')
        router.push({name: 'Home'})
      }).catch(err=> {
        console.log(err)
      })
    }

    return { login }
  }

}
</script>