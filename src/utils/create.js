import Vue from "vue";
// Component vs comp
// Component: 组件配置，js对象
// comp:组件实例
// Vue.extend(Component) => function 组件构造函数
// Vue.component('comp', Component) 全局注册组件
// create把传递的组件配置转换为组件实例返回
export default function(Components, props) {
  // 先创建vue实例，用它创建组件实例
  const vm = new Vue({
    render(createElement) {
      //createElement返回VNode，返回一个虚拟dom
      return createElement(Components, { props });
    }
  }).$mount();
  //render创建虚拟dom，mount创建真实dom
  // $mount里面会调render生成VNode，生成的VNode会执行update函数生成DOM

  //手动挂载
  //$el是，只要执行new Vue，就会有对应的$el，虚拟dom与实体dom是对应的
  document.body.appendChild(vm.$el);

  //销毁方法
  const comp = vm.$children[0];
  comp.remove = function() {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  return comp;
}
