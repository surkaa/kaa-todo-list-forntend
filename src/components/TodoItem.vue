<template>
  <div class="todo-item">
    <div class="todo-item-flag">
      <el-checkbox v-model="data.flag"></el-checkbox>
    </div>
    <div class="todo-item-content">
      <div class="todo-item-title">
        <span>{{ data.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Todo} from "@/ts/Todo";

export default {
  props: {
    data: {
      type: Object as () => Todo,
      require: true
    }
  }
}
</script>

<style scoped>
.todo-item {
  display: flex;
  flex-direction: row;
  padding: 1rem;
}

.todo-item-flag {
  margin: 0.5rem;
}

.todo-item-content {
  margin: auto 2rem;
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
}

.todo-item-title::before {
  content: ' - ';
}

</style>