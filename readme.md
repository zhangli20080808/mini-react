## react 18

[官方更新博客](https://zh-hans.reactjs.org/)

### 新的理念

Concurrent - 并发性，并不是一个新的特性，而是 react 内部衍生出来的一种新的工作机制

### 新的特性

1. 新的渲染 - Api createRoot
2. 自动批处理 - Automatic Batching
3. 过渡 Api - Transitions
4. Suspense Api

### start

```js
yarn create vite zl-mini-react --template react
cd zl-mini-react
yarn
yarn dev
```

### createRoot

```js
// 在特定的dom节点上，创建一个root对象
const root = createRoot(document.getElementById('root'));
// 使用 root 的render方法来渲染对应的组件或者卸载组件
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// root.unmount()
// ReactDOM.unmountComponentAtNode(root) 之前调用方法会卸载该容器中的渲染

// vue3
const app = createApp();
app.mount('#app');
app.unmount('#app');
```

### 自动批处理

```js

```

### 虚拟 dom 概念复习

1. what
   ⽤ JavaScript 对象表示 DOM 信息和结构，当状态变更的时候，重新渲染这个 JavaScript 的对象结构。这个 JavaScript 对象称为 virtual dom。

虚拟 DOM（Virtual DOM）是对 DOM 的 JS 抽象表示，它们是 JS 对象，能够描述 DOM 结构和关系。应用 的各种状态变化会作用于虚拟 DOM，最终映射到 DOM 上。

2. why？
   DOM 操作很慢，轻微的操作都可能导致⻚⾯重新排 版，⾮常耗性能。相对于 DOM 对象，js 对象处理起来更快， ⽽且更简单。通过 diff 算法对⽐新旧 vdom 之间的差异，可以 批量的、最⼩化的执⾏ dom 操作，从⽽提⾼性能。

3. where？
   react 中⽤ JSX 语法描述视图，通过 babel-loader 转译 后它们变为 React.createElement(...)形式，该函数将⽣成 vdom 来描述真实 dom。将来如果状态变化，vdom 将作出相 应变化，再通过 diff 算法对⽐新⽼ vdom 区别从⽽做出最终 dom 操作。
