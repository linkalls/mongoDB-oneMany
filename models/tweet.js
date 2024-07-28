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

const makeTweet = async () => {
  const user = await new User({ name: "山田", age: 61 })
  const tweet1 = await new Tweet({ text: "今日は晴れてて気分がいい", likes: 0 })
  tweet1.user = user //* これでうまくいく
  tweet1.save()
  user.save()
}
makeTweet()
