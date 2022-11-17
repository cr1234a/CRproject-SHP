<template>
  <el-form :inline="true" :model="categoryForm" class="demo-form-inline">
    <el-form-item label="一级分类">
      <el-select placeholder="请输入" v-model="categoryForm.categoryOneId" @change="getcategoryTwo" :disabled="!show">
        <el-option :label="c1.name" :value="c1.id" v-for="c1 in categoryOneList" :key="c1.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select placeholder="请输入" v-model="categoryForm.categoryTwoId" @change="getcategoryThree" :disabled="!show">
        <el-option :label="c2.name" :value="c2.id" v-for="c2 in categoryTwoList" :key="c2.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select placeholder="请输入" v-model="categoryForm.categoryThreeId" @change="hander" :disabled="!show">
        <el-option :label="c3.name" :value="c3.id" v-for="c3 in categoryThreeList" :key="c3.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'threeLevelLinkage',
  data() {
    return {
      categoryOneList: [],
      categoryTwoList: [],
      categoryThreeList: [],
      categoryForm: {
        categoryOneId: '',
        categoryTwoId: '',
        categoryThreeId: '',
      }
    }
  },
  props: ['show'],
  methods: {
    // 获取一级分类数据
    async getcategoryOne() {
      let res = await this.$api.attr.getCategoryOne()
      if (res.code == 200) {
        this.categoryOneList = res.data
      } else {
        this.$message.error()
        this.$message({
          message: '获取数据失败,请重试',
          type: 'error',
          duration: 1000
        });
      }
    },
    // 获取二级分类数据,并清空原先二三级分类数据
    async getcategoryTwo() {
      this.categoryTwoList = []
      this.categoryThreeList = []
      this.categoryForm.categoryTwoId = ''
      this.categoryForm.categoryThreeId = ''
      let res = await this.$api.attr.getCategoryTwo(this.categoryForm.categoryOneId)
      if (res.code == 200) {
        this.categoryTwoList = res.data
        this.$emit('getLIstInfo', { categoryOneId: this.categoryForm.categoryOneId, id: 1 })
      } else {
        this.$message.error()
        this.$message({
          message: '获取数据失败,请重试',
          type: 'error',
          duration: 1000
        });
      }
    },
    // 获取三级分类数据,并清空原先三级分类数据
    async getcategoryThree() {
      this.categoryThreeList = []
      this.categoryForm.categoryThreeId = ''
      let res = await this.$api.attr.getCategoryTwo(this.categoryForm.categoryTwoId)
      if (res.code == 200) {
        this.categoryThreeList = res.data
        this.$emit('getLIstInfo', { categoryTwoId: this.categoryForm.categoryTwoId, id: 2 })
      } else {
        this.$message.error()
        this.$message({
          message: '获取数据失败,请重试',
          type: 'error',
          duration: 1000
        });
      }
    },
    // 三级分类数据传递
    hander() {
      this.$emit('getLIstInfo', { categoryThreeId: this.categoryForm.categoryThreeId, id: 3 })
    }

  },
  mounted() {
    this.getcategoryOne()
  }
}
</script>

<style scoped>
.demo-form-inline {
  display: flex;
  justify-content: space-around;
}
</style>