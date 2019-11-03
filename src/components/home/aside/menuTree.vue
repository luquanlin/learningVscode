<template>
  <div >

    <template>
      <label :data="data" v-for="item in data" :key="item.power_id">
      <el-submenu :index="String(item.power_id)" >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.power_name}}</span>
        </template> 
         <label  v-for="items in item.listpower" :key="items.power_id">
            <el-menu-item :index="String(items.power_id)" @click="goto(items.power_url)">{{items.power_name}}</el-menu-item>
         </label>
      </el-submenu>
      </label>
    </template>

  </div>

  <!-- <div >

    <template>
      
      <el-submenu index="1" >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">系统管理</span>
        </template> 
         
            <el-menu-item :index="1" @click="goto('/role')">角色管理</el-menu-item>
            <el-menu-item :index="2" @click="goto('/user')">用户管理</el-menu-item>
   
      </el-submenu>

    </template>

  </div> -->
</template>

<script>
export default {
  data(){
    return{
      data:[]
    }
    
  },
  mounted(){
    var url = '/api/Power/selectUserPower'
        this.axios.post(url).then((res)=>{
          console.log("data:"+res.data.data[0].power_name)
          this.data = res.data.data
        }).catch((error)=>{
          console.log("error:"+error)
        })
   
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
