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