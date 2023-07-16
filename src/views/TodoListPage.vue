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
      data: new Todo("No Title")
    }
  }
}

</script>

<style scoped>

</style>