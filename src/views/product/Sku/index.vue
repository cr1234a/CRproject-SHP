<template>
  <div>
    <el-table style="width: 100%" border :data="rocords">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" align="center">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" align="center">
      </el-table-column>
      <el-table-column label="默认图片" align="center">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" alt="" style="width:80px;height:80px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" align="center" width="80">
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center" width="80">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="success" icon="el-icon-bottom" size="mini" @click="onsale(row)" v-if="row.isSale == 0"
            title="上架产品">
          </el-button>
          <el-button type="success" icon="el-icon-top" size="mini" v-else @click="conselsale(row)" title="下架产品">
          </el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="underDevelopment" title="编辑产品属性">
          </el-button>
          <el-button type="info" icon="el-icon-info" size="mini" title="查看产品属性" @click="viewProduectValue(row)">
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" title="删除产品" @click="deleteSku(row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:20px;text-align:center" :current-page="page" :page-sizes="[5, 8, 10]"
      :page-size="limit" layout="prev, pager, next,jumper,->,sizes,total" :total="total" background
      @current-change="getSkuValue" @size-change="handleSizeChange">
    </el-pagination>
    <!-- 抽屉，点击查看属性打开 -->
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="35%">
      <el-row style="vertical-align: bottom !important">
        <el-col :span="5">名称</el-col>
        <el-col :span="16" style="transform: translateY(2px);">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row style="vertical-align: bottom !important">
        <el-col :span="5">描述</el-col>
        <el-col :span="16" style="transform: translateY(2px);">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">重量</el-col>
        <el-col :span="16" style="transform: translateY(2px);">{{ skuInfo.weight }}kg</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16" style="transform: translateY(2px);">{{ skuInfo.price + '元' }}</el-col>
      </el-row>
      <el-row style="vertical-align: center !important">
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16" style="transform: translateY(-5px);">
          <template>
            <el-tag v-for="attr in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:5px;margin-top:5px">{{
                attr.valueName
            }}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16" style="transform: translateY(10px);">
          <el-carousel height="150px" v-if="length > 0">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="img = item.imgUrl ? item.imgUrl : skuInfo.skuDefaultImg" style="width: 100%;height: 100%;">
              <!-- src="item.imgUrl || skuInfo.skuDefaultImg" -->
            </el-carousel-item>
          </el-carousel>
          <el-carousel height="150px" v-else>
            <el-carousel-item>
              <img :src="skuInfo.skuDefaultImg" style="width: 100%;height: 100%;">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>

  </div>
</template>

<script>

export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 5,
      rocords: [],  /* 具体的数据 */
      total: null,
      skuInfo: {},  /* 查看产品的具体属性 */
      drawer: false             /*  抽屉的显示与隐藏 */
    }
  },
  computed: {
    length() {
      if (this.skuInfo.skuImageList) {
        return this.skuInfo.skuImageList.length
      } else {
        0
      }
    }
  },
  methods: {
    async getSkuValue(page = 1) {     // 获取sku数据
      this.page = page
      let res = await this.$api.sku.getSkuList(this.page, this.limit)
      if (res.code == 200) {
        this.rocords = res.data.records
        this.total = res.data.total
      }
    },
    handleSizeChange(limit) {      /* limit变更时的回调函数 */
      this.limit = limit
      this.getSkuValue(this.page)
    },
    // 产品上架
    async onsale(row) {
      let res = await this.$api.sku.onSale(row.id)
      if (res.code == 200) {
        this.$message.success('商品上架成功')
      }
      this.getSkuValue(this.page)
    },
    // 产品下降
    async conselsale(row) {
      let res = await this.$api.sku.cancelSale(row.id)
      if (res.code == 200) {
        this.$message.success('商品下架成功')
      }
      this.getSkuValue(this.page)
    },
    // 编辑按钮，正在开发
    underDevelopment() {
      this.$message('正在开发中')
    },
    // 查看产品属性
    async viewProduectValue(row) {
      let res = await this.$api.sku.detailSku(row.id)
      if (res.code == 200) {
        this.drawer = true
        this.skuInfo = res.data
      }
    },
    // 删除sku
    async deleteSku(row) {
      let res = await this.$api.sku.deleteSku(row.id)
      if (res.code == 200) {
        this.$message.success('删除成功')
        this.getSkuValue(this.page)
      } else {
        this.$message.error('删除失败')
      }
    }
  },
  mounted() {
    this.getSkuValue()
  }
}
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

/* .el-carousel__button {               深度选择器
  height: 10px;
  width: 10px;
  background: white;
  border-radius: 50%;
} */
</style>
<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}

.el-row .el-col-16 {
  font-size: 14px;
  font-family: '宋体';
}

.el-col {
  margin: 35px 10px;
}
</style>