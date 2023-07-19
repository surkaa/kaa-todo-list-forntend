<template>
  <div class="todo-list">
    <el-empty class="todo-empty-view" v-if="isEmpty" description="暂无待办事项">
      <el-button @click="reload">轻触刷新</el-button>
    </el-empty>
    <todo-item v-if="!isEmpty" v-for="item in data" :todo="item" :key="item.id"/>
  </div>
</template>

<script lang="ts">
import TodoItem from "@/components/TodoItem.vue";
import router from "@/router";
import request from '@/utils/request'
import {Todo} from "@/ts/Todo";
import {defineComponent} from "vue";
import dayjs from "dayjs";

export default defineComponent({
  name: "TodoListPage",
  components: {
    TodoItem
  },
  data() {
    return {
      isEmpty: true,
      data: [] as Todo[]
    }
  },
  created() {
    request.get('/todos').then((res: any) => {
      if (res.data.code > 0) {
        alert("请先登录后查看哦~")
        router.push('/login')
      }
      this.data = res.data.data
      if (this.data.length != 0) {
        this.isEmpty = false
        // 根据预计完成时间最早排序
        this.data.sort((a, b) => {
          let aTarget = dayjs(a.targetTime).unix()
          let bTarget = dayjs(b.targetTime).unix()
          return aTarget - bTarget
        })
      }
    })
  },
  methods: {
    reload() {
      location.reload()
    }
  }
})

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

.todo-empty-view {
  height: 100%;
  opacity: 0.5;
}
</style>