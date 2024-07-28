const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("接続ok")
  })
  .catch((error) => console.log("MongoDbエラー", error))

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  // addresses: [String] //*これでもできなくはない
  addresses: [
    {
      _id: {id: false}, //* これを書くとネストしたオブジェクトにidがつかなくなる
      country: String,
      prefecture: String, //* さらにネストできる
      address1: String,
      address2: String,
    },
  ],
})

const User = mongoose.model("User", userSchema)

const makeUser = async () => {
  const u = new User({
    first: "taro",
    last: "山田",
  })

  u.addresses.push({
    country: "japan",
    prefecture: "千葉",
    address1: "千葉市",
    address2: "0-0-0",
  })
  const result = await u.save()
  console.log(result)
}

const addAddress = async (id) => {
  const user = await User.findById(id)
  user.addresses.push({
    country: "japan",
    prefecture: "愛知県",
    address1: "千葉市",
    address2: "0-0-0",
  })
  const result = await user.save()
  console.log(result)
}

// makeUser()
addAddress("66a63855ed3aacd30475105d")
// {
//   first: 'taro',
//   last: '山田',
//   _id: new ObjectId('66a63855ed3aacd30475105d'),
//   addresses: [
//     {
//       country: 'japan',
//       prefecture: '千葉',
//       address1: '千葉市',
//       address2: '0-0-0',
//       _id: new ObjectId('66a63855ed3aacd30475105e') //* ネストしたオブジェクトがあったら勝手にそこにもidつけてくれる
//     }
//   ],
//   __v: 0
// }
