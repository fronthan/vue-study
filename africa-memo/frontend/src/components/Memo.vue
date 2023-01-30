<template>
  <div class="memo">
    <div class="act">
      <button class="btn btn-primary" @click="add()">+ 추가</button>
    </div>
    <ul>
      <li
       v-for="d in state.data"
       :key="d.id"
        class="d-flex align-items-center" 
      >
        <span class="txt"
        @click="edit(d.id)"
        >{{ d.content }}</span>
        <button type="button" class="btn btn-danger btn-sm ml-auto"
          @click="del(d.id)"
        >-</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      data: [],
    });

    const add = () => {
      const content = prompt("내용을 입력해주세요.");

      if (!content) {
        alert("내용을 입력해주세요");
        return add();
      }

      axios.post("/api/memos", { content }).then((res) => {
        state.data = res.data;
      });
    };

    axios.get("/api/memos").then((res) => {
      state.data = res.data;
    });

    const edit = (id) => {
      const content = prompt("내용을 입력해주세요", state.data.find(d=> d.id === id).content);

      axios.put("/api/memos/" + id, { content }).then((res) => {
        state.data = res.data;
      });
    };
    
    const del = (id) => {
      const yn = confirm("정말 삭제할까요?");

      if (yn) {
        axios.delete('/api/memos/'+ id).then(res=> {
          state.data = res.data;
        })
      }
    }

    return { state, add, edit, del };
  },
};
</script>

<style lang="scss">
.memo {
  .act {
    padding: 10px 10px 5px 5px;
    text-align: right;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      padding: 15px;
      margin: 5px;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>