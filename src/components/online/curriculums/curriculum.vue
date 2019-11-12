<template>
  <div>
    <div><h2>完整课程：</h2></div>
    <div class="videoDiv" v-for="item in curriculumsTableData" :key="item.curriculums_id">
          <a @click="goCourseWeaver(item.curriculums_id)">
            <div class="imageShow"></div>
            <div class="teacherShow">{{item.curriculums_user}}</div>
            <div class="contentShow">{{item.curriculums_content}}</div>
          </a>
        </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      categorys_id: 0,
      curriculumsTableData: []
    };
  },
  methods: {
    goCourseWeaver(curriculums_id){
      sessionStorage.setItem("curriculums_id", curriculums_id);
      window.open("/weavers")
    },
  },
  mounted() {
    this.categorys_id = sessionStorage.getItem("categorys_id");

    this.axios
      .post(
        "/api/Curriculums/selectCategorysIdCurriculums",
        qs.stringify({
          categorys_id: this.categorys_id
        })
      )
      .then(res => {
        this.curriculumsTableData = res.data.data;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.contentShow {
  margin: 30px 0 0 30px;
  color: black;
  font-size: 16px;
}

 .teacherShow{
    margin: 30px 0 0 30px;
    color: black;
    font-size: 16px;
  }

.videoDiv {
  background-color: #fffafa;
  width: 236px;
  height: 270px;
  float: left;
  margin: 0 30px 0 0;
}

.imageShow {
  background: url("../images/miao.jpg");
  background-size: 100% 100%;
  width: 236px;
  height: 136px;
}
</style>
