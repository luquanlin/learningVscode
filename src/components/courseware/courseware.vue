<template>

  <div>
    <div>
      <el-input v-model="search" style="width:280px" placeholder="请输入课件名称"></el-input>
      <el-button type="primary" icon="el-icon-circle-plus"  @click="add">添加课件</el-button>
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
      label="课件名称"
      prop="coursewares_name"
      align="center">
    </el-table-column>
    <el-table-column
      label="课程地址"
      prop="coursewares_url"
      align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

        <el-button
          size="mini"
          @click="handleWatch(scope.$index, scope.row)">观看</el-button>
        
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="课程" :visible.sync="dialogFormVisible">
    <el-form @submit.native.prevent label-width="80px" >

      <el-form-item label="课件名称:" >
        <el-input v-model="coursewares_name"></el-input>
      </el-form-item>

      <el-form-item label="视频上传" prop="Video">
      <!-- action必选参数, 上传的地址 -->
        <el-upload 
        class="avatar-uploader el-upload--text" 
        :action="uploadUrl" 
        :on-success="handleVideoSuccess" 
        :before-upload="beforeUploadVideo" 
        :on-progress="uploadVideoProcess"
        :file-list="fileList">
          <el-button v-if="videoForm.Video !='' && videoFlag == false" :src="videoForm.Video" class="avatar" controls="controls">点击上传</el-button>
          <!-- <i v-else-if="videoForm.Video =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i> -->
          <el-button v-else-if="videoForm.Video =='' && videoFlag == false" size="small" type="primary">点击上传</el-button>
          <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
        </el-upload>
          <P class="text">请保证视频格式正确，且不超过100M</P>
      </el-form-item>

      <el-form-item label="课程地址:" >
        <el-input v-model="coursewares_url" :disabled="true"></el-input>
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
      coursewares_name: "",
      coursewares_url: "",
      coursewares_id: 0,
      uploadUrl: "/api/Coursewares/insertVideoUrl",
      videoForm:[],
      videoFlag:false,
      fileList: []
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
    beforeUploadVideo(file) {
      const isLt10M = file.size / 1024 / 1024 < 100;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt10M) {
        this.$message.error("上传视频大小不能超过10MB哦!");
        return false;
      }
    },

    uploadVideoProcess(event, file, fileList) {
      // this.videoFlag = true;
      // this.videoUploadPercent = file.percentage.toFixed(0);

      console.log(event.percent, file, fileList);
      this.videoFlag = true;
      // this.videoUploadPercent = file.percentage.toFixed(0)
      // this.videoUploadPercent = event.percent.toFixed(0)
      this.videoUploadPercent = Math.floor(event.percent);
    },

    handleVideoSuccess(res, file) {
      //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      console.log("22222222:"+res.filePath)
      if (res.data == 1) {
        this.coursewares_url=res.filePath
      } else {
        this.$message.error("视频上传失败，请重新上传！");
      }
    },
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
      this.coursewares_name = row.coursewares_name;
      this.coursewares_url = row.coursewares_url;
      this.coursewares_id = row.coursewares_id;
    },

    handleDelete(index, row) {
      this.axios.post(
          "/api/Coursewares/updateCourseWareState",
          qs.stringify({
            coursewares_id:row.coursewares_id
          })
        ).then((res)=>{
          if (res.data.data == 1) {
            this.$message.success("删除成功");
            this.reload();
          } else {
            this.$message.error("删除失败");
          }
        });
    },
    handleWatch(index, row){
      window.open(row.coursewares_url)
    },
    userSure() {
      if (this.coursewares_id == 0) {
        this.axios.post(
          "/api/Coursewares/insertNewCourseWare",
          qs.stringify({
            curriculums_id: this.$route.query.curriculums_id,
            coursewares_name: this.coursewares_name,
            coursewares_url: this.coursewares_url
          })
        ).then((res)=>{
          if (res.data.data == 1) {
            this.$message.success("插入成功");
            this.reload();
          } else {
            this.$message.error("插入失败");
          }
        });
      } else {
        this.axios.post(
          "/api/Coursewares/updateCourseWareInformation",
          qs.stringify({
            coursewares_id: this.coursewares_id,
            coursewares_name: this.coursewares_name,
            coursewares_url: this.coursewares_url
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
      this.coursewares_name = "";
      this.coursewares_url = "";
      this.coursewares_id = 0;
    }
  },
  mounted() {
    this.axios
      .post(
        "/api/Coursewares/selectCurriculumsIdCourseWares",
        qs.stringify({
          curriculums_id: this.$route.query.curriculums_id
        })
      )
      .then(res => {
        this.userTableData = res.data.data;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
