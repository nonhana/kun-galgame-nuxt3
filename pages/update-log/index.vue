<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: `更新记录 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content:
        '鲲 Galgame 论坛开源 GitHub 仓库的更新记录, 记录了 Galgame 论坛从零到一的一切'
    }
  ]
})
</script>

<template>
  <div class="root">
    <div class="content">
      <div class="todo">
        <div class="title">待办列表</div>
        <UpdateLogTodo />
      </div>

      <div class="history">
        <div class="title">历史版本</div>
        <UpdateLogHistory />
      </div>
    </div>

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 80rem;
  margin: 0 auto;
  padding: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
}

.todo {
  width: 50%;
}

.title {
  height: 40px;
  font-size: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.history {
  height: 100%;
  width: 50%;
}

@media (max-width: 700px) {
  .root {
    min-width: 100%;
    min-height: 100%;
    height: calc(100dvh - 63px);
  }

  .container {
    height: 100%;
    width: 95%;
    max-height: 100%;
    overflow-y: scroll;
  }

  .content {
    flex-direction: column;
  }

  .todo,
  .history {
    width: 100%;
  }
}
</style>
