<script setup lang="ts">
import 'animate.css'

const route = useRoute()

const { showKUNGalgameHamburger, messageStatus } = storeToRefs(
  useTempSettingStore()
)

watch(
  () => route.name,
  () => {
    useTempSettingStore().reset()
  }
)

onMounted(async () => {
  const result = await $fetch(`/api/message/unread`, {
    method: 'GET'
  })
  if (result === 'Moe loli online!') {
    messageStatus.value = 'online'
  } else {
    messageStatus.value = 'new'
  }
})
</script>

<template>
  <div class="nav-top flex h-full items-center">
    <div class="cursor-pointer sm:hidden">
      <Icon
        class="icon"
        name="lucide:menu"
        @click="showKUNGalgameHamburger = true"
      />

      <LazyKunTopBarHamburger />
    </div>

    <KunTopBarNavBar />
  </div>
</template>
