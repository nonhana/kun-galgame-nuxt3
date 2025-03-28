<script setup lang="ts">
import { callCommand } from '@milkdown/utils'
import {
  createCodeBlockCommand,
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
  insertHrCommand,
  insertImageCommand,
  toggleInlineCodeCommand
} from '@milkdown/preset-commonmark'
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm'
import { insertLinkPlugin } from './hyperlinkInsert'
import type { UseEditorReturn } from '@milkdown/vue'
import type { CmdKey } from '@milkdown/core'

const props = defineProps<{
  editorInfo: UseEditorReturn
  isShowUploadImage: boolean
}>()

const { get, loading } = props.editorInfo
const input = ref<HTMLElement>()
const isShowInsertLink = ref(false)

const call = <T,>(command: CmdKey<T>, payload?: T, callback?: () => void) => {
  const result = get()?.action(callCommand(command, payload))
  if (callback) {
    callback()
  }
  return result
}

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) {
    return
  }
  const file = input.files[0]

  const formData = new FormData()
  formData.append('image', file)

  useMessage(10107, 'info')
  const result = await $fetch('/api/image/topic', {
    method: 'POST',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    const fileName = file.name.replace(/[^a-zA-Z0-9 ]/g, '')
    const userName = usePersistUserStore().name
    const imageName = `${userName}-${Date.now()}-${fileName}`
    call(insertImageCommand.key, {
      src: result ?? '',
      title: imageName,
      alt: imageName
    })
    useMessage(10108, 'success')
  }
}
</script>

<template>
  <div class="menu">
    <KunMilkdownPluginsModeToggle />

    <!-- Mark Group -->
    <div
      class="btn"
      aria-label="kun-galgame-bold"
      @click="call(toggleStrongCommand.key)"
      v-tooltip="{
        message: '加粗',
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:bold" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-italic"
      @click="call(toggleEmphasisCommand.key)"
      v-tooltip="{
        message: '斜体',
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:italic" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-strikethrough"
      @click="call(toggleStrikethroughCommand.key)"
      v-tooltip="{
        message: '删除线',
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:strikethrough" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-list-bulleted"
      @click="call(wrapInBulletListCommand.key)"
      v-tooltip="{
        message: '无序列表',
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:list" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-list-numbered"
      @click="call(wrapInOrderedListCommand.key)"
      v-tooltip="{
        message: '有序列表',
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:list-ordered" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-quote"
      @click="call(wrapInBlockquoteCommand.key)"
      v-tooltip="{
        message: '引用块',
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:quote" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-horizontal"
      @click="call(insertHrCommand.key)"
      v-tooltip="{
        message: '水平线',
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:minus" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-insert-link"
      @click="isShowInsertLink = true"
      v-tooltip="{
        message: '插入链接',
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:link" />
      <KunMilkdownPluginsLinkInsertDialog
        :show="isShowInsertLink"
        @insert="
          call(
            insertLinkPlugin.key,
            undefined,
            () => (isShowInsertLink = false)
          )
        "
        @cancel="isShowInsertLink = false"
      />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-code-block"
      @click="call(createCodeBlockCommand.key, 'javascript')"
      v-tooltip="{
        message: '代码块',
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:square-code" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-code"
      @click="call(toggleInlineCodeCommand.key)"
      v-tooltip="{
        message: '行内代码',
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:code-xml" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-upload-image"
      v-if="props.isShowUploadImage"
      @click="input?.click()"
      v-tooltip="{
        message: '上传图片',
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:image-plus" />
      <input
        ref="input"
        type="file"
        accept=".jpg, .jpeg, .png, .webp"
        @change="handleFileChange($event)"
      />
    </div>

    <div class="btn emoji" aria-label="kun-galgame-emoji">
      <Icon class="icon" name="lucide:smile-plus" />
      <KunMilkdownPluginsEmojiContainer :editor-info="editorInfo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  position: sticky;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: var(--kungalgame-trans-blue-0);
  backdrop-filter: blur(10px);
  z-index: 999;

  .btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: none;
    border-radius: 5px;
    margin: 5px;
    font-size: 22px;
    color: var(--kungalgame-font-color-3);
    background-color: transparent;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid var(--kungalgame-blue-5);
      color: var(--kungalgame-blue-5);
    }
  }
}

.emoji {
  position: relative;

  .emoji-container {
    display: none;
  }

  &:hover {
    .emoji-container {
      display: flex;
    }
  }
}

input {
  display: none;
}
</style>
