<template>

  <div>

    <div>
      <el-input v-model="search" style="width:280px" placeholder="请输入课程名称"></el-input>
      <el-button type="primary" icon="el-icon-circle-plus"  @click="add">添加课程</el-button>
    </div>
    
  <el-table
    :data="tables"
    style="width: 100%"
    border>
    <el-table-column
      label="序号"
      type="index"
      width="60"
      sortable
      :index="indexMethod"
      align="center">
    </el-table-column>
    <el-table-column
      label="课程类别"
      prop="categorys_name"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      label="课程名称"
      prop="curriculums_name"
      width="170"
      align="center">
    </el-table-column>
    <el-table-column
      label="课程描述"
      prop="curriculums_content"
      align="center">
    </el-table-column>
    <el-table-column
      label="课程讲师"
      prop="curriculums_user"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      label="课程热度"
      prop="curriculums_hot"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          @click="handePassword(scope.$index, scope.row)">详情</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="课程" :visible.sync="dialogFormVisible">
    <el-form @submit.native.prevent label-width="80px" >

      <el-form-item label="课程类别:">
      <el-select v-model="categorys_id" filterable  placeholder="请选择课程类别">
        <el-option v-for="item in courseData" :key="item.categorys_id" :label="item.categorys_name" :value="item.categorys_id"></el-option>
      </el-select>
    </el-form-item>

      <el-form-item label="课程名称:" >
        <el-input v-model="curriculums_name"></el-input>
      </el-form-item>

      <el-form-item label="课程描述:" >
        <el-input v-model="curriculums_content"></el-input>
      </el-form-item>

      <el-form-item label="课程讲师:" >
        <el-input v-model="curriculums_user"></el-input>
      </el-form-item>

    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="userSure">确 定</el-button>
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
      search: "",
      curriculums_name: "",
      curriculums_content: "",
      curriculums_user: "",
      curriculums_id: 0,
      courseData: [],
      categorys_id: ""
    };
  },
  computed: {
    // 模糊搜索
    tables() {
      const search = this.search;

      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.userTableData.filter(data => {
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          // 注意： some() 不会对空数组进行检测。
          // 注意： some() 不会改变原始数组。
          return Object.keys(data).some(key => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.userTableData;
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleEdit(index, row) {

      // this.$confirm("确定要删除吗？", "提示", {
      //   type: "warning"
      // })
      //   .then(() => {
      //     axios
      //       .delete(`/api/users/${row._id}`)
      //       .then(res => {
      //         // console.log(res.data.result === "success");
      //         // console.log(res);
      //         if (res.data.result === "success") {
      //           self.$message.success("删除成功");
      //           self.tableData.splice(index, 1);
      //         }
      //       })
      //       .catch(() => {});
      //   })
      //   .catch(() => {});

      this.dialogFormVisible = true;
      this.categorys_id = row.categorys_id;
      this.curriculums_name = row.curriculums_name;
      this.curriculums_content = row.curriculums_content;
      this.curriculums_user = row.curriculums_user;
      this.curriculums_id = row.curriculums_id;

      this.axios.post("/api/Kind/selectAllCategory").then(res => {
        this.courseData = res.data.data;
      });
    },
    handePassword(index, row) {
       this.$router.push({path:"coursewares",query:{curriculums_id:row.curriculums_id}});
    },
    handleDelete(index, row) {
      this.axios
        .post(
          "/api/Curriculums/updateCurriculumsState",
          qs.stringify({
            curriculums_id: row.curriculums_id
          })
        )
        .then(res => {
          if (res.data.data == 1) {
            this.$message.success("删除成功");
            this.reload();
          } else {
            this.$message.error("删除失败");
          }
        });
    },
    userSure() {
      if (this.curriculums_id == 0) {
        this.axios.post(
          "/api/Curriculums/insertCurriculumsInformation",
          qs.stringify({
            categorys_id: this.categorys_id,
            curriculums_name: this.curriculums_name,
            curriculums_content: this.curriculums_content,
            curriculums_user: this.curriculums_user,
          })
        ).then((res)=>{
            if (res.data.data == 1) {
            this.$message.success("修改成功");
            this.reload();
          } else {
            this.$message.error("修改失败");
          }
        });
      } else {
        this.axios.post(
          "/api/Curriculums/updateCurriculumsInformation",
          qs.stringify({
            categorys_id: this.categorys_id,
            curriculums_name: this.curriculums_name,
            curriculums_content: this.curriculums_content,
            curriculums_user: this.curriculums_user,
            curriculums_id: this.curriculums_id
          })
        ).then((res)=>{
            if (res.data.data == 1) {
            this.$message.success("修改成功");
            this.reload();
          } else {
            this.$message.error("修改失败");
          }
        });
      }
    },
    add() {
      this.dialogFormVisible = true;
      this.curriculums_name = "";
      this.curriculums_content = "";
      this.curriculums_user = "";
      this.curriculums_id = 0;
      this.categorys_id = '';
    }
  },
  mounted() {
    this.axios.post("/api/Curriculums/selectAllCurriculums").then(res => {
      this.userTableData = res.data.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
