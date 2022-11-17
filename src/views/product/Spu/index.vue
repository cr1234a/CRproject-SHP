<template>
  <div>
    <el-card style="margin:20px 0">
      <threeLevelLinkage @getLIstInfo="getLIstInfo" :show="scene==0"></threeLevelLinkage>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!categoryThreeId" @click="addSpuValue">添加Spu
        </el-button>
        <el-table border :data="records" style="margin-top:20px">
          <el-table-column label="序号" type="index" width='120px' align="center"></el-table-column>
          <el-table-column label="spu名称" align="center" prop="spuName"></el-table-column>
          <el-table-column label="spu描述" align="center" prop="description"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <BintButton type="success" icon="el-icon-plus" size='mini' title="添加sku" style="margin-right:7px"
                @click="addSkuValue(row)">
              </BintButton>
              <BintButton type="warning" icon="el-icon-edit" size='mini' title="修改spu" @click="editSpuValue(row)"
                style="margin-right:7px">
              </BintButton>
              <BintButton type="info" icon="el-icon-info" size='mini' title="查看当前spu全部sku列表" style="margin-right:7px"
                @click.native="dia(row)">
              </BintButton>
              <el-popconfirm title="确定删除吗？" @onConfirm="deleteSpu(row)">
                <BintButton type="danger" icon="el-icon-delete" size='mini' title="删除spu" style="margin-right:7px"
                  slot="reference">
                </BintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="margin-top:20px;text-align:center" background :current-page="page"
          :page-sizes="[3, 5, 8, 10]" :page-size="3" layout="prev, pager, next,jumper,->,sizes,total" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <skuForm v-show="scene == 2" ref="addsku" @cancel="cancel"> </skuForm>
      <spuForm v-show="scene == 1" @changeScene="scene = 0" ref="getInfo" @reviseScene="reviseScene"></spuForm>
    </el-card>
    <el-dialog :title="spu.spuName" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table :data="skuList" border style="width: 100%" v-loading="loading">
        <el-table-column label="名称" align="center" prop="skuName" width="width"></el-table-column>
        <el-table-column label="价格" align="center" prop="price" width="width"></el-table-column>
        <el-table-column label="重量" align="center" prop="weight" width="width"></el-table-column>
        <el-table-column label="默认图片" align="center" width="width">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import skuForm from './SkuForm'
import spuForm from './SpuFrom'
export default {
  name: 'Spu',
  data() {
    return {
      categoryOneId: '',
      categoryTwoId: '',
      categoryThreeId: '',
      show: '',   /* 暂时控制输入框是否禁用*/
      page: 1,
      limit: 3,
      total: 0,
      records: [],    /* 具体的属性列表 */
      scene: 0,     /* 控制列表的显示与隐藏 */
      dialogTableVisible: false, /* 查看sku的显示与隐藏 */
      spu: {},
      skuList: [],
      loading: true /* 控制加载 */
    }
  },
  components: {
    skuForm,
    spuForm
  },
  methods: {
    getLIstInfo(categoryId) {
      if (categoryId.id == 1) {
        this.categoryOneId = categoryId.categoryOneId;
        this.categoryTwoId = ''
        this.categoryThreeId = ''
      } else if (categoryId.id == 2) {
        this.categoryTwoId = categoryId.categoryTwoId;
        this.categoryThreeId = ''
      } else {
        this.categoryThreeId = categoryId.categoryThreeId;
        this.getSpuValue();
      }
    },
    //  发送请求，获取具体的属性值
    async getSpuValue(page = 1) {
      this.page = page
      let res = await this.$api.spu.getSpuValueList(this.page, this.limit, this.categoryThreeId)
      if (res.code == 200) {
        this.total = res.data.total
        this.records = res.data.records
      } else {
        this.$message.error('获取数据失败，请重试')
      }
    },
    // 修改每页展示条数的回调
    handleSizeChange(val) {
      this.limit = val
      this.getSpuValue()
    },
    // 修改页码的回调
    handleCurrentChange(val) {
      this.page = val
      this.getSpuValue(this.page)
    },
    // 添加spu属性
    addSpuValue() {
      this.scene = 1
      this.$refs.getInfo.getAddSpuForm(this.categoryThreeId)
    },
    // 修改spu属性,并调用子组件发起请求
    editSpuValue(row) {
      this.scene = 1
      this.$refs.getInfo.getSpuForm(row)
    },
    // 切换保存页面
    reviseScene(value, addOrResive) {
      this.scene = value
      if (addOrResive == '修改') {
        this.getSpuValue(this.page)
      } else if (addOrResive == '新增') {
        this.getSpuValue()
      }
    },
    // 删除spu的回调函数
    async deleteSpu(row) {
      let res = await this.$api.spu.deleteSpu(row.id)
      if (res.code == 200) {
        this.$message.success('删除成功')
        if (this.records.length > 1) {
          this.getSpuValue(this.page)
        } else {
          this.getSpuValue(this.page - 1)
        }
      } else {
        this.$message.error('删除失败，请重试')
      }
    },
    // ＋按钮的回调，增添sku属性
    addSkuValue(row) {
      this.scene = 2
      this.$refs.addsku.addsku(this.categoryOneId, this.categoryTwoId, this.categoryThreeId, row)
    },
    // 2的取消按钮回调
    cancel(scene) {
      this.scene = scene
    },
    // 显示与隐藏
    async dia(row) {
      this.dialogTableVisible = true
      this.spu = row
      let res = await this.$api.spu.viewSkuList(row.id)
      if (res.code == 200) {
        this.skuList = res.data
        this.loading = false
      }
    },
    close(done) {
      this.skuList = []
      this.loading = true
      done()
    }
  },
}
</script>

<style>

</style>