<template>
  <div class="todo-list">
    <todo-item :data="data"/>
  </div>
</template>

<script lang="ts">
import TodoItem from "@/components/TodoItem.vue";
import {Todo} from "@/ts/Todo";

export default {
  name: "TodoListPage",
  components: {
    TodoItem
  },
  data() {
    return {
      data: new Todo("No Title", "", true)
    }
  },
  created() {
    axios.get(backend + '/users').then((res) => {
      if (res.data.code == 6150) {
        alert("请先登录后查看哦~")
        window.location.href = '/todolist/login'
      }
    })
  }
}

</script>

<style scoped>
.todo-list {
  width: 80%;
  background-color: #eeeeee;
  border-radius: 10px;
}
</style>