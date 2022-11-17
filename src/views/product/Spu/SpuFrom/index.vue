<template>
  <div>
    <el-form label-width="80px" :model="SpuInfo">
      <el-form-item label="Spu名称">
        <el-input placeholder="请输入Spu名称" v-model="SpuInfo.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="SpuInfo.tmId">
          <el-option :label='tmName.tmName' :value="tmName.id" v-for="tmName in SpuBrandInfo" :key="tmName.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述">
        <el-input type="textarea" placeholder="请输入Spu描述" row="6" v-model="SpuInfo.description"></el-input>
      </el-form-item>
      <el-form-item label="Spu图片">
        <el-upload action="dev-api/admin/product/fileUpload" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="SpuImgInfo"
          :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select placeholder="请选择销售属性" v-model="attrId">
          <el-option :label='v.name' v-for="v in noChooseGoodsValue" :key="v.id" :value='`${v.id}:${v.name}`' ref="a">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" style="margin-left:15px"
          :disabled="!attrId || noChooseGoodsValue.length<1" @click="addSaleValue">添加销售属性</el-button>
        <el-table border style="margin-top:20px" :data="SpuInfo.spuSaleAttrList">
          <el-table-column label="序号" type="index" width="90px" align="center"></el-table-column>
          <el-table-column label="属性名" align="center" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性值列表" align="center">
            <template slot-scope="{row}">
              <!-- v-if="!SpuInfo.spuSaleAttrList.saleAttrName" -->
              <!-- <div v-if="!SpuInfo.spuSaleAttrList[0].saleAttrName"> -->
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable
                :disable-transitions="false" @close="closeTag(row,index)">
                {{tag.saleAttrValueName}}
              </el-tag>
              <!-- </div> -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput"
                size="small" @blur="showSpan(row)" @keyup.enter.native="$event.target.blur">
                <!-- 如果同enter事件，会触发失焦和enter两次 ，直接使用enter触发input失焦是最好的-->
                <!-- @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" -->
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
              <!-- @click="showInput" -->
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{$index}">
              <el-button type="danger" icon="el-icon-delete" size="small" @click="removeSpuSaleAttrList($index)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="saveList">保存</el-button>
        <el-button size="small" @click="$emit('changeScene')">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
  
<script>
export default {
  name: 'spuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      SpuInfo: {
        "category3Id": 0,
        "description": "", /*  描述 */
        "spuName": "",      /* spu名称 */
        "tmId": '',        /* 品牌的id */
        "spuImageList": [          /* 图片信息 */
          {
            "id": 0,
            "imgName": "",
            "imgUrl": "",
            "spuId": 0
          }
        ],
        "spuSaleAttrList": [],   /* 平台属性与属性值的收集 */
      },
      SpuBrandInfo: [],
      SpuImgInfo: [],
      SpuSaleInfo: [],
      // inputVisible: false,
      // inputValue: '',
      attrId: '', /* 收集未选择的销售属性的id */
    };
  },
  computed: {
    noChooseGoodsValue() {
      return this.SpuSaleInfo.filter(item => {
        return this.SpuInfo.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName
        })
      })
    }
  },
  methods: {
    // 删除照片的回调
    handleRemove(file, fileList) {
      this.SpuImgInfo = fileList
    },
    // 预览照片的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 照片上传成功的回调
    handleSuccess(response, file, fileList) {
      this.SpuImgInfo = fileList
    },
    // 发送请求，获取信息
    async getSpuForm(spu) {
      let getSpuInfo = await this.$api.spu.getSpuInfo(spu.id)
      if (getSpuInfo.code == 200) {
        this.SpuInfo = getSpuInfo.data
      } else {
        this.$message.error('获取信息失败，请重试')
      }
      let getSpuBrandInfo = await this.$api.spu.getSpuBrandInfo()
      if (getSpuBrandInfo.code == 200) {
        this.SpuBrandInfo = getSpuBrandInfo.data
      } else {
        this.$message.error('获取信息失败，请重试')
      }
      let getSpuImgInfo = await this.$api.spu.getSpuImgInfo(spu.id)
      if (getSpuImgInfo.code == 200) {
        this.SpuImgInfo = getSpuImgInfo.data
        this.SpuImgInfo.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
      } else {
        this.$message.error('获取信息失败，请重试')
      }
      let getSpuSaleInfo = await this.$api.spu.getSpuSaleInfo()
      if (getSpuSaleInfo.code == 200) {
        this.SpuSaleInfo = getSpuSaleInfo.data
      } else {
        this.$message.error('获取信息失败，请重试')
      }
    },
    // 添加售卖属性
    addSaleValue() {
      let [baseSaleAttrId, saleAttrName] = this.attrId.split(':')
      this.SpuInfo.spuSaleAttrList.push({ baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] })
      this.attrId = ''
    },
    // 显示input输入框
    showInput(row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });
    },
    // 显示span输入框
    showSpan(row) {
      row.inputVisible = false
      if (!row.inputValue.trim()) {
        this.$message.error('属性值不能为空')
        return
      }
      let res = row.spuSaleAttrValueList.some(item => {
        return item.saleAttrValueName == row.inputValue
      })
      if (res) {
        this.$message.error('属性值不能重复')
        return
      }
      row.spuSaleAttrValueList.push({ baseSaleAttrId: row.baseSaleAttrId, saleAttrValueName: row.inputValue })
    },
    closeTag(row, index) {
      row.spuSaleAttrValueList.splice(index, 1)
    },
    // 删除图标
    removeSpuSaleAttrList(index) {
      this.SpuInfo.spuSaleAttrList.splice(index, 1)
    },
    // 保存的回调
    async saveList() {
      let newValue = this.SpuImgInfo.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      this.SpuInfo.spuImageList = newValue
      let res = await this.$api.spu.saveAndRevise(this.SpuInfo)
      if (res.code == 200) {
        if (this.SpuInfo.id) {
          this.$message.success('修改成功')
        } else {
          this.$message.success('添加成功')
        }
        this.$emit('reviseScene', 0, this.SpuInfo.id ? '修改' : '新增')
      }
    },
    // 添加属性的回调
    async getAddSpuForm(category3Id) {
      Object.assign(this._data, this.$options.data())
      this.SpuInfo.category3Id = category3Id
      let getSpuBrandInfo = await this.$api.spu.getSpuBrandInfo()
      if (getSpuBrandInfo.code == 200) {
        this.SpuBrandInfo = getSpuBrandInfo.data
      } else {
        this.$message.error('获取信息失败，请重试')
      }
      let getSpuSaleInfo = await this.$api.spu.getSpuSaleInfo()
      if (getSpuSaleInfo.code == 200) {
        this.SpuSaleInfo = getSpuSaleInfo.data
      } else {
        this.$message.error('获取信息失败，请重试')
      }
    }
  },

}
</script>
  
<style>
.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>