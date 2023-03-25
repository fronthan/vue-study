import { computed, reactive } from 'vue'
import client from '../modules/client.js'

export const useAuth = () => {
  const state = reactive({
    accessToken: '',
    myinfo: null,
  })

  //데이터 상태 변경 함수
  const SET_ACCESS_TOKEN = (accessToken) => {
    if(accessToken) {
      state.accessToken = accessToken

      client.defaults.headers.common.Authorization= `Bearer ${accessToken}`
    }
  }

  const SET_MY_INFO = (myinfo) => {
    if(myinfo) {
      state.myinfo = myinfo
    }
  }

  //로그인 처리 함수
  const signin = (payload) => {
    return client.post(`/api/authenticate?username=${payload.userId}&password=${payload.password}`, {username: payload.userId, password:payload.password}).then(res=> {
      const { authorization } = res.headers
      const accessToken = authorization.substring(7)

      SET_ACCESS_TOKEN(accessToken)

      //사용자 정보 요청
      return client.get('/users/myinfo')
    }).then(res=> {
      //스토어 상태에 저장
      SET_MY_INFO(res.data)
    })
  }

  const myinfo = computed(()=> state.myinfo)
  const isAuthorized = computed(()=> {
    return state.accessToken.length > 0 && !!state.myinfo
  })

  const isAdmin = computed(()=> {
    if(!state.myinfo || !state.myinfo.authList) {
      return false
    }

    return isAuthorized && state.myinfo.authList[0].auth === 'ROLE_ADMIN'
  })

  const isMember = computed(()=> {
    if(!state.myinfo || !state.myinfo.authList) {
      return false
    }

    return isAuthorized && state.myinfo.authList[0].auth === 'ROLE_MEMBER'
  })

  return {
    myinfo, isAuthorized, isAdmin, isMember,
    signin,
  }
}