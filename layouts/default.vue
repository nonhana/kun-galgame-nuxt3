<script setup lang="ts">
const { showKUNGalgameBackground, showKUNGalgameBackLoli } = storeToRefs(
  usePersistSettingsStore()
)

const imageURL = ref('')

onMounted(async () => {
  imageURL.value = await usePersistSettingsStore().getCurrentBackground()
})

watch(
  () => showKUNGalgameBackground.value,
  async () => {
    imageURL.value = await usePersistSettingsStore().getCurrentBackground()
  }
)
</script>

<template>
  <div
    class="fixed size-full bg-cover bg-fixed bg-center bg-no-repeat brightness-50 dark:brightness-30"
    :style="{ backgroundImage: `url(${imageURL})` }"
  />

  <KunLayoutSidebar />

  <div
    class="flex min-h-dvh justify-center overflow-hidden"
    :style="{ 'background-color': 'hsl(var(--background))' }"
  >
    <div class="z-10 m-0 w-full max-w-7xl md:mr-3 md:ml-68">
      <div class="sticky top-[0] z-1007">
        <KunTopBar />
      </div>

      <slot />

      <NuxtImg
        v-if="showKUNGalgameBackLoli"
        class="pointer-events-none fixed right-px bottom-px z-0 opacity-17 select-none"
        src="/image/kohaku.webp"
        loading="lazy"
        alt="kohaku"
      />
    </div>
  </div>
</template>
