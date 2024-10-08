import type { EditStorePersist } from '~/store/types/edit/topic'

export const usePersistEditTopicStore = defineStore({
  id: 'KUNGalgameEditTopic',
  persist: {
    storage: persistedState.localStorage
  },
  state: (): EditStorePersist => ({
    mode: 'preview',
    textCount: 0,

    title: '',
    content: '',
    tags: [],
    category: [],
    section: []
  }),
  getters: {},
  actions: {
    resetTopicData() {
      this.textCount = 0

      this.title = ''
      this.content = ''
      this.tags = []
      this.category = []
      this.section = []
    }
  }
})
