<script setup lang="ts">
const props = defineProps<{
  to: 'register' | 'forgot'
  name?: string
  email: string
}>()

const { isCaptureSuccessful } = storeToRefs(useComponentMessageStore())
const info = useComponentMessageStore()

const isSendCode = ref(false)
const isSending = ref(false)
const countdown = ref(0)

const sendCode = async () => {
  const url =
    props.to === 'register'
      ? '/api/auth/email/code/register'
      : '/api/auth/email/code/forgot'
  const body =
    props.to === 'register'
      ? { email: props.email, name: props.name }
      : { email: props.email }

  const result = await $fetch(url, {
    method: 'POST',
    body,
    ...kungalgameResponseHandler
  })
  return result
}

watch(
  () => isSendCode.value,
  async () => {
    if (!isSending.value) {
      isSending.value = true
      countdown.value = 30

      const countdownInterval = setInterval(() => {
        countdown.value -= 1
        if (countdown.value === 0) {
          clearInterval(countdownInterval)
          isSending.value = false
        }
      }, 1000)

      const result = await sendCode()

      if (result) {
        info.info('AlertInfo.code.code')
      } else {
        isSending.value = false
      }
    }
  }
)

const handleSendCode = () => {
  if (isCaptureSuccessful.value) {
    isSendCode.value = !isSendCode.value
  }
}
</script>

<template>
  <button @click="handleSendCode" :disabled="isSending">
    {{ isSending ? countdown : '发送验证码' }}
  </button>
</template>

<style lang="scss" scoped>
button {
  width: 90px;
  height: 30px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: var(--kungalgame-font-color-1);
  &:hover {
    color: var(--kungalgame-blue-5);
  }
}
</style>
