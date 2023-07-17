<template>
  <div class="todo-list">
    <todo-item v-for="item in data" :data="item" :key="item.title"/>
  </div>
</template>

<script lang="ts">
import TodoItem from "@/components/TodoItem.vue";
import {Todo} from "@/ts/Todo";
import axios from "axios";
import backend from "@/backend";
import router from "@/router";

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
    axios.get(backend + '/users').then((res) => {
      if (res.data.code == 6150) {
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