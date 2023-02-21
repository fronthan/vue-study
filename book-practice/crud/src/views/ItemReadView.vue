<template>
  <div align="center">
    <h3>상품 상세보기</h3>
    <item-read />
    <router-link :to="{ name:'ItemModifyView', params: {itemId: 100} }">수정</router-link>
    <button>삭제</button>
    <router-link :to="{name: 'ItemListView'}">목록</router-link>
  </div>
</template>

<script>
import ItemRead from '@/components/ItemRead.vue'

export default {
  components: { ItemRead }
}
</script>
