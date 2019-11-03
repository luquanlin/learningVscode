<template>

  <div>
    <el-dialog title="角色" :visible.sync="dialogFormVisible">
    <el-form @submit.native.prevent>
    <el-form-item label="角色名称" :label-width="formLabelWidth">
      <el-input v-model="role_name" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="qx">取 消</el-button>
    <el-button type="primary" @click="sure(role_name)">确 定</el-button>
  </div>
  </el-dialog>
  </div>

</template>

<script>
export default {
  props: ["role_name", "dialogFormVisible"],
  data() {
    return {
      formLabelWidth: "120px",
      isDialog:this.dialogFormVisible
    };
  },
  methods: {
    qx(){
      this.$emit('dialogFormVisible', false)
    },
    sure(name) {
      if (this.role_id == 0) {
        if (name == "") {
          this.$message.error("角色名称不能为空");
        } else {
          this.axios
            .post(
              "/api/Role/insertRoleName",
              qs.stringify({
                role_name: name
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
                role_id: this.role_id
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
