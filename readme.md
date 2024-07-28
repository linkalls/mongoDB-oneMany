# 一対数個のとき　
ドキュメントにデータを丸ごと入れてしまう(少ないからね)
```json
{
  name: "tom",
  savedAddress: [
    { street: "hoge 5", city: "hiroshima",country:"japan" },
    { street: "moge 5", city: "hiroshima",country:"japan" },
  ]
}
```
ネストしたオブジェクトがあったら勝手にそこにもidつけてくれる

```json
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


```json
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
  ```json
  _id: false,
  ```

