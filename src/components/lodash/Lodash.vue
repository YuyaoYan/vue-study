<template>
  <div></div>
</template>
<script>
import mockobj from "./json";
export default {
  data() {
    return {
      complicatedObj: {},
      complicatedArr: [
        {
          owner: "Colin",
          pets: [{ name: "dog1" }, { name: "dog2" }]
        },
        {
          owner: "John",
          pets: [{ name: "dog3" }, { name: "dog4" }]
        }
      ]
    };
  },
  created() {
    this.lodash();
  },
  methods: {
    lodash() {
      console.log("lodash page begin.");
      let _ = require("lodash");

      _.times(5, a => {
        console.log(a);
      });

      let total = {
        chx: {},
        hyx: {},
        jcx: {},
        qyccx: {},
        dqjkx: {},
        dqywx: {},
        grsx: {},
        zrx: {},
        cbx: {},
        mzx: {},
        gzzrx: {}
      };

      for (var type in mockobj.map.value) {
        // enterprise or personal
        for (var lib in mockobj.map.value[type]) {
          // qdgbjj qdgbjj1 or sum
          let libObj = [];
          for (var monOrYear in mockobj.map.value[type][lib]) {
            // month or year
            mockobj.map.value[type][lib][monOrYear].forEach((item, index) => {
              // each item in monOrYear
              let path = `map.value[${type}][${lib}][${monOrYear}][${index}]`;
              total[
                mockobj.map.value[type][lib][monOrYear][index].reportCode
              ] &&
                Object.assign(
                  total[
                    mockobj.map.value[type][lib][monOrYear][index].reportCode
                  ],
                  this.catgray(lib, path)
                );
              console.log("reportName", total);
            });
          }
        }
      }
    },
    catgray(lib, path) {
      let obj = {};
      if ("qdgbjj" == lib) {
        //4个
        obj.qdgbjj_current_month_premium = _.get(mockobj, `${path}.premium`);
        obj.qdgbjj_current_month_growthValue = _.get(
          mockobj,
          `${path}.growthValue`
        );
      } else if ("qdgbjj1" == lib) {
        //4个
        obj.qdgbjj1_current_month_premium = _.get(mockobj, `${path}.premium`);
        obj.qdgbjj1_current_month_growthValue = _.get(
          mockobj,
          `${path}.growthValue`
        );
      } else if ("sum" == lib) {
        debugger;

        //6个
        obj.sum_current_month_premium = _.get(mockobj, `${path}.premium`);
        obj.sum_current_month_growthValue = _.get(
          mockobj,
          `${path}.growthValue`
        );
      }
      return obj;
    }
  }
};
</script>