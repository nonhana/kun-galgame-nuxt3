import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import mongoose from 'mongoose'
import type { TopicDislikeTopicRequestData } from '~/types/api/topic'

const updateTopicDislike = async (
  uid: number,
  to_uid: number,
  tid: number,
  isPush: boolean
) => {
  if (uid === to_uid) {
    return
  }

  const topic = await TopicModel.findOne({ tid })
  if (!topic) {
    return 10211
  }

  const isDislikedTopic = topic.dislikes.includes(uid)
  if (isDislikedTopic && isPush) {
    return 10213
  }

  const amount = isPush ? 1 : -1
  const popularity = isPush ? -5 : 5

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await TopicModel.updateOne(
      { tid },
      {
        $inc: { popularity },
        [isPush ? '$push' : '$pull']: { dislikes: uid }
      }
    )

    await UserModel.updateOne(
      { uid },
      { [isPush ? '$push' : '$pull']: { dislike_topic: tid } }
    )

    await UserModel.updateOne({ uid: to_uid }, { $inc: { dislike: amount } })

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
}

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    kunError(event, 10210)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  const { to_uid, isPush }: TopicDislikeTopicRequestData = await getQuery(event)
  if (!to_uid || !isPush) {
    kunError(event, 10507)
    return
  }

  if (uid.toString() === to_uid) {
    return
  }

  const result = await updateTopicDislike(
    uid,
    parseInt(to_uid),
    parseInt(tid),
    isPush === 'true'
  )
  if (typeof result === 'number') {
    kunError(event, result)
    return
  }

  return 'MOEMOE dislike topic operation successfully!'
})
