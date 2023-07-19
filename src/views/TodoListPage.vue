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
  width: 80%;
  height: 80%;
  background-color: rgba(238, 238, 238, 0.05);
  border-radius: 10px;
}
</style>