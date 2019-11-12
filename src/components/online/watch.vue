<template>
  <div>
    <el-container>
    <el-header id="header">
      <span class="hideAside"></span>
      <ul class="personal">
        <li class="fullScreen" @click="fullScreen">
          <el-tooltip class="item" effect="dark" content="全屏" placement="bottom"><i
            class="fa fa-arrows-alt fa-lg el-icon-full-screen"></i></el-tooltip>
        </li>
        <li>
         
        </li>
       
        <li>
          <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    {{user_name}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="b">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="icon"><img :src="avatar"/></li>
      </ul>
    </el-header>
    </el-container>

    <el-container>
      <div class="aside">
      <el-aside width="240px">
        <div v-for="item in kindTableData" :key="item.categorys_id">
        <a @click="goCurriculums(item.categorys_id)">
        <i class="el-icon-reading"></i>
        <span>{{item.categorys_name}}</span>
        </a>
        </div>
      
      </el-aside>
      </div>
      <el-container>
       <el-main>
         <el-carousel  height="380px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>广告位招租</h3>
            </el-carousel-item>
        </el-carousel>
       </el-main>
      </el-container>
    </el-container>
    <el-container>
      <el-footer height="400px">
        <div><h1>推荐课程：</h1></div>
        <div class="videoDiv" v-for="item in curriculumsTableData" :key="item.curriculums_id">
          <a @click="goCourseWeaver(item.curriculums_id)">
            <div class="imageShow"></div>
            <div class="teacherShow">{{item.curriculums_user}}</div>
            <div class="contentShow">{{item.curriculums_content}}</div>
          </a>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kindTableData: [],
      curriculumsTableData: [],
      isfullScreen: true,
      avatar: "../static/images/icon.jpg",
      loginshow: true,
      user_name: "1"
    };
  },
  methods: {
    goCourseWeaver(curriculums_id) {
      sessionStorage.setItem("curriculums_id", curriculums_id);
      window.open("/weavers");
    },
    goCurriculums(categorys_id) {
      sessionStorage.setItem("categorys_id", categorys_id);
      window.open("/curriculum");
    },
    fullScreen() {
      if (this.isfullScreen) {
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
        this.isfullScreen = false;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        this.isfullScreen = true;
      }
    },
    handleCommand(command) {
      if (command === "logout") {
        this.$router.replace("/login");
      }
    }
  },
  mounted() {
    this.axios.post("/api/Kind/selectAllCategory").then(res => {
      this.kindTableData = res.data.data;
    });

    this.axios.post("/api/Curriculums/selectCurriculumsFive").then(res => {
      this.curriculumsTableData = res.data.data;
    });

    this.axios.post("/api/Login/selectSession").then(res => {
      this.user_name = res.data.data[0].user_name;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.teacherShow {
  margin: 30px 0 0 30px;
  color: black;
  font-size: 16px;
}

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
  background: url("./images/miao.jpg");
  background-size: 100% 100%;
  width: 236px;
  height: 136px;
}

.aside {
  height: 400px;
  background-color: black;
  margin: 10px 10px 10px 10px;
  border-radius: 4px;
}

.aside div {
  margin: 20px 0 0 30px;
}

.aside i {
  color: #333;
  text-align: left;
  color: white;
  font-size: 24px;
  text-align: center;
  padding: 0 20px 0 0;
}

.aside span {
  color: #333;
  text-align: center;
  color: white;
  font-size: 24px;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background: url("./images/ceshi2.jpg") no-repeat;
  background-size: 100% 100%;
  border-radius: 4px;
  text-align: center;
}

.el-carousel__item:nth-child(2n + 1) {
  background: url("./images/ceshi1.jpg") no-repeat;
  background-size: 100% 100%;
  border-radius: 4px;
  text-align: center;
}

.el-carousel__item h3 {
  color: white;
}

.personal {
  list-style: none;
}

$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: (
  $left,
  $right
);
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

html,
body,
#app,
.el-container,
#asideNav,
ul.el-menu {
  @extend %h100;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

#header {
  max-height: 50px;
  line-height: 60px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  .el-icon-s-operation {
    font-size: 30px;
  }
  .el-icon-full-screen {
    font-size: 25px;
  }
  .hideAside {
    @extend %cursor;
  }
  .personal {
    display: flex;
    flex-direction: row;
    li {
      @include set-value(margin, 13px);
      font-size: 12px;
    }
    .fullScreen {
      @extend %cursor;
    }
    .el-dropdown-link {
      @extend %cursor;
    }
    .icon img {
      margin-#{$top}: 7px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
