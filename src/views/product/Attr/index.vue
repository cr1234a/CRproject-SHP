<template>
  <div>
    <el-card style="margin: 20px 0">
      <threeLevelLinkage @getLIstInfo="getLIstInfo" :show="isshow"></threeLevelLinkage>
    </el-card>
    <el-card>
      <div v-show="isshow">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addlist" :disabled="!categoryThreeId"
          style="margin-bottom:20px">
          添加属性</el-button>
        <el-table :data="attrList" border>
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性名称" width="150px" align="center" prop="attrName"></el-table-column>
          <el-table-column label="属性值列表" align="center" prop="1">
            <template slot-scope="{ row }">
              <el-tag v-for="attrvalue in row.attrValueList" :key="attrvalue.id" style="margin: 0 20px">
                {{ attrvalue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px" align="center">
            <template slot-scope="{ row }">
              <el-button type="warning" size="mini" icon="el-icon-edit" @click="editList(row)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isshow">
        <el-form :inline="true" class="demo-form-inline" :model="attrinfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" size="small" v-model="attrinfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" size="small" style="margin:0 0 20px 0"
          :disabled="!attrinfo.attrName" @click="addgoodsLIst">添加属性值</el-button>
        <el-button size="small" @click="isshow=true">取消</el-button>
        <el-table border :data="attrinfo.attrValueList">
          <el-table-column type="index" label="序号" width="100px" align="center"></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template slot-scope="{row,$index}">
              <el-input size="small" v-model.trim="row.valueName" placeholder="请输入要添加的属性值名称" v-if="row.flag"
                @blur="enterOrblur(row)" @keyup.native.enter="enterOrblur(row)" :ref="$index"></el-input>
              <span style="display:block" v-else @click="toEdit(row,$index)">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220px" align="center">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确定删除${row.valueName}这个属性值吗？`" @onConfirm="deleteChangeValue($index)">
                <el-button slot="reference" icon="el-icon-delete" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="small" style="margin-toxp:20px" :disabled="attrinfo.attrValueList.length<1"
          @click="saveNewValue">保存
        </el-button>
        <el-button size="small" @click="isshow=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
  data() {
    return {
      cd: 0,
      md: true,
      categoryOneId: "",
      categoryTwoId: "",
      categoryThreeId: "",
      attrList: [],
      isshow: true,    /* 控制显示与隐藏 */ /* 实际为ture,记得调回去 */
      attrinfo: {
        "attrName": "",
        "attrValueList": [],
        "categoryId": 0,
        "categoryLevel": 3,
      },
    };
  },
  methods: {
    getLIstInfo(categoryId) {
      if (categoryId.id == 1) {
        this.categoryOneId = categoryId.categoryOneId;
      } else if (categoryId.id == 2) {
        this.categoryTwoId = categoryId.categoryTwoId;
      } else {
        this.categoryThreeId = categoryId.categoryThreeId;
        this.getGoodsValue();
      }
    },
    // 获取具体的商品属性
    async getGoodsValue() {
      let res = await this.$api.attr.getListInfo(
        this.categoryOneId,
        this.categoryTwoId,
        this.categoryThreeId
      );
      if (res.code == 200) {
        this.attrList = res.data;
      } else {
        this.$message.error();
        this.$message({
          message: "获取数据失败,请重试",
          type: "error",
          duration: 1000,
        });
      }
    },
    // 添加属性值按钮的回调
    addgoodsLIst() {
      this.attrinfo.attrValueList.push({
        "attrId": this.attrinfo.id,
        "valueName": "",
        flag: true,  /* 控制查看和编辑模式的切换 */
        cd: this.cd++
      }),
        // 因为点击的时候input框还没有被熏染，所有需要等模板再次渲染后执行聚焦操作
        this.$nextTick(() => {
          this.$refs[this.attrinfo.attrValueList.length - 1].focus()
        })
    },
    addlist() {
      this.isshow = false
      this.attrinfo = {
        "attrName": "",
        "attrValueList": [],
        "categoryId": this.categoryThreeId,
        "categoryLevel": 3,
      }
    },
    // 编辑
    editList(row) {
      this.isshow = false
      row.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
        this.$set(item, 'cd', this.cd++)
      })
      this.attrinfo = JSON.parse(JSON.stringify(row))
    },
    // 按enter和失去焦点时的操作
    enterOrblur(row) {
      if (row.valueName.trim() == '') {
        this.attrinfo.attrValueList.pop()
        return
      }
      // let res = this.attrinfo.attrValueList.splice(0, this.attrinfo.attrValueList.length - 1)
      let RES = this.attrinfo.attrValueList.some((item) => {
        if (item.cd != row.cd) {
          return item.valueName == row.valueName
        }
      })
      if (RES) {
        this.$message.warning('属性值名称不能相同')
        return
      }
      row.flag = false
    },
    toEdit(row, index) {
      row.flag = true
      // 因为点击的时候input框还没有被熏染，所有需要等模板再次渲染后执行聚焦操作
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    deleteChangeValue(index) {
      this.attrinfo.attrValueList.splice(index, 1)
    },
    // 保存
    async saveNewValue() {
      this.attrinfo.attrValueList = this.attrinfo.attrValueList.filter(item => {
        delete item.cd
        delete item.flag
        return true          /* 代表已经过滤完成 */
      })
      try {
        if (this.attrinfo.attrValueList.length > 0) {
          await this.$api.attr.addListValue(this.attrinfo)
          this.getGoodsValue()
          this.isshow = true
        } else {
          this.$message.error('不能提交空数据')
        }
      } catch (error) {
        this.$message.error('未知错误,请重试')
      }
    },
  }
}
</script>

<style scoped>

</style>