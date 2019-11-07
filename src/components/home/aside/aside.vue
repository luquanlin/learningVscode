<template>
  <div>
    <el-aside id="asideNav">
      <div class="logo-name">
        <p v-if="this.$store.state.loginshow">学习</p>
        <p v-else>在线学习系统后台管理</p>
      </div>
      <el-menu class="el-menu-vertical" 
               @open="handleOpen" 
               @close="handleClose" 
               :collapse="this.$store.state.loginshow"
               background-color="#03152A"
               text-color="rgba(255,255,255,.7)"
               active-text-color="#ffffff"
      >
        <menuTree :menu="treeDate"></menuTree>
      </el-menu>
    </el-aside>

  </div>
</template>

<script>
import menuTree from './menuTree'
export default {
  data () {
    return {
      treeDate:[]
    }
  },
  components: {
    menuTree
  },
  methods: {
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
   mounted(){
    var url = '/api/Power/selectUserPower'
        this.axios.post(url).then((res)=>{
          
          this.treeDate = res.data.data
          
        }).catch((error)=>{
          console.log("error:"+error)
        })
   
  },
}
</script>

<style lang="scss">
$top: top;
$bottom: bottom;
$left: left;
$right: right;
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

#asideNav {
  width: auto !important;
  display: flex;
  flex-direction: column;
  border-right: solid 1px #e6e6e6;
  .logo-name {
    background-color: #03152a !important;
    @extend %w100;
    font-weight: 300;
    z-index: 999;
    p {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      color: #5e6d82;
    }
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    @extend %h100;
    overflow-y: scroll;
  }
  .el-menu {
    flex: 1;
    overflow: inherit;
    border-right: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .fa {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
    .el-menu-item {
      background-color: #020f1d !important;
      border-bottom: 1px solid #020f1d;
      &:hover {
        color: #ffffff !important;
        background-color: #375573 !important;
      }
    }
    .el-menu-item.is-active {
      background-color: #56a9ff !important;
    }
    .is-opened > .el-submenu__title > .el-icon-arrow-down {
      color: #ffffff;
      font-weight: 500;
      font-size: 18px;
    }
  }
}
</style>
