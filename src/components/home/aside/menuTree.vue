<template>
  <div >

    <template>
      <label :data="data" v-for="(item, index) in data" :key="item.power_id">
      <el-submenu :index="String(item.power_id)" >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.power_name}}</span>
        </template> 
         <label  v-for="items in item.listpower" :key="items.power_id">
            <el-menu-item :index="String(items.power_id)">{{items.power_name}}</el-menu-item>
         </label>
      </el-submenu>
      </label>
    </template>

  </div>
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
   
  }
}
</script>

<style scoped>
</style>
