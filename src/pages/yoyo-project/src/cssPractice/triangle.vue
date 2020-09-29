<template>
  <div class="triangle-container">
    <!-- <div class="rotate"></div> -->
    <div :class="classList" @click="addRotate">
      <a href="#"></a>
    </div>
  </div>
</template>
<script>
export default {
  name: "triangle",
  data() {
    return {
      classList: "",
    };
  },
  methods: {
    addRotate() {
      this.classList = "two trans";
    },
  },
};
</script>
<style>
.triangle-container{
  border: 1px solid black;
}
.two {
  margin-top: 0;
  width: 14px;
}
a {
  text-decoration: none;
}

/*使用伪元素a:after*/
/*可以再制作一个与背景色相同的三角利用定位覆盖  制作方法一的效果*/
a:after {
  content: "";
  display: inline-block;

  /*利用边框boeder设置*/
  border: 5px solid transparent;
  border-top-color: #ad2c2c;

  position: relative; /*微调位置*/
  top: 5px;
  left: 1px;

  width: 0;
  height: 0;
}

.rotate {
  width: 100px;
  height: 100px;
  margin: 100px;
  background: pink;
  border: 5px solid transparent;
  border-top-color: blue;
  display: block;
  /* animation: name duration timing-function delay iteration-count direction fill-mode play-state;  */
  animation: rotate 0.5s linear 1 forwards;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg); /*从0度开始*/
  }
  100% {
    /* background: red; */
    transform: rotateZ(90deg); /*结束*/
  }
}

.trans {
  animation: rotate 0.5s linear 1 forwards;
}
</style>