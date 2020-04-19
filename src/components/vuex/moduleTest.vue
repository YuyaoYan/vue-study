<template>
  <div>
    <h5>模块化写法</h5>
    <div>冲啊，手榴弹扔了{{$store.state.a.count}}</div>
    <button @click="add">再扔一个</button>
    <div>{{$store.getters['a/score']}}</div>
    <button @click="addAsync">蓄力扔俩</button>
  </div>
</template>
<script>
export default {
  name: "vuex",
  methods: {
    add() {
      //修改状态用increment
      this.$store.commit("a/increment");
    },
    addAsync() {
      this.$store.dispatch("a/incrementAsync");
    }
  }
};
</script>