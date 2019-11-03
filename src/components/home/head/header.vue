<template>
  <div>
    <el-header id="header">
      <span class="hideAside" @click="collapse" isLogin="loginshow"><i class="el-icon-s-operation"></i></span>
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
    <!-- <tabNav></tabNav> -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isfullScreen: true,
        avatar: '../static/images/icon.jpg',
        loginshow:true,
        user_name:'1',
      }
    },
    methods: {
      collapse () {
        // this.$store.dispatch('collapse')
        if(this.loginshow){
          
          this.loginshow=false
          
        }else{
       
          this.loginshow=true
          
        }
        console.log(this.loginshow)
        this.$store.commit('collapse',this.loginshow)
        
      },
      fullScreen () {
        if (this.isfullScreen) {
          var docElm = document.documentElement
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen()
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen()
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen()
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen()
          }
          this.isfullScreen = false
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
          this.isfullScreen = true
        }
      },
       handleCommand (command) {
        if (command === 'logout') {
         this.$router.replace('/login')
        }
      }

    },
    mounted(){
      this.axios.post("/api/Login/selectSession").then((res)=>{
        console.log(res.data.data[0].user_name)
        this.user_name = res.data.data[0].user_name
      })
    }
  }
</script>
<style lang="scss" scoped>



</style>
<style lang="scss">
  $top: top;
  $bottom: bottom;
  $left: left;
  $right: right;
  $leftright: ($left, $right);
  %w100 {
    width: 100%;
  }

  %h100 {
    height: 100%;
  }

  %cursor {
    cursor: pointer;
  }

  html, body, #app, .el-container, #asideNav, ul.el-menu {
    @extend %h100;
  }

  @mixin set-value($side, $value) {
    @each $prop in $leftright {
      #{$side}-#{$prop}: $value;
    }
  }

  #header {
    max-height: 50px;
    line-height: 50px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    display: flex;
    justify-content: space-between;
    .el-icon-s-operation{
      font-size:30px;
    }
    .el-icon-full-screen{
      font-size:25px;
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
