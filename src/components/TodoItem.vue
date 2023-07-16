<template>
  <div class="todo-item">
    {{data.title}}
  </div>
</template>

<script lang="ts">
import {Todo} from "@/ts/Todo";

export default {
  props: {
    data: {
      type: Todo,
      require: true
    }
  }
}
</script>

<style scoped>

</style>