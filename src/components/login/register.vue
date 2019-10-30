<template>
  <div id="login">
    <div class="loginConbox">
      <div class="header-register">
        <!--<div class="logo">-->
        <!--<img src="../../assets/logo.png">-->
        <!--</div>-->
      </div>
      <div class="loginBox-register">
        <div class="loginCon">
          <p class="title">在线学习注册界面</p>
          <p class="title">欢迎你的加入</p>
          <el-card shadow="always" class="login-module-register">
            <div slot="header" class="clearfix formTitlt">
              <span>账号注册</span>
            </div>
            <el-form status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item>
                <el-input v-model="user_name" type="text" auto-complete="off" placeholder="请输入昵称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="user_account" type="text" auto-complete="off" placeholder="请输入账号" @blur="account"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="user_password" type="password" auto-complete="off" placeholder="请输入登录密码" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="confirm_user_password" type="password" auto-complete="off" placeholder="请再次输入登录密码" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-radio v-model="user_radio" label="男">男</el-radio>
                <el-radio v-model="user_radio" label="女">女</el-radio>
              </el-form-item>
              <el-form-item>
                <el-button class="subBtn" type="primary" @click="submitForm" :disabled="registerSub">注册</el-button>
              </el-form-item>
              <p class="smalltxt">
                <router-link class="a" to="login">已有账号，开始登陆</router-link>
              </p>
            </el-form>
          </el-card>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
      return {
        user_name: '',
        user_account:'',
        user_password: '',
        user_radio: '男',
        confirm_user_password:'',
        registerSub:false
      };
  },
  methods: {
    submitForm () {
      let that = this
     
      if (this.user_name === '' || this.user_account === '' || this.user_password === '' || this.confirm_user_password === '') {
        this.$message.error('请将信息填写完整');
        return false
      } else if(this.user_password != this.confirm_user_password){
        this.$message.error('输入的两次密码不同');
        return false
      }else{
        var url = "/api/Login/insertUser"
        
        this.axios.post(url,qs.stringify({
          'user_name':this.user_name,
          'user_account':this.user_account,
          'user_password':this.user_password,
          'user_sex':this.user_radio
        })
        ).then((res)=>{
          if (res.data.data == 1) {
            this.$message({
              message: '注册用户成功',
              type: 'success'
            });
             this.$router.replace('/login')
          } else {
            this.$message.error('注册用户失败');
          }
         
        })
       
      }
    },
    account(){
      var url = "/api/Login/selectUserAccount"
      this.axios.post(url,qs.stringify({
        'user_account':this.user_account
      })
      ).then((res)=>{
        if(res.data.data == 1){
           this.$message.error('该账号已被注册');
           this.registerSub=true
        }else{
          this.registerSub=false
        }
      })
    }
  },
  
}
</script>
<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  .loginConbox {
    background: #2d3a4b;
  }
  .header-register {
    height: 10px;
    position: relative;
    background: #2d3a4b;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
    .logo {
      margin-left: 30px;
      width: 500px;
      float: left;
      height: 40px;
      padding-top: 10px;
      img {
        height: 100%;
      }
    }
  }

  .loginBox-register {
    .iconcolor {
      color: #409eff;
    }

    padding: 20px 0 118px;

    .loginCon {
      width: 990px;
      margin: auto;
      position: relative;
      height: 388px;

      .el-card__header {
        border-bottom: 0px;
      }
      .title {
        font-size: 36px;
        font-weight: 600;
        color: #ffffff;
        width: 500px;
        float: left;
        margin-top: 0px;
        &:first-child {
          font-size: 34px;
          margin-top: 50px;
          margin-bottom: 30px;
        }
      }
      .login-module-register {
        width: 380px;
        height: 500px;
        margin-top: 60px;
        border: none;
        position: absolute;
        right: 0;

        .formTitlt {
          font-size: 18px;
          font-weight: 400;

          .titIconbox {
            float: right;

            .pointer {
              cursor: pointer;
            }
          }
        }

        .smalltxt {
          text-align: right;

          .a {
            text-decoration: none;
            color: #999999;
            font-size: 12px;
            margin-left: 8px;
          }
        }
      }

      .el-form-item__content {
        margin-left: 0px !important;

        .subBtn {
          width: 100%;
        }
      }
    }

    .el-input__inner,
    .el-button,
    .el-card,
    .el-message {
      border-radius: 0px !important;
    }

    .el-form-item__content .ico {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 999;
      width: 40px;
      height: 39px;
      text-align: center;
      border-right: 1px solid #ccc;
    }

    .ewmbox {
      width: 100%;
      height: 240px;
      margin-top: -25px;

      .ewm {
        width: 140px;
        height: 140px;
        margin: 20px auto;

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }

      .ewmicon {
        width: 140px;
        margin: 20px auto 0;

        .iconfont {
          float: left;
        }

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }
    }
  }
}
</style>
