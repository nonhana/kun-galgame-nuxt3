<script setup lang="ts">
import {
  typeOptions,
  languageOptions,
  platformOptions
} from '~/components/galgame/utils/options'

const { type, language, platform, sortOrder } = storeToRefs(
  usePersistGalgameStore()
)

// TODO:
const handleClick = () => {
  useMessage('The feature is under development', '该功能正在开发中', 'warn')
}
</script>

<template>
  <div class="nav">
    <div class="type">
      <KunSelect
        :styles="{ width: '150px' }"
        :options="typeOptions"
        i18n="edit.galgame.resource.type"
        @set="handleClick"
        position="bottom"
      >
        {{ $t(`edit.galgame.resource.type.${type}`) }}
      </KunSelect>

      <KunSelect
        :styles="{ width: '150px' }"
        :options="languageOptions"
        i18n="edit.galgame.resource.language"
        @set="handleClick"
        position="bottom"
      >
        {{ $t(`edit.galgame.resource.language.${language}`) }}
      </KunSelect>

      <KunSelect
        :styles="{ width: '150px' }"
        :options="platformOptions"
        i18n="edit.galgame.platform"
        @set="handleClick"
        position="bottom"
      >
        {{ $t(`edit.galgame.platform.${platform}`) }}
      </KunSelect>
    </div>

    <div class="order">
      <span
        :class="sortOrder === 'asc' ? 'active' : ''"
        @click="sortOrder = 'asc'"
      >
        {{ $t('galgame.asc') }}
      </span>
      <span
        :class="sortOrder === 'desc' ? 'active' : ''"
        @click="sortOrder = 'desc'"
      >
        {{ $t('galgame.desc') }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 10px;
  box-shadow: var(--kungalgame-shadow-0);
  margin-bottom: 10px;
  z-index: 10;
  position: relative;
  max-width: 100%;
  padding: 0 17px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 10px;
    backdrop-filter: blur(10px);
  }
}

.type {
  display: flex;
  flex-wrap: wrap;

  .kun-select {
    padding: 10px 0;
  }
}

.order {
  display: flex;
  white-space: nowrap;
  padding: 10px 0;
  margin-left: auto;

  span {
    cursor: pointer;
    padding: 3px 10px;
    margin-right: 5px;
    border: 2px solid transparent;
    border-radius: 10px;
  }

  .active {
    border: 2px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-blue-0);
  }
}
</style>
