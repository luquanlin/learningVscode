<template>

  <div>
    
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
    <el-table-column
      label="用户角色"
      prop="role_name"
      width="120"
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
  </div>

</template>

<script>
import qs from "qs";
export default {
  inject: ["reload"],
  data() {
    return {
      index: 1,
      userTableData: []
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleEdit(index, row) {},
    handePassword(index, row) {
      this.axios.post("/api/User/updateUserPassword",qs.stringify({
        user_id:row.user_id
      })).then((res)=>{
        if (res.data.data == 1) {
            this.$message.success("初始化密码成功");
            this.reload();
          } else {
            this.$message.error("初始化密码失败");
          }
      })
    },
    handleDelete(index, row) {}
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
