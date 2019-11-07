<template>

  <div>
    <div>
    <el-select v-model="region" filterable  placeholder="请选择角色名称" @change="selectRole()">
    
        <el-option v-for="item in vagueData" :key="item.role_id" :label="item.role_name" :value="item.role_name"></el-option>

    </el-select>
      <el-button type="primary" icon="el-icon-circle-plus"  @click="add">添加角色</el-button>
    </div>



  <el-table
    :data="tableData"
    style="width: 100%"
    border>
    <el-table-column
      label="序号"
      type="index"
      width="200"
      sortable
      :index="indexMethod"
      align="center">
    </el-table-column>
    <el-table-column
      label="角色"
      prop="role_name"
      align="center">
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

  <el-dialog title="角色" :visible.sync="dialogFormVisible">
    <el-form @submit.native.prevent>
    <el-form-item label="角色名称" :label-width="formLabelWidth">
      <el-input v-model="role_name" auto-complete="off"></el-input>
    </el-form-item>
    <el-tree
      :data="roleDate"
      show-checkbox
      node-key="power_id"
      :default-checked-keys="allPower_id"
      :props="defaultProps"
      ref="tree">
  </el-tree>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="sure(role_name)">确 定</el-button>
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
      allPower_id:[],
      roleDate:[],
      vagueData: [],
      tableData: [],
      index: 1,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      role_name: "",
      role_id: 0,
      region: "",
      defaultProps:{
        children: 'listpower',
        label: 'power_name'
      }
    };
  },
  methods: {
    add(){
      this.dialogFormVisible = true
      this.role_id=0
      this.role_name=''
      this.allPower_id = []
      this.axios.post("/api/Power/selectAllPower").then((res)=>{
        this.roleDate = res.data.data
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    handleDelete(index, row) {
      this.axios
        .post(
          "/api/Role/updateUserRoleState",
          qs.stringify({
            role_id: row.role_id
          })
        )
        .then(res => {
          if (res.data.data == 1) {
            this.$message.success("删除角色成功");
            this.reload();
          } else {
            this.$message.error("删除角色失败");
          }
        })
        .catch(error => {
          console.log("error:" + error);
        });
    },
    handleEdit(index, row) {
      this.allPower_id = []
      this.axios.post("/api/Power/selectAllPower").then((res)=>{
     
        this.roleDate = res.data.data
      });
    
      this.dialogFormVisible = true;
      this.role_name = row.role_name;
      this.role_id = row.role_id;
      this.axios.post("/api/Role/selectRolePowers",qs.stringify({
        'role_id':this.role_id
      })).then((res)=>{
          this.allPower_id = res.data.data
      })
    },
    sure(name) {
      var rad=''
        var ridsa = this.$refs.tree.getCheckedKeys().join(',')// 获取当前的选中的数据[数组] -id, 把数组转换成字符串
        var ridsb = this.$refs.tree.getCheckedNodes()// 获取当前的选中的数据{对象}
        ridsb.forEach(ids=>{//获取选中的所有的父级id
          rad+=','+ids.power_parentid
        })
        rad=rad.substr(1) // 删除字符串前面的','
        
        var rids=rad+','+ridsa
        var arr=rids.split(',')//  把字符串转换成数组
        arr=[...new Set(arr)]; // 数组去重
        rids=arr.join(',')// 把数组转换成字符串



      if (this.role_id == 0) {
        if (name == "") {
          this.$message.error("角色名称不能为空");
        } else {
          this.axios
            .post(
              "/api/Role/insertRoleName",
              qs.stringify({
                role_name: name,
                powers:rids
              })
            )
            .then(res => {
              if (res.data.data == 1) {
                this.$message.success("添加角色成功");
                this.reload();
              } else {
                this.$message.error("添加角色失败");
              }
            });
        }
      } else {
        if (name == "") {
          this.$message.error("角色名称不能为空");
        } else {
          this.axios
            .post(
              "/api/Role/updateRoleName",
              qs.stringify({
                role_name: name,
                role_id: this.role_id,
                powers:rids
              })
            )
            .then(res => {
              if (res.data.data == 1) {
                this.$message.success("修改角色成功");
                this.reload();
              } else {
                this.$message.error("修改角色失败");
              }
            });
        }
      }

        

       
    },
    selectRole() {
      this.axios
        .post(
          "/api/Role/selectVagueRole",
          qs.stringify({
            role_name: this.region
          })
        )
        .then(res => {
          this.tableData = res.data.data;
        });
    }
  },
  mounted() {
    var url = "/api/Role/selectAllRole";
    this.axios
      .post(url)
      .then(res => {
        this.tableData = res.data.data;
        this.vagueData = res.data.data;
      })
      .catch(error => {});

      
  }

 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
