<template>
  <div class="todo-list">
    <todo-item v-for="item in data.data" :todo="item" :key="item.id"/>
  </div>
</template>

<script lang="ts">
import TodoItem from "@/components/TodoItem.vue";
import router from "@/router";
import request from '@/utils/request'
import {Todo} from "@/ts/Todo";

export default {
  name: "TodoListPage",
  components: {
    TodoItem
  },
  data() {
    return {
      data: [] as Todo[]
    }
  },
  created() {
    request.get('/todos').then((res: any) => {
      this.data = res.data
      if (res.data.code > 0) {
        alert("请先登录后查看哦~")
        router.push('/login')
      }
    })
  }
}

</script>

<style scoped>
.todo-list {
  width: 62%;
  height: 90%;
  background-color: rgba(238, 238, 238, 0.05);
  border-radius: 1rem;
  overflow-y: auto;
}

@media screen and (max-width: 768px) {
  .todo-list {
    width: 95%;
  }
}

/* 滚动条 */
.todo-list::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.todo-list::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(16, 31, 28, 0.1);
  -webkit-border-radius: 1em;
  -moz-border-radius: 1em;
  margin: 0.5rem 0;
  border-radius: 1em;
}

.todo-list::-webkit-scrollbar-thumb {
  background-color: rgba(238, 238, 238, 0.1);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 1em;
  -moz-border-radius: 1em;
  border-radius: 1em;
  transition: background-color .3s;
  cursor: pointer;
}

.todo-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, .3);
}
</style>