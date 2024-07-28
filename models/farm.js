const mongoose = require("mongoose")
const { Schema } = mongoose

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("接続ok")
  })
  .catch((error) => console.log("MongoDbエラー", error))

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["spring", "summer", "fall", "winter"],
  },
})

// Product.insertMany([
//   { name: "メロン", price: 3000, season: "winter" },
//   { name: "アスパラ", price: 110, season: "spring" },
//   { name: "もも", price: 230, season: "summer" },
// ])

const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
})

const Product = mongoose.model("Product", productSchema)
const Farm = mongoose.model("farm", farmSchema)

const makeFarm = async () => {
  const farm = new Farm({
    name: "マザー牧場",
    city: "千葉市",
  })
  const melon = await Product.findOne({ name: "メロン" })
  farm.products.push(melon)
  console.log(farm)
 await farm.save()
}

// {
//   products: [
//     {
//       _id: 66a63d5bdbb7ae2a287a121e,
//       name: 'メロン',
//       price: 3000,
//       season: 'winter',
//       __v: 0
//     }
//   ],
//   _id: 66a64047c0f4a72dec5c1e19,
//   name: 'マザー牧場',
//   city: '千葉市'
// }


// makeFarm()

// {
//   _id: ObjectId('66a64047c0f4a72dec5c1e19'),
//   products: [ ObjectId('66a63d5bdbb7ae2a287a121e') ],
//   name: 'マザー牧場',
//   city: '千葉市',
//   __v: 0
// }

const addProduct = async ()=>{
  const farm = await Farm.findOne({name:"マザー牧場"})
  const watermelon = await Product.findOne({name:  "メロン"})
  console.log(watermelon)
  farm.products.push(watermelon)
  await farm.save()
  console.log(farm)
}

// {
//   products: [ 66a63d5bdbb7ae2a287a121e, 66a63d5bdbb7ae2a287a121e ],
//   _id: 66a64047c0f4a72dec5c1e19,
//   name: 'マザー牧場',
//   city: '千葉市',
//   __v: 1
// }

addProduct()