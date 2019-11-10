<template>
<div>

  <div>
    <el-button type="primary" icon="el-icon-circle-plus"  @click="add">添加权限</el-button>
 </div>

  <el-table
    :data="roleDate"
    style="width: 100%;margin-bottom: 20px;"
    row-key="power_id"
    border
    :tree-props="{children: 'listpower'}">
    <el-table-column
      prop="power_name"
      label="权限名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="power_url"
      label="权限地址"
      width="180">
    </el-table-column>
    <el-table-column
      prop="describe"
      label="权限描述">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>


   <el-dialog title="权限" :visible.sync="dialogFormVisible">
    <el-form @submit.native.prevent>

    <el-form-item label="权限名称:" label-width="120px">
      <el-input v-model="power_name" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="权限主目录:" label-width="120px">
      <el-select v-model="power_parentid" filterable  placeholder="请选择权限主目录">
        <el-option v-for="item in vagueRoleData" :key="item.power_id" :label="item.power_name" :value="item.power_id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="权限地址:" label-width="120px">
      <el-input v-model="power_url" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="权限描述:" label-width="120px">
      <el-input v-model="describe" auto-complete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="sure">确 定</el-button>
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
      roleDate: [],
      dialogFormVisible: false,
      vagueRoleData: [],
      power_parentid: "",
      power_name: "",
      power_url: "",
      describe: "",
      power_id: 0
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.power_name = row.power_name;
      this.power_url = row.power_url;
      this.describe = row.describe;
      this.power_id = row.power_id;
      if (row.power_parentid == 0) {
        this.power_parentid = "";
      } else {
        this.power_parentid = row.power_parentid;
      }
    },
    handleDelete(index, row) {
      this.axios
        .post(
          "/api/Power/updatePowerState",
          qs.stringify({
            power_id: row.power_id
          })
        )
        .then(res => {
          if (res.data.data == 1) {
            this.$message.success("删除权限成功");
            this.reload();
          } else {
            this.$message.error("删除权限失败");
          }
        });
    },
    add() {
      this.dialogFormVisible = true;
      this.power_name = "";
      this.power_parentid = "";
      this.power_url = "";
      this.describe = "";
      this.power_id = 0;
    },
    sure() {
      if (this.power_parentid == "") {
        this.power_parentid = 0;
      }

      if (this.power_id == 0) {
        this.axios
          .post(
            "/api/Power/insertPowerInformation",
            qs.stringify({
              power_name: this.power_name,
              power_parentid: this.power_parentid,
              power_url: this.power_url,
              describe: this.describe
            })
          )
          .then(res => {
            if (res.data.data == 1) {
              this.$message.success("插入权限成功");
              this.reload();
            } else {
              this.$message.error("插入权限失败");
            }
          });
      } else {
        this.axios
          .post(
            "/api/Power/updateRoleInformation",
            qs.stringify({
              power_name: this.power_name,
              power_parentid: this.power_parentid,
              power_url: this.power_url,
              describe: this.describe,
              power_id: this.power_id
            })
          )
          .then(res => {
            if (res.data.data == 1) {
              this.$message.success("修改权限信息成功");
              this.reload();
            } else {
              this.$message.error("修改权限信息失败");
            }
          });
      }
    }
  },
  mounted() {
    this.axios.post("/api/Power/selectAllPower").then(res => {
      this.roleDate = res.data.data;
    });
    this.axios.post("/api/Power/selectAllPowers").then(res => {
      this.vagueRoleData = res.data.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
