
# vue3.0-infinite-scroll

## 介绍
vue3.0无限滚动加载
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

# 指令

| 指令名称 | 说明                 | 回调参数                | 版本 |
| -------- | -------------------- | ----------------------- | ---- |
| v-infinite-scroll    | 指令，执行滚动触发的事件 | () => void | -    |


## 使用示例

### 注册指令

```js
app.use(infiniteScroll).mount('#app')
```

### 在组件中使用
```html
<div
  class="poster-list-lis"
  v-infinite-scroll="handleInfiniteOnLoad"
  :infinite-scroll-immediate-check="false"
  :infinite-scroll-disabled="scrollDisabled"
  :infinite-scroll-distance="20">
</div>
```

```js
setup(props, context) {
  const handleInfiniteOnLoad = () => {
    // 异步加载数据等逻辑
  }
  const scrollDisabled = computed(() => props.renderDataList.length >= props.listCount)
  return {
    scrollDisabled,
    handleInfiniteOnLoad
  }
}
```