<script setup lang="ts">
import { typeOptions, languageOptions, platformOptions } from '../utils/options'
import { checkGalgameResourcePublish } from '../utils/checkGalgameResourcePublish'
import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'

const props = defineProps<{
  // For simplicity, the type is set to unknown here.
  refresh: () => Promise<unknown>
}>()

const { locale } = useI18n()
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})
const { resources, rewriteResourceId } = storeToRefs(
  useTempGalgameResourceStore()
)
const isFetching = ref(false)

const defaultResourceLink: GalgameResourceStoreTemp = {
  type: 'game',
  link: '',
  language: locale.value,
  platform: 'windows',
  size: '',
  code: '',
  password: '',
  note: ''
}

const resourceLink = ref<GalgameResourceStoreTemp>({ ...defaultResourceLink })

const handlePublishResourceLink = async (method: 'POST' | 'PUT') => {
  if (!checkGalgameResourcePublish(resourceLink.value)) {
    return
  }

  isFetching.value = true
  const { data } = await useFetch(`/api/galgame/${gid.value}/resource`, {
    method,
    query: rewriteResourceId.value ? { grid: rewriteResourceId.value } : {},
    body: resourceLink.value,
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (data.value) {
    if (!rewriteResourceId.value) {
      useMessage(
        'Publish resource link successfully!',
        '发布资源链接成功!',
        'success'
      )
    } else {
      rewriteResourceId.value = 0
      useMessage(
        'Rewrite resource link successfully!',
        'Rewrite 资源链接成功!',
        'success'
      )
    }
    await props.refresh()
    resourceLink.value = { ...defaultResourceLink }
  }
}

const handleCancel = () => {
  rewriteResourceId.value = 0
  resourceLink.value = { ...defaultResourceLink }
  resources.value[0] = resourceLink.value
}

watch(
  () => rewriteResourceId.value,
  () => {
    if (rewriteResourceId.value) {
      resourceLink.value = resources.value[0]
    }
  }
)

onMounted(() => {
  if (rewriteResourceId.value) {
    resourceLink.value = resources.value[0]
  }
})
</script>

<template>
  <GalgameResourceHelp />

  <div class="link">
    <KunInput
      placeholder="资源链接 (网盘|磁链|网址) 等"
      v-model="resourceLink.link"
    />

    <div>
      <KunInput placeholder="资源体积 (MB 或 GB)" v-model="resourceLink.size" />
      <KunInput placeholder="资源提取码 (可选)" v-model="resourceLink.code" />
      <KunInput
        placeholder="资源解压码 (可选)"
        v-model="resourceLink.password"
      />
    </div>
  </div>

  <div class="type">
    <KunSelect
      class="kun-select"
      :styles="{ width: '200px' }"
      :options="typeOptions"
      i18n="edit.galgame.resource.type"
      @set="(value) => (resourceLink.type = value)"
      position="top"
      default-value="game"
    >
      <div class="select">
        <span>资源链接的类型</span>
        <span v-if="resourceLink.type">
          {{ $t(`edit.galgame.resource.type.${resourceLink.type}`) }}
        </span>
      </div>
    </KunSelect>

    <KunSelect
      class="kun-select"
      :styles="{ width: '200px' }"
      :options="languageOptions"
      i18n="edit.galgame.resource.language"
      @set="(value) => (resourceLink.language = value)"
      position="top"
      :default-value="locale"
    >
      <div class="select">
        <span>资源链接的语言</span>
        <span v-if="resourceLink.language">
          {{ $t(`edit.galgame.resource.language.${resourceLink.language}`) }}
        </span>
      </div>
    </KunSelect>

    <KunSelect
      class="kun-select"
      :styles="{ width: '200px' }"
      :options="platformOptions"
      i18n="edit.galgame.platform"
      @set="(value) => (resourceLink.platform = value)"
      position="top"
      default-value="windows"
    >
      <div class="select">
        <span>资源链接的平台</span>
        <span v-if="resourceLink.platform">
          {{ $t(`edit.galgame.platform.${resourceLink.platform}`) }}
        </span>
      </div>
    </KunSelect>
  </div>

  <div class="note">
    <KunInput placeholder="资源备注 (可选)" v-model="resourceLink.note" />
  </div>

  <div class="btn">
    <KunButton
      @click="handlePublishResourceLink('POST')"
      type="primary"
      :pending="isFetching"
      v-if="!rewriteResourceId"
    >
      创建资源链接
    </KunButton>

    <KunButton v-if="rewriteResourceId" @click="handleCancel">
      取消 Rewrite
    </KunButton>

    <KunButton
      class="rewrite"
      @click="handlePublishResourceLink('PUT')"
      type="danger"
      :pending="isFetching"
      v-if="rewriteResourceId"
    >
      Rewrite 资源链接
    </KunButton>
  </div>
</template>

<style lang="scss" scoped>
.link {
  display: flex;
  flex-direction: column;

  & > div {
    margin-top: 10px;

    input {
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }
}

.type {
  display: flex;
  flex-wrap: wrap;
}

.kun-select {
  padding: 10px;
  background-color: var(--kungalgame-trans-blue-0);
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.select {
  display: flex;
  flex-direction: column;

  span {
    &:first-child {
      font-size: small;
      color: var(--kungalgame-font-color-0);
    }
  }
}

.note {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  button {
    margin: 17px 0;
  }
}

.btn {
  margin-bottom: 10px;
  display: flex;
  width: 100%;

  button {
    width: 100%;
  }

  .rewrite {
    margin-left: 10px;
  }
}
</style>
