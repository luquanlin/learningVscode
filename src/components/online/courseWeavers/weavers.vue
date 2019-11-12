<template>
  <div>
    <div><h2>完整课件：</h2></div>
   <div class="videoDiv" v-for="item in courseTableData" :key="item.coursewares_id">
      <a @click="goCourseWeaver(item.coursewares_url)">
        <div class="imageShow"></div>
        <div class="contentShow">{{item.coursewares_name}}</div>
      </a>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      curriculums_id: 0,
      courseTableData: []
    };
  },
  methods: {
    goCourseWeaver(coursewares_url) {
      window.open(coursewares_url);
    }
  },
  mounted() {
    this.curriculums_id = sessionStorage.getItem("curriculums_id");

    this.axios
      .post(
        "/api/Coursewares/selectCurriculumsIdCourseWares",
        qs.stringify({
          curriculums_id: this.curriculums_id
        })
      )
      .then(res => {
        this.courseTableData = res.data.data;
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
