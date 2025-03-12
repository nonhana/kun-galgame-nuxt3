export interface KunLayoutItem {
  name: string
  label: string
  icon?: string
  router?: string
  hint?: string
  external?: boolean
  isCollapse?: boolean
  children?: KunLayoutItem[]
}

export const kunLayoutItem: KunLayoutItem[] = [
  {
    name: 'galgame',
    icon: 'lucide:gamepad-2',
    router: '/galgame',
    label: 'Galgame'
  },
  {
    name: 'topic',
    icon: 'lucide:square-library',
    router: '/topic',
    label: '话题'
  },
  {
    name: 'category',
    icon: 'lucide:layers-3',
    label: '话题分类',
    isCollapse: true,
    children: [
      {
        name: 'galgame',
        router: '/category/galgame',
        label: '话题分类'
      },
      {
        name: 'technique',
        router: '/category/technique',
        label: '技术交流'
      },
      {
        name: 'others',
        router: '/category/others',
        label: '其它'
      }
    ]
  },
  {
    name: 'create',
    icon: 'lucide:pencil',
    label: '发布主题',
    isCollapse: false,
    children: [
      {
        name: 'createTopic',
        router: '/edit/topic',
        label: '发布话题'
      },
      {
        name: 'createGalgame',
        router: '/edit/galgame?type=publish',
        label: '发布 Galgame',
        hint: '新'
      }
    ]
  },
  {
    name: 'ranking',
    icon: 'lucide:align-end-horizontal',
    label: '排行榜单',
    children: [
      {
        name: 'ranking',
        router: '/ranking/topic',
        label: '话题排行'
      },
      {
        name: 'ranking',
        router: '/ranking/user',
        label: '用户排行'
      }
    ]
  },
  {
    name: 'about',
    icon: 'lucide:info',
    router: '/kungalgame',
    label: '关于我们'
  },
  {
    name: 'friends',
    icon: 'lucide:handshake',
    router: '/friend-links',
    label: '友情链接'
  },
  {
    name: 'sticker',
    icon: 'lucide:image',
    router: 'https://sticker.kungal.com/',
    label: '表情包网站',
    external: true
  },
  {
    name: 'nav',
    icon: 'lucide:navigation',
    router: 'https://nav.kungal.org/',
    label: '导航网站',
    hint: '防失联',
    external: true
  },
  {
    name: 'update',
    icon: 'lucide:arrow-big-up-dash',
    router: '/update-log',
    label: '更新日志'
  },
  {
    name: 'nonMoe',
    icon: 'lucide:ban',
    router: '/non-moe',
    label: '不萌记录'
  }
]
