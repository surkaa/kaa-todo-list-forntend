<template>
  <div class="todo-item">
    <div class="todo-item-flag">
      <el-checkbox v-model="todo.flag == 1"></el-checkbox>
    </div>
    <div class="todo-item-content">
      <div class="todo-item-title">
        <span>{{ todo.title }}</span>
      </div>
      <div class="todo-item-desc">
        <span>{{ todo.description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Todo} from "@/ts/Todo";

export default {
  props: {
    todo: {
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
  padding: 1rem 0;
  margin: 1rem;
  border-radius: 1rem;
  background-color: rgba(238, 238, 238, 0.4);
}

.todo-item-flag {
  margin: 0.5rem;
}

.todo-item-content {
  margin: auto 2rem;
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
}

.todo-item-title {
  text-align: left;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.todo-item-desc {
  font-size: 1rem;
  text-align: left;
}

.todo-item-title::before {
  content: ' - ';
}

</style>