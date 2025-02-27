import type { KUNGalgameSettingsStore } from '../types/settings'

const SETTINGS_CUSTOM_BACKGROUND_IMAGE_NAME: string = 'kun-galgame-custom-bg'
const SETTINGS_PUBLISH_Banner_IMAGE_NAME: string = 'kun-galgame-publish-banner'
const SETTINGS_DEFAULT_FONT_FAMILY: string = 'system-ui'

export const usePersistSettingsStore = defineStore('KUNGalgameSettings', {
  persist: true,
  state: (): KUNGalgameSettingsStore => ({
    showKUNGalgamePageTransparency: 77,
    showKUNGalgameFontStyle: SETTINGS_DEFAULT_FONT_FAMILY,
    showKUNGalgameBackground: 0,
    showKUNGalgameBackgroundBlur: 0,
    showKUNGalgameBackLoli: true
  }),
  actions: {
    // Set the font style, allowing users to set their own
    // , with the default as system UI
    setKUNGalgameFontStyle(font: string) {
      this.showKUNGalgameFontStyle = font
      document.documentElement.style.setProperty('--font-family', font)
    },

    // Set the page transparency
    setKUNGalgameTransparency(trans: number) {
      this.showKUNGalgamePageTransparency = trans
      document.documentElement.style.setProperty(
        '--kun-global-opacity',
        `${trans / 100}`
      )
    },

    // Set the page background blur
    setKUNGalgameBackgroundBlur(blur: number) {
      this.showKUNGalgameBackgroundBlur = blur
      document.documentElement.style.setProperty(
        '--kun-background-blur',
        `${blur}px`
      )
    },

    // Set the system background
    async setSystemBackground(index: number) {
      this.showKUNGalgameBackground = index
      await deleteImage(SETTINGS_CUSTOM_BACKGROUND_IMAGE_NAME)
    },

    // Set the image of custom
    async setCustomBackground(file: File) {
      await saveImage(file, SETTINGS_CUSTOM_BACKGROUND_IMAGE_NAME)
      this.showKUNGalgameBackground = -1
    },

    // Get the image of current setting option
    async getCurrentBackground() {
      const backgroundImageBlobData = await getImage(
        SETTINGS_CUSTOM_BACKGROUND_IMAGE_NAME
      )
      if (this.showKUNGalgameBackground === 0) {
        return ''
      }

      if (this.showKUNGalgameBackground === -1 && backgroundImageBlobData) {
        return URL.createObjectURL(backgroundImageBlobData)
      }

      return `/bg/bg${this.showKUNGalgameBackground}.webp`
    },

    // Reset all settings; because it interacts with the document
    // , Pinia reactivity is not effective
    async setKUNGalgameSettingsRecover() {
      kungalgameStoreReset()
      await deleteImage(SETTINGS_CUSTOM_BACKGROUND_IMAGE_NAME)
      await deleteImage(SETTINGS_PUBLISH_Banner_IMAGE_NAME)
    }
  }
})
