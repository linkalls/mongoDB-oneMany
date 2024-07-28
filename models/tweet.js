const mongoose = require("mongoose")
const { Schema } = mongoose

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("接続ok")
  })
  .catch((error) => console.log("MongoDbエラー", error))

const userSchema = new Schema({
  username: String,
  age: Number,
})

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
})

const User = mongoose.model("User", userSchema)
const Tweet = mongoose.model("Tweet", tweetSchema)

// const makeTweet = async () => {
//   // const user = await new User({ username: "山田", age: 61 })
//   const user = await User.findOne({ username: "山田" })
//   // const tweet1 = await new Tweet({ text: "今日は晴れてて気分がいい", likes: 0 })
//   const tweet2 = await new Tweet({ text: "ほげほげもげもげ", likes: 100 })
//   tweet2.user = user //* これでうまくいく
//   tweet2.save()
//   // user.save()
// }

// makeTweet()

const findTweet = async () => {
  const tweet = await Tweet.find({}).populate("user","username")
  console.log(tweet)
}

findTweet()

// [
//   {
//     _id: 66a65bfed3922142a871de00,
//     text: '今日は晴れてて気分がいい',
//     likes: 0,
//     user: { _id: 66a65bfed3922142a871ddff, username: '山田' },
//     __v: 0
//   },
//   {
//     _id: 66a65c72b64be010f4ec2383,
//     text: 'ほげほげもげもげ',
//     likes: 100,
//     user: { _id: 66a65bfed3922142a871ddff, username: '山田' },
//     __v: 0
//   }
// ]
