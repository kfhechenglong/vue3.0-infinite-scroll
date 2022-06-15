
# vue3.0-infinite-scroll

## 介绍
vue3.0无限滚动加载插件

### 演示地址>>>[demo](https://kfhechenglong.github.io/vue3.0-infinite-scroll/dist/index.html)
# Install
```
npm install vue3.0-infinite-scroll --save
```

# API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| infinite-scroll-throttle-delay | 滚动延迟 | number | 200 |  |
| infinite-scroll-disabled | 是否禁止 | boolean | false |  |
| infinite-scroll-distance | 滚动条距离底部的距离 | number | 0 |  |
| infinite-scroll-immediate-check | 是否立即触发滚动 | boolean | true |  |
| infinite-scroll-watch-disabled | 与`infinite-scroll-disabled`绑定的对应值 | string | null

# 指令

| 指令名称 | 说明                 | 回调参数                | 版本 |
| -------- | -------------------- | ----------------------- | ---- |
| v-infinite-scroll    | 指令，执行滚动触发的事件 | () => void | -    |


## 使用示例

### 注册指令

```js
import infiniteScroll from 'vue3.0-infinite-scroll'
app.use(infiniteScroll).mount('#app')
```

### 在组件中使用
```html
<div
  class="list-lis"
  v-infinite-scroll="handleInfiniteOnLoad"
  :infinite-scroll-immediate-check="false"
  :infinite-scroll-disabled="scrollDisabled"
  infinite-scroll-watch-disabled="scrollDisabled"
  :infinite-scroll-distance="20">
  <ul>
    <li v-for="(item, index) in renderDataList" :key="index">
      <a
        :href="item.url"
        target="_blank"
        rel="noopener"
        >{{index + 1}}、{{item.name}}</a
      >
    </li>
    <div v-if="scrollDisabled">数据加载完毕</div>
  </ul>
</div>
```

```js
setup(props, context) {
  const renderDataList = [] // 数据列表
  const listCount = 50
  const handleInfiniteOnLoad = () => {
    // 异步加载数据等逻辑
    if (scrollDisabled) {
      // 数据加载完毕
    } else {
      // 加载数据列表
    }
  }
  const scrollDisabled = computed(() => renderDataList.length >= listCount)
  return {
    scrollDisabled,
    renderDataList,
    handleInfiniteOnLoad
  }
}
```