<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import 'animate.css'

const props = defineProps<{
  message: string
  type: 'warn' | 'success' | 'error' | 'info'
  richText?: boolean
}>()

const isRichText = computed(() => props.richText ?? false)

const messageClassMap = {
  warn: 'animate__animated animate__headShake',
  success: 'animate__animated animate__bounceInDown',
  error: 'animate__animated animate__tada',
  info: 'animate__animated animate__bounce'
}

const messageClass = computed(
  () => `${messageClassMap[props.type]} ${props.type}`
)
</script>

<template>
  <div class="kungalgame-message-container">
    <div class="kungalgame-message" :class="messageClass">
      <Icon
        class="icon"
        :icon="`lucide:${
          {
            warn: 'triangle-alert',
            success: 'check',
            error: 'x',
            info: 'info'
          }[type]
        }`"
      />

      <span v-if="!isRichText" class="message">{{ message }}</span>
      <span v-if="isRichText" v-html="message"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.kungalgame-message-container {
  position: fixed;
  top: 100px;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  z-index: 9999;
}

.kungalgame-message {
  margin: 0 auto;
  font-size: large;
  padding: 1vh 10vw;

  span {
    flex-direction: column;
  }

  .message {
    word-break: break-all;
  }
}

.icon {
  font-size: 23px;
  margin-right: 17px;
}

.warn {
  border: 1px solid var(--kungalgame-yellow-3);

  .icon {
    color: var(--kungalgame-yellow-3);
  }
}

.success {
  border: 1px solid var(--kungalgame-green-4);

  .icon {
    color: var(--kungalgame-green-4);
  }
}

.error {
  border: 1px solid var(--kungalgame-red-4);

  .icon {
    color: var(--kungalgame-red-4);
  }
}

.info {
  border: 1px solid var(--kungalgame-blue-5);

  .icon {
    color: var(--kungalgame-blue-5);
  }
}
</style>
