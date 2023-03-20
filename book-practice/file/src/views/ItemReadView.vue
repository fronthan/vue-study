
<template>
  <div align="center">
    <h2>상품 상세보기</h2>

    <ItemRead v-if="item" :item="item"/>
    <p v-else>loading..</p>

    <router-link
      :to="{ name: 'ItemModifyView', params: { itemId } }"
    >수정</router-link>
    <button @click="deletePost">삭제</button>
    <router-link
      :to="{ name: 'ItemListView' }"
    >목록
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import ItemRead from '@/components/ItemRead.vue'
import client from '@/modules/client.js'
import { router } from '@/router/router.js'

export default {
  name: 'ItemReadView',
  components: { ItemRead },
  props: {
    itemId: {
      type:String,
      required:true
    }
  },

  setup(props) {
    client.get(`/items/${props.itemId}`).then(res => {
      item.value = res.data
    }).catch(err => {
      alert(err.response.data.msg)
    })

    const deletePost = () => {
      const { itemId } = item.value
      client.delete(`/items/${itemId}`).then(res => {
        alert('삭제되었습니다.');
        router.push({name: 'ItemListView'})
      }).catch(err => {
        alert(err.response.data.message)
      })
    }

    return {
      item
    }
  }

}
</script>
