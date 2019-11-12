<template>

  <div>

    <div>
      <el-input v-model="search" style="width:280px" placeholder="请输入课程类别"></el-input>
      <el-button type="primary" icon="el-icon-circle-plus"  @click="add">添加类别</el-button>
    </div>
    
  <el-table
    :data="tables"
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
      label="课程类别"
      prop="categorys_name"
      align="center">
    </el-table-column>
    <el-table-column
      label="课程信息"
      prop="categorys_content"
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

  <el-dialog title="类别" :visible.sync="dialogFormVisible">
    <el-form @submit.native.prevent label-width="80px" >
      <el-form-item label="课程类别:" >
        <el-input v-model="categorys_name"></el-input>
      </el-form-item>

      <el-form-item label="类别信息:" >
        <el-input v-model="categorys_content"></el-input>
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
      categorys_name: "",
      categorys_content: "",
      categorys_id: 0,
      search: ""
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
      this.dialogFormVisible = true;
      this.categorys_name = row.categorys_name;
      this.categorys_content = row.categorys_content;
      this.categorys_id = row.categorys_id;
    },
    handleDelete(index, row) {
      this.axios
        .post(
          "/api/Kind/updateCategorysState",
          qs.stringify({
            categorys_id: row.categorys_id
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
      if (this.categorys_id == 0) {
        this.axios
          .post(
            "/api/Kind/insertCategory",
            qs.stringify({
              categorys_name: this.categorys_name,
              categorys_content: this.categorys_content
            })
          )
          .then(res => {
            if (res.data.data == 1) {
              this.$message.success("插入成功");
              this.reload();
            } else {
              this.$message.error("插入失败");
            }
          });
      } else {
        this.axios
          .post(
            "/api/Kind/updateCategorysInformation",
            qs.stringify({
              categorys_name: this.categorys_name,
              categorys_content: this.categorys_content,
              categorys_id: this.categorys_id
            })
          )
          .then(res => {
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
      this.categorys_name = "";
      this.categorys_content = "";
      this.categorys_id = 0;
    }
  },
  mounted() {
    this.axios.post("/api/Kind/selectAllCategory").then(res => {
      this.userTableData = res.data.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
