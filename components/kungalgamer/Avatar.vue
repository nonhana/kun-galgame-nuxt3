<script setup lang="ts">
import { checkImageValid, resizeImage } from './utils/handleFileChange'

const refresh = inject<() => Promise<void>>('refresh')
const uploadedImage = ref<Blob>()
const selectedFileUrl = ref<string>('')
const input = ref<HTMLElement>()
const isUploading = ref(false)
const { avatar, avatarMin } = storeToRefs(usePersistUserStore())

const uploadImage = async (file: File) => {
  const isFileValid = checkImageValid(file)
  if (!isFileValid) {
    return
  }

  const res = await useComponentClipStore().clip(file)
  if (!res.imageBlob) {
    return
  }

  const resizedFile = await resizeImage(res.imageBlob)
  uploadedImage.value = resizedFile
  selectedFileUrl.value = URL.createObjectURL(resizedFile)
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement

  if (!input.files || !input.files[0]) {
    return
  }

  const file = input.files[0]
  uploadImage(file)
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()

  const dataTransfer = event.dataTransfer
  if (dataTransfer && dataTransfer.files.length > 0) {
    const file = dataTransfer.files[0]
    uploadImage(file)
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  event.dataTransfer!.dropEffect = 'copy'
}

const handleChangeAvatar = async () => {
  if (!uploadedImage.value) {
    useMessage(10113, 'warn')
    return
  }

  const formData = new FormData()
  formData.append('avatar', uploadedImage.value, usePersistUserStore().name)

  isUploading.value = true
  useMessage(10114, 'info')

  const avatarLink = await $fetch('/api/user/avatar', {
    method: 'POST',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (avatarLink) {
    avatar.value = avatarLink
    avatarMin.value = avatarLink.replace(/\.webp$/, '-100.webp')
    selectedFileUrl.value = ''
    useMessage(10115, 'success')
    await refresh?.()
  }
}
</script>

<template>
  <div class="avatar">
    <div class="title">更改头像</div>

    <div class="container">
      <div
        ref="upload"
        tabindex="0"
        class="avatar-upload"
        @drop="handleDrop($event)"
        @dragover="handleDragOver"
        @click="input?.click()"
      >
        <span class="plus" v-if="!selectedFileUrl" />
        <NuxtImg
          class="avatar-preview"
          :src="selectedFileUrl"
          alt="Uploaded Image"
          v-if="selectedFileUrl"
        />
        <input
          ref="input"
          hidden
          type="file"
          accept=".jpg, .jpeg, .png, .webp"
          @change="handleFileChange($event)"
        />
      </div>

      <div class="help">
        <div class="hint">
          <span>拖拽图片到方框内或</span>
          <span>点击方框上传</span>
        </div>
        <KunButton :pending="isUploading" @click="handleChangeAvatar">
          确定更改
        </KunButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  width: 100%;
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}

.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.avatar-upload {
  width: 150px;
  height: 150px;
  border: 1px solid var(--kungalgame-blue-5);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    border: 1px solid var(--kungalgame-pink-3);

    .plus::before,
    .plus::after {
      background: var(--kungalgame-pink-3);
    }
  }

  .plus {
    display: inline-block;
    position: relative;
  }

  .plus::before,
  .plus::after {
    transition: all 0.2s;
    content: '';
    position: absolute;
    background: var(--kungalgame-blue-5);
  }

  .plus::before {
    width: 20px;
    height: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .plus::after {
    width: 2px;
    height: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.avatar-preview {
  max-width: 140px;
  max-height: 140px;
}

.help {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: small;
}

.hint {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 700px) {
  .help {
    padding: 0 10px;
  }
  .hint {
    display: none;
  }
}
</style>
