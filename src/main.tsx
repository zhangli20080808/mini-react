import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// 在特定的dom节点上，创建一个root对象
const root = createRoot(document.getElementById('root') as any);
// 使用 root 的render方法来渲染对应的组件或者卸载组件
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// root.unmount()
