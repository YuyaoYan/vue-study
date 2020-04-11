import Vue from "vue";

export default function(Components, props) {
  const vm = new Vue({
    render(createElement) {
      //createElement返回VNode，返回一个虚拟dom
      return createElement(Components, { props });
    }
  }).$mount();
  //render创建虚拟dom，mount创建真实dom

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
