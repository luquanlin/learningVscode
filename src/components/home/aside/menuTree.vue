<template>
  <fragment>

  <template v-for="item in menu">
  
      <el-menu-item  :key="item.power_id" :index="String(item.power_id)" @click="goto(item.power_url)"  v-if="item.listpower == null">
        <template slot="title"> 
          <span slot="title">{{item.power_name}}</span>
        </template> 
      </el-menu-item>

      <el-submenu  :key="item.power_id" :index="String(item.power_id)"  v-if="item.listpower" >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.power_name}}</span>
        </template>
          <menuTree :menu="item.listpower"></menuTree>
      </el-submenu>
   
  </template>
  </fragment>

</template>

<script>
export default {
  name:"menuTree",
  props:['menu'],
  data(){
    return{
      data:[]
    }
    
  },
 
  methods:{
    goto(path){
      this.$router.replace(path)
    }
  }
}
</script>

<style scoped>
</style>
