<template>
  <div id="home">
    <el-container>
      <layoutAside></layoutAside>
      <el-container>
        <layoutHeader></layoutHeader>
        <el-main id="elmain">
          <transition name="main" mode="out-in">
            <router-view v-if="isRouterAlive"></router-view>
          </transition>
        </el-main>
        <el-footer>
          <Bottom></Bottom>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutAside from "./aside/aside";
import layoutHeader from "./head/header";
import Bottom from "./footer/bottom";

export default {
  components: {
    layoutAside,
    layoutHeader,
    Bottom
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
.main-enter,
.main-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.main-enter-active {
  transition: all 0.2s;
}
.main-leave-active {
  position: absolute;
  transition: all 0.3s;
}
</style>
<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

body {
  background-color: #f2f2f2;
  font-size: 14px;
  color: #333333;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
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
#home,
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
#elmain {
  background-color: #f0f2f5;
}
</style>
