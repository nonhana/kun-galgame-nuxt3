<script setup lang="ts">
import { getLoli } from './getLoli'

const loliData = ref({
  loliBodyLeft: '',
  loliBodyTop: '',
  loliEyeLeft: '',
  loliEyeTop: '',
  loliBrowLeft: '',
  loliBrowTop: '',
  loliMouthLeft: '',
  loliMouthTop: '',
  loliFaceLeft: '',
  loliFaceTop: '',
  body: '',
  eye: '',
  brow: '',
  mouth: '',
  face: ''
})
const isShowLoading = ref(false)

const reGetLoli = async () => {
  isShowLoading.value = true
  loliData.value = await getLoli()
  isShowLoading.value = false
}

onMounted(async () => {
  await reGetLoli()
})
</script>

<template>
  <div class="loli-container">
    <div class="loli" @click="reGetLoli" v-if="loliData.body">
      <img
        class="body"
        :src="loliData.body"
        alt="ren"
        :style="{ left: loliData.loliBodyLeft, top: loliData.loliBodyTop }"
      />
      <img
        class="eye"
        :src="loliData.eye"
        alt="ren"
        :style="{ left: loliData.loliEyeLeft, top: loliData.loliEyeTop }"
      />
      <img
        class="brow"
        :src="loliData.brow"
        alt="ren"
        :style="{ left: loliData.loliBrowLeft, top: loliData.loliBrowTop }"
      />
      <img
        class="mouth"
        :src="loliData.mouth"
        alt="ren"
        :style="{ left: loliData.loliMouthLeft, top: loliData.loliMouthTop }"
      />
      <img
        class="face"
        :src="loliData.face"
        alt="ren"
        :style="{ left: loliData.loliFaceLeft, top: loliData.loliFaceTop }"
      />
    </div>

    <KunSkeletonSettingsPanelLoli v-if="!loliData.body" />

    <KunLoading v-if="isShowLoading" style="top: 310px; left: 140px" />
  </div>
</template>

<style scoped>
.loli-container {
  top: -270px;
  left: 130px;
}

.loli {
  cursor: pointer;
  width: 100%;
  position: absolute;
  z-index: 9999;
}
.body {
  position: absolute;
}
.eye {
  position: absolute;
}
.brow {
  position: absolute;
}
.mouth {
  position: absolute;
}
.face {
  position: absolute;
}
</style>
