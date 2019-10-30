<template>
  <div class="CopClass">
    <h1>{{ msg }}</h1>
    <h2>Element UI Button</h2>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text">文字按钮</el-button>
    <el-button type="primary" @click="login">登陆</el-button>
  </div>

</template>

<script>
  export default{
    name:'CopName',
    data() {
      return {
        msg: 'Hello Element UI'
      }
    },
    methods:{
      login:function(){
        var url = "/api/Login/selectUserLogin?user_account=13696442768&&user_password=123456"
        this.axios.post(url).then((res)=>{
          console.log(res.data.data)
          console.log("成功")
        }).catch((error)=>{
           console.log("失败")
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#ceshhi{
  font-size:36px;
}
</style>
