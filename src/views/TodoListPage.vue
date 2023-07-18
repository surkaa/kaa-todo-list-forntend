<template>
  <div class="todo-list">
    <todo-item v-for="item in data" :data="item" :key="item.title"/>
  </div>
</template>

<script lang="ts">
import TodoItem from "@/components/TodoItem.vue";
import {Todo} from "@/ts/Todo";
import router from "@/router";
import request from '@/utils/request'

export default {
  name: "TodoListPage",
  components: {
    TodoItem
  },
  data() {
    return {
      data: [
        new Todo("No Title", "", Math.random() < 0.5)
      ]
    }
  },
  created() {
    request.get('/users').then((res: any) => {
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
  width: 80%;
  height: 80%;
  background-color: rgba(238, 238, 238, 0.5);
  border-radius: 10px;
}
</style>