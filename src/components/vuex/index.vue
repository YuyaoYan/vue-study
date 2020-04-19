<template>
  <div>
    <div>冲啊，手榴弹扔了{{$store.state.count}}</div>
    <button @click="add">再扔一个</button>
    <div>{{$store.getters.score}}</div>
    <button @click="addAsync">蓄力扔俩</button>
  </div>
</template>
<script>
export default {
  name: "vuex",
  methods: {
    add() {
      //修改状态用increment
      this.$store.commit("increment");
    },
    addAsync() {
      this.$store.dispatch("incrementAsync");
    }
  }
};
</script>