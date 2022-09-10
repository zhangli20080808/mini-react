## react 18

[官方更新博客](https://zh-hans.reactjs.org/)

### 新的理念

Concurrent - 并发性，并不是一个新的特性，而是 react 内部衍生出来的一种新的工作机制

### 新的特性

1. 新的渲染 - Api createRoot
2. 自动批处理 - Automatic Batching，特殊的优化机制
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

其实很好理解，在 react 中可以减少 re-render 的次数

```js
const [count, setCount] = useState(0);
const [show, setShow] = useState(true);
console.log('update', show, count);
const batchUpdate = () => {
  setCount(count + 1);
  setShow(!show);
};
useEffect(() => {
  setTimeout(() => {
    batchUpdate();
  }, 2000);
}, []);
// 在react 18中，自動批處理會合併更新，只會render一次
// update true 0
// update false 1 
// 在17中，會render兩次
// update true 0
// update false 0
// update fasle 1
```

### 虚拟 dom 概念复习

#### what

⽤ JavaScript 对象表示 DOM 信息和结构，当状态变更的时候，重新渲染这个 JavaScript 的对象结构。这个 JavaScript 对象称为 virtual dom。

虚拟 DOM（Virtual DOM）是对 DOM 的 JS 抽象表示，它们是 JS 对象，能够描述 DOM 结构和关系。应用 的各种状态变化会作用于虚拟 DOM，最终映射到 DOM 上。

#### why？

DOM 操作很慢，轻微的操作都可能导致⻚⾯重新排 版，⾮常耗性能。相对于 DOM 对象，js 对象处理起来更快， ⽽且更简单。通过 diff 算法对⽐新旧 vdom 之间的差异，可以 批量的、最⼩化的执⾏ dom 操作，从⽽提⾼性能。

#### where？

react 中⽤ JSX 语法描述视图，通过 babel-loader 转译 后它们变为 React.createElement(...)形式，该函数将⽣成 vdom 来描述真实 dom。将来如果状态变化，vdom 将作出相 应变化，再通过 diff 算法对⽐新⽼ vdom 区别从⽽做出最终 dom 操作。

#### 对比两个虚拟 dom 树一般也就三种操作

- 删除、替换、更新

### fiber 概念复习

fiber 本质上还是 vdom，只不过基础结构上发生了变化

#### why？

对于<strong>⼤型项⽬</strong>,<strong>组件树</strong> 会很⼤，这个时候<strong>递归</strong>遍历的 成本就会很⾼，会造成主线程被持续占⽤，结果就是 主线程上的布局、动画等周期性任务就⽆法⽴即得到 处理，造成视觉上的卡顿，影响⽤户体验。

#### 组件类型

- 文本节点
- Html 标签节点
- 函数组件
- 类组件

```jsx
const jsx = (
  <div className='box border'>
    <h1>omg</h1>
    <h2>ooo</h2>
    <FunctionComponent name='函数组件' />
    <ClassComponent name='class组件' />
  </div>
);
const jsxfiberNode = {
  child: {
    stateNode: 'div.box.border',
    tag: 5, // 原生标签 HostComponent
    child: {
      // 第一个子节点，此处是h1,之前传统的子节点都是存储在数组中
      // 如果后面还有节点，就通过 sibling
      stateNode: 'h1',
      tag: 5,
      sibling: {
        stateNode: 'h2',
        tag: 5,
        // 还有兄弟 函数组件
        sibling: {
          stateNode: null, // 函数组件本身没有dom节点
          tag: 0,
          sibling: {
            stateNode: 'ClassComponent', // 指向类组件的实力
            tag: 1,
            sibling: null, // 没有兄弟节点啦
            return: {
              // 父节点
              stateNode: 'div.box.border',
              tag: 5,
            },
          },
        },
      },
    },
  },
};
function createFiber(vnode, returnFiber) {
  const fiber = {
    type: vnode.type,
    key: vnode.key, // 常规key值
    props: vnode.props,
    stateNode: null, // 原生标签，指dom节点，类组件的时候，指向实例
    child: null, // 第一个子 fiber，也就是第一个子节点
    sibling: null, // 下一个兄弟fiber
    return: null, // 父fiber
    flags: null, // 标记是什么类型的,比如后续 插入，末尾移动等，标记
    alternate: null, // 老节点
    deletions: null, // 要删除子节点，null或者[]
    index: null, // 当前层级下的下标，从0开始，即 在当前层级下是第几个子节点，记录位置。主要是为了，比如上次更新在某个位置，下次更新在什么地方，位置有没有发生变化，需不需要移动，都是根据index来判断

    memoizedProps: {}, // 更新到组件上的值,
  };
  return fiber;
}
```
