import ItemListView from '@/views/ItemListView.vue'
import ItemRegisterView from '@/views/ItemRegisterView.vue'
import ItemModifyView from '@/views/ItemModifyView.vue'
import ItemReadView from '@/views/ItemReadView.vue'
import BoardListView from '@/views/BoardListView.vue'
import BoardRegisterView from '@/views/BoardRegisterView.vue'
import BoardReadView from '@/views/BoardReadView.vue'
import BoardModifyView from '@/views/BoardModifyView.vue'

const routes = [

  //목록 화면
  {
    path: '/',
    name: 'BoardListView',
    components: {
      default: BoardListView
    }
  },
  //등록 화면
  {
    path: '/boards/create',
    name: 'BoardRegisterView',
    components: {
      default: BoardRegisterView
    }
  },
  //상세 화면
  {
    path: '/boards/:boardNo',
    name: 'BoardReadView',
    components: {
      default: BoardReadView
    },
    props: {
      default: true
    }
  },
  //수정 화면
  {
    path: '/boards/:boardNo/edit',
    name: 'BoardModifyView',
    components: {
      default: BoardModifyView
    },
    props: {
      default: true
    }
  },
]

export default routes