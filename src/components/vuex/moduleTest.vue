<template>
  <div>
    <h5>模块化写法</h5>
    <div>冲啊，手榴弹扔了{{$store.state.b.count}}</div>
    <button @click="add">再扔一个</button>
    <div>{{$store.getters['b/score']}}</div>
    <button @click="addAsync">蓄力扔俩</button>
    <div>
      <input type="text" @blur="updateValue" :value="$store.state.b.input" />
      {{`---${$store.state.b.input || "value of input"}`}}
    </div>
  </div>
</template>
<script>
export default {
  name: "vuex",
  methods: {
    add() {
      //修改状态用increment
      this.$store.commit("b/increment");
    },
    updateValue(e) {
      this.$store.commit("b/updateValue", { val: e.target.value, key: "input" });
    },
    addAsync() {
      this.$store.dispatch("b/incrementAsync");
    }
  }
};
</script>