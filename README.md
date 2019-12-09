# zidian
汉字、词语、成语查询接口

### Demo <https://zidian.netnr.com>

### 引言
- 数据来源于开源项目 <https://github.com/pwxcoo/chinese-xinhua>
- 而该项目的数据是一个`JSON`文件，大小超出 `20M`，不利于页面加载使用，所以拆分了文件
- 提取字、词、成语为数组，根据数组索引分页生成详情，具体请看 `build/parse.html` 的拆分脚本

### 使用
引入
```
<script src="dist/zidian.js"></script>
```

npm 安装
```
npm install zidian
```

查看：<https://unpkg.com/zidian/>


汉字查询
```js
zidian.equalWord(key)

zidian.equalWord("爱").then(console.log)
```

词语查询
```js
zidian.equalCi(key)

zidian.equalCi("美丽").then(console.log)
```

成语查询
```js
zidian.equalIdiom(key)

zidian.equalIdiom("叶公好龙").then(console.log)
```

词语模糊搜索
```js
zidian.likeCi(key)

zidian.likeCi("美").then(console.log)
```

成语模糊搜索
```js
zidian.likeIdiom(key)

zidian.likeIdiom("三百").then(console.log)
```

### 说明
- 接口查询返回一个  `Promise`  对象
- 查询的接口会缓存到 `zidian.cache` 对象
- 查询无记录时，返回 `null`
- `zidian.config.host` 可配置请求源