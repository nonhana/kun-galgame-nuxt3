<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

defineProps<{
  replyData: TopicReply[]
  pending: boolean
  sortOrder: 'asc' | 'desc'
}>()

const emits = defineEmits<{
  setSortOrder: [value: 'asc' | 'desc']
}>()
</script>

<template>
  <div class="tool" v-if="replyData && replyData.length > 5">
    <div class="order">
      <span
        :class="sortOrder === 'asc' ? 'active' : ''"
        @click="emits('setSortOrder', 'asc')"
      >
        <Icon class="icon" name="lucide:arrow-up" />
      </span>
      <span
        :class="sortOrder === 'desc' ? 'active' : ''"
        @click="emits('setSortOrder', 'desc')"
      >
        <Icon class="icon" name="lucide:arrow-down" />
      </span>
    </div>

    <span class="pending" v-if="pending">少女祈祷中...</span>
  </div>
</template>

<style lang="scss" scoped>
.tool {
  padding: 10px;
  margin-bottom: 17px;
  display: flex;
  align-items: center;
}

.order {
  display: flex;
  white-space: nowrap;

  .icon {
    font-size: 20px;
  }

  & > span {
    display: flex;
    cursor: pointer;
    padding: 3px 10px;
    margin-right: 5px;
    border-radius: 10px;
  }

  .active {
    box-shadow: var(--shadow);
    color: var(--kungalgame-blue-5);
  }
}

.pending {
  margin-left: 10px;
  color: var(--kungalgame-font-color-0);
  user-select: none;
}

@media (max-width: 700px) {
  .tool {
    margin-bottom: 7px;
  }
}
</style>
