import UserModel from '~/server/models/user'
import GalgameModel from '~/server/models/galgame'
import mongoose from 'mongoose'

const updateGalgameLike = async (gid: number, uid: number) => {
  const galgame = await GalgameModel.findOne({ gid }).lean()
  if (!galgame) {
    return 10211
  }

  if (uid === galgame.uid) {
    return
  }

  const isLikedGalgame = galgame.likes.includes(uid)
  const moemoepointAmount = isLikedGalgame ? -1 : 1

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await GalgameModel.updateOne(
      { gid },
      { [isLikedGalgame ? '$pull' : '$addToSet']: { likes: uid } }
    )

    await UserModel.updateOne(
      { uid },
      { [isLikedGalgame ? '$pull' : '$addToSet']: { like_galgame: gid } }
    )

    await UserModel.updateOne(
      { uid: galgame.uid },
      { $inc: { moemoepoint: moemoepointAmount, like: moemoepointAmount } }
    )

    if (!isLikedGalgame) {
      await createDedupMessage(
        uid,
        galgame.uid,
        'liked',
        findNonNullProperty(galgame.name),
        -gid
      )
    }

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    kunError(event, 10609)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  const result = await updateGalgameLike(parseInt(gid), uid)
  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return 'MOEMOE like galgame operation successfully!'
})
