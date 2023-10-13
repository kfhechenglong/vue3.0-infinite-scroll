<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <a href="https://kfhechenglong.github.io/blog/" target="_blank" rel="noopener"
        >点击查看更多前端知识文档</a
      >.
    </p>
    <h3>试着滚动下面列表</h3>
    <div
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-immediate-check="immediateCheck"
      :infinite-scroll-disabled="scrollDisabled"
      infinite-scroll-watch-disabled="scrollDisabled"
      :infinite-scroll-distance="20"
      class="ul-lis"
    >
      <ul>
        <li v-for="(item, index) in list" :key="index">
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
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
interface Item {
  url: string,
  name: string
}
export default defineComponent({
  name: "ListComp",
  setup () {
    const scrollDisabled = ref(false);
    const immediateCheck = ref(true);
    const initList:Item[] = [
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/工具/wx-pc-dev.md',
        name: '微信、企微PC端页面调试'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/cli/README.md',
        name: '脚手架搭建'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/other/fullCalendar/README.md',
        name: '日程组件'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/uitls/format-date/README.md',
        name: '生日年龄转换'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/uitls/千分位.md',
        name: '千分位'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/uitls/exportFiles.md',
        name: '文件导出'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/Pinia/核心概念/README.md',
        name: '核心概念-States'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/Pinia/核心概念/Getters.md',
        name: '核心概念-Getters'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/Pinia/核心概念/Actions.md',
        name: '核心概念-Actions'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/Pinia/核心概念/Plugins.md',
        name: '核心概念-Plugins'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/Pinia/操作指引/README.md',
        name: '操作指引'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/vue核心原理/图解vue3.0编译器核心原理.md',
        name: '图解vue3.0编译器核心原理'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/design-mode/single.md',
        name: '单例模式'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/design-mode/2.策略模式/README.md',
        name: '策略模式'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/design-mode/3.代理模式/README.md',
        name: '代理模式'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/design-mode/4.迭代器模式/README.md',
        name: '迭代器模式'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/design-mode/5.发布订阅模式/README.md',
        name: '发布订阅模式'
      },
      {
        url: 'https://github.com/kfhechenglong/blog/blob/master/docs/design-mode/6.命令模式/1.命令模式实现菜单管理.md',
        name: '命令模式'
      },
    ];
    const initPage = ref(1);
    const list:Item[] = reactive([])
    const handleInfiniteOnLoad = () => {
      if (list.length >= initList.length) {
        // 数据加载完毕
        console.log('数据加载完毕')
        scrollDisabled.value = true
        alert('数据加载完毕')
      } else {
        for (let i = list.length; i < initPage.value * 5 && i < initList.length; i++) {
          list.push(initList[i])
        }
        initPage.value++
        console.log(initPage.value)
      }
    }
    return {
      list,
      immediateCheck,
      scrollDisabled,
      handleInfiniteOnLoad
    }
  },
  props: {
    msg: String,
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.ul-lis {
  height: 200px;
  overflow-y: auto;
  width: 500px;
  margin: 0 auto;
  background-color: #f2f2f2;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 20px 10px;
}
a {
  color: #42b983;
}
</style>
