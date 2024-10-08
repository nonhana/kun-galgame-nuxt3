import UserModel from '~/server/models/user'
import GalgameModel from '~/server/models/galgame'
import type { HomeGalgame } from '~/types/api/home'

const getHomeGalgames = async (page: number, limit: number) => {
  const skip = (page - 1) * limit

  const galgames = await GalgameModel.find({ status: { $ne: 1 } })
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  const data: HomeGalgame[] = await Promise.all(
    galgames.map(async (galgame) => {
      const contributors = await Promise.all(
        galgame.contributor.map(async (uid: number) => {
          const user = await UserModel.findOne({ uid }).lean()
          return {
            uid,
            name: user?.name || '',
            avatar: user?.avatar || ''
          }
        })
      )

      return {
        gid: galgame.gid,
        name: galgame.name,
        time: galgame.time,
        views: galgame.views,
        contributors,
        languages: galgame.language,
        platforms: galgame.platform
      }
    })
  )

  return data
}

export default defineEventHandler(async (event) => {
  const { page, limit }: KunPagination = await getQuery(event)
  if (limit !== '10') {
    return kunError(event, 10209)
  }
  const result = await getHomeGalgames(parseInt(page), parseInt(limit))

  return result
})
