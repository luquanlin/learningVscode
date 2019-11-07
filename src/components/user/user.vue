<template>

  <div>

    <div>

      
      <el-input v-model="userVageName" style="width:280px" placeholder="请输入用户昵称" @change="selectRole"></el-input>
    
    

      <el-button type="primary" icon="el-icon-circle-plus"  @click="add">添加角色</el-button>
    </div>
    
  <el-table
    :data="userTableData"
    style="width: 100%"
    border>
    <el-table-column
      label="序号"
      type="index"
      width="100"
      sortable
      :index="indexMethod"
      align="center">
    </el-table-column>
    <el-table-column
      label="用户昵称"
      prop="user_name"
      align="center">
    </el-table-column>
    <el-table-column
      label="用户性别"
      prop="user_sex"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      label="用户账号"
      prop="user_account"
      align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          @click="handePassword(scope.$index, scope.row)">初始化密码</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="角色" :visible.sync="dialogFormVisible">
    <el-form @submit.native.prevent label-width="80px" >
      <el-form-item label="用户昵称:" >
        <el-input v-model="user_name" @blur="account"></el-input>
      </el-form-item>

      <el-form-item label="用户账号:" >
        <el-input v-model="user_account"></el-input>
      </el-form-item>

    <el-form-item label="用户性别:">
        <el-radio-group v-model="user_sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="用户角色:">
    <el-checkbox-group v-model="type" >
      <el-checkbox v-for="UserRoleDate in roleDate" :key="UserRoleDate.role_id" :label="UserRoleDate.role_id">
        {{UserRoleDate.role_name}}
      </el-checkbox>
    </el-checkbox-group>
    </el-form-item>
   
    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="userSure" :disabled="registerSub">确 定</el-button>
  </div>
  </el-dialog>

  </div>

</template>

<script>
import qs from "qs";
export default {
  inject: ["reload"],
  data() {
    return {
      index: 1,
      userTableData: [],
      dialogFormVisible: false,
      user_name: "",
      user_account: "",
      user_sex: "男",
      role_name: [],
      roleDate: [],
      user_id: 0,
      role: [],
      type: [],
      userVageName: "",
      ifAccount: false,
      registerSub: false
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleEdit(index, row) {
      this.ifAccount = false;
      this.dialogFormVisible = true;
      this.user_name = row.user_name;
      this.user_account = row.user_account;
      this.user_sex = row.user_sex;
      this.user_id = row.user_id;

      this.axios.post("/api/Role/selectAllRole").then(res => {
        this.roleDate = res.data.data;
      });

      this.axios
        .post(
          "/api/User/selectUserIdRole",
          qs.stringify({
            user_id: row.user_id
          })
        )
        .then(res => {
          if (res.data.data == 0) {
            this.type = [];
          } else {
            this.type = res.data.data;
          }
        });
    },
    handePassword(index, row) {
      this.axios
        .post(
          "/api/User/updateUserPassword",
          qs.stringify({
            user_id: row.user_id
          })
        )
        .then(res => {
          if (res.data.data == 1) {
            this.$message.success("初始化密码成功");
            this.reload();
          } else {
            this.$message.error("初始化密码失败");
          }
        });
    },
    handleDelete(index, row) {
      this.axios
        .post(
          "/api/User/updataUserState",
          qs.stringify({
            user_id: row.user_id
          })
        )
        .then(res => {
          if (res.data.data == 1) {
            this.$message.success("删除用户成功");
            this.reload();
          } else {
            this.$message.error("删除用户失败");
          }
        });
    },
    userSure() {
      var rids = this.type.join(",");

      if (this.user_name == "" || this.user_account == "" || rids == "") {
        this.$message.error("请填写完整信息");
      } else {
        if (this.user_id == 0) {
          this.axios
            .post(
              "/api/User/insertUserInformation",
              qs.stringify({
                user_name: this.user_name,
                user_account: this.user_account,
                user_sex: this.user_sex,
                roles: rids
              })
            )
            .then(res => {
              if (res.data.data == 1) {
                this.$message.success("插入用户信息成功");
                this.reload();
              } else {
                this.$message.error("插入用户信息失败");
              }
            });
        } else {
          this.axios
            .post(
              "/api/User/updateUserInformation",
              qs.stringify({
                user_name: this.user_name,
                user_account: this.user_account,
                user_sex: this.user_sex,
                user_id: this.user_id,
                roles: rids
              })
            )
            .then(res => {
              if (res.data.data == 1) {
                this.$message.success("修改用户信息成功");
                this.reload();
              } else {
                this.$message.error("修改用户信息失败");
              }
            });
        }
      }
    },
    selectRole() {},
    add() {
      this.dialogFormVisible = true;
      this.user_account = "";
      this.user_name = "";
      this.user_id = 0;
      this.type = [];
      this.ifAccount = true;
      this.axios.post("/api/Role/selectAllRole").then(res => {
        this.roleDate = res.data.data;
      });
    },
    account() {
      if (this.ifAccount) {
        var url = "/api/Login/selectUserAccount";
        this.axios
          .post(
            url,
            qs.stringify({
              user_account: this.user_account
            })
          )
          .then(res => {
            if (res.data.data == 1) {
              this.$message.error("该账号已被注册");
              this.registerSub = true;
            } else {
              this.registerSub = false;
            }
          });
      }
    }
  },
  mounted() {
    this.axios.post("/api/User/selectUsersRole").then(res => {
      this.userTableData = res.data.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
