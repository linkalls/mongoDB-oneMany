# 一対数個のとき　
ドキュメントにデータを丸ごと入れてしまう(少ないからね)
```js
{
  name: "tom",
  savedAddress: [
    { street: "hoge 5", city: "hiroshima",country:"japan" },
    { street: "moge 5", city: "hiroshima",country:"japan" },
  ]
}
```
ネストしたオブジェクトがあったら勝手にそこにもidつけてくれる

```js
{
  first: 'taro',
  last: '山田',
  _id: new ObjectId('66a63855ed3aacd30475105d'),
  addresses: [
    {
      country: 'japan',
      prefecture: '千葉',
      address1: '千葉市',
      address2: '0-0-0',
      _id: new ObjectId('66a63855ed3aacd30475105e') //* ネストしたオブジェクトがあったら勝手にそこにもidつけてくれる
    }
  ],
  __v: 0
}
```


```js
addresses: [
    {
      _id: {id: false}, //* これを書くとネストしたオブジェクトにidがつかなくなる
      country: String,
      prefecture: String, //* さらにネストできる
      address1: String,
      address2: String,
    },
  ],
  ```
  この上の方法は$ npm i mongoose@5だけだった
  6はこっち
  ```js
  _id: false,
  ```
  # 一対たくさんの時
  データを別々のコレクションに保存してドキュメントidを親のどこかに保存する
  ```js
  {
    farmName: "full belly farms",
    location: "Guinda, CA",
    product: [
      ObjectID:("21938103810381"),
      ObjectID:("436457567677687"),
      ObjectID:("099687456465646"),
    ]
  }
```
これのやり方
```js
 product: [
      ObjectID:("21938103810381"),
      ObjectID:("436457567677687"),
      ObjectID:("099687456465646"),
    ]
```
```js
const { Schema } = mongoose
const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
})
```
**ref: "Product"** っていうところでProductモデルと紐づいてると伝える
db側ではこのように保存される


```js
{
    _id: ObjectId('66a64047c0f4a72dec5c1e19'),
    products: [ ObjectId('66a63d5bdbb7ae2a287a121e') ],
    name: 'マザー牧場',
    city: '千葉市',
    __v: 0
  }
```
```js
Farm.findOne({ name: "マザー牧場" }).then((farm) => console.log(farm))

{
  products: [ 66a63d5bdbb7ae2a287a121e, 66a63d5bdbb7ae2a287a121e ], //* idじゃなくて中身もとれるようにできるよ
  _id: 66a64047c0f4a72dec5c1e19,
  name: 'マザー牧場',
  city: '千葉市',
  __v: 1
}
```
```js
Farm.findOne({ name: "マザー牧場" })
.populate("products") //* productsっていうプロパティをpopulate
.then((farm) => console.log(farm))


{
  products: [
    {
      _id: 66a63d5bdbb7ae2a287a121e,
      name: 'メロン',
      price: 3000,
      season: 'winter',
      __v: 0
    },
    {
      _id: 66a63d5bdbb7ae2a287a121e,
      name: 'メロン',
      price: 3000,
      season: 'winter',
      __v: 0
    }
  ],
  _id: 66a64047c0f4a72dec5c1e19,
  name: 'マザー牧場',
  city: '千葉市',
  __v: 1
}
```