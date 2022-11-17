<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin:10px" @click="addList">添加</el-button>
      <el-table  border style="width: 100%" :data="items">
    <el-table-column type='index' label="序号" width="120px" align="center"></el-table-column>
    <el-table-column prop="tmName" label="品牌名称"></el-table-column> <!-- prop="roleName" -->
    <el-table-column  label="品牌标志">
      <template slot-scope="{row}">
          <img :src="row.logoUrl" style="width:80px;height:80px">
      </template>
    </el-table-column>
    <el-table-column  label="操作">
      <template slot-scope="{row}">
        <el-button type="warning" size="small" @click="changeList(row)">修改</el-button>
        <el-button type="danger" size="small" @click="deleteBrand(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<el-pagination style="margin-top:20px;text-align:center"
@current-change="getTradeMarkList"
@size-change="sizeChange"
      background
      :current-page="page"
      :page-sizes="[3, 5, 8, 10]"
      :page-size="3"
      layout="prev, pager, next,jumper,->,sizes,total"
      :total="total">
    </el-pagination>
    <el-dialog :title="tmForm.id ? '修改数据' :'新增数据'" :visible.sync="dialogFormVisible">
  <el-form  label-width='80%' :model="tmForm" :rules="rules" ref="ruleForm" >
    <el-form-item label="品牌名称" label-width="100px" prop="name">
      <el-input autocomplete="off" v-model="tmForm.tmName" style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="品牌标志" label-width="100px"  prop="region">
      <el-upload
      class="avatar-uploader"
      action="dev-api/admin/product/fileUpload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
     
    >
      <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过500kb</div>
    </el-upload>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addLists('ruleForm')" >确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
    name:'tradeMark',
    data(){
      return {
        page:1,
        limit:3,
        total:0,
        items:[],
        // 弹窗显示与隐藏
        dialogFormVisible:false,
        tmForm:{
           id:'',
           tmName:'',
           logoUrl:''
        },
        rules: {
          name: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          region: [
            { required: true, message: '请选择品牌标志'}
          ]
        }
      }
    },
    methods:{
     async getTradeMarkList(pageNo=1){
        this.page=pageNo
        let {page,limit}=this
        let res=await this.$api.trademark.getTradeMarkList(page,limit)
         if(res.code==200) {
          this.items=res.data.records,
          this.total=res.data.total
         }else {
          alert('未知错误，请重试')
          console.log(res,11)
         }
      },
      sizeChange(val) {
        this.limit=val
        this.getTradeMarkList()
      },
      handleAvatarSuccess(res, file) {
        this.tmForm.logoUrl=res.data
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      addList(){
        this.dialogFormVisible=true
        this.tmForm.tmName=''
        this.tmForm.logoUrl=''
        this.tmForm.id=''
      },
      changeList(row){
        this.dialogFormVisible=true
        this.tmForm={...row}  /* 相当于是浅拷贝 */
      },
      addLists(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let res = await this.$api.trademark.changeOrAddBrand(this.tmForm)
            if (res.code == 200) {
              this.getTradeMarkList(this.page)
              this.$message.success(this.tmForm.id ? '修改信息成功' : '添加信息成功');
              this.dialogFormVisible = false
            } else {
              this.$message.error('添加信息失败，请重试');
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        }); 
      },
     deleteBrand(row){
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(async () => {
          let res=await this.$api.trademark.deleteBrand(row.id)
          if (res.code == 200) {
            this.getTradeMarkList(this.page=this.items.length>1 ? this.page :this.page-1)
            this.$message({
             type: 'success',
             message: '删除成功!',
             duration:1000
           })
          }else {
            this.$message.error('获取信息失败，请重试');
          };
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消删除',
             duration:1000
           });
         });
      }
    },
    mounted(){
           this.getTradeMarkList()
    }

}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>