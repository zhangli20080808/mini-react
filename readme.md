## react 18 
[官方更新博客](https://zh-hans.reactjs.org/)
### 新的理念
Concurrent - 并发性，并不是一个新的特性，而是react内部衍生出来的一种新的工作机制
### 新的特性
1. 新的渲染 - Api createRoot
2. 自动批处理 - Automatic Batching
3. 过渡Api - Transitions
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
const app = createApp()
app.mount('#app')
app.unmount('#app')
```
### 自动批处理
```js

```