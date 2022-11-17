<template>

    <el-form label-width="110px">
        <el-form-item label="Spu名称">
            {{ spu.spuName }}
        </el-form-item>
        <el-form-item label="Sku名称">
            <el-input placeholder="请输入Sku名称" v-model="skuInfo.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格（元）">
            <el-input placeholder="请输入价格（元）" type='number' v-model="skuInfo.price"></el-input>
        </el-form-item>
        <el-form-item label="重量（千克）">
            <el-input placeholder="请输入重量（千克）" v-model="skuInfo.weight"></el-input>
        </el-form-item>
        <el-form-item label="规格描述">
            <el-input type="textarea" placeholder="请输入规格描述" rows="4" v-model="skuInfo.skuDes"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item :label="value.attrName" v-for="value in platformValue" :key="value.id"
                    style="margin-top:10px">
                    <el-select placeholder="请选择" v-model="value.platforNeedValue">
                        <el-option :label="ValueList.valueName" :value="`${value.id}:${ValueList.id}`"
                            v-for="ValueList in value.attrValueList" :key="ValueList.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item :label="value.saleAttrName" v-for="value in saleValue" :key="value.id">
                    <el-select value="" placeholder="请选择" v-model="value.saleNeedValue">
                        <el-option :label="ValueList.saleAttrValueName" :value="`${value.id}:${ValueList.id}`"
                            v-for="ValueList in value.spuSaleAttrValueList" :key="ValueList.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片列表">
            <el-table :data="imgValue" @selection-change="checkWhich" border>
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="图片" align="center">
                    <template slot-scope="{row}">
                        <img :src="row.imgUrl" style="width:100px;height:100px">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{row}">
                        <el-button type="primary" size="small" v-if="row.isDefault == 0" @click="reviseDefaultImg(row)">
                            设为默认</el-button>
                        <el-button size="small" v-else>默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="savevalueList">保存</el-button>
            <el-button size="small" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'skuForm',
    data() {
        return {
            imgValue: [],
            saleValue: [],
            platformValue: [],
            skuInfo: {
                "category3Id": 0,
                "spuId": 0,
                "tmId": 0,
                "price": null,
                "skuName": "",
                "weight": "",
                "skuDesc": "",
                "skuDefaultImg": "", /* 默认图片 */
                "skuAttrValueList": [],               /* 平台属性 */
                "skuImageList": [],
                "skuSaleAttrValueList": [],      /* 销售属性 */
            },
            spu: {},
            // 收集选中的图片
            imgList: []
        }
    },
    methods: {
        async addsku(categoryOneId, categoryTwoId, categoryThreeId, spu) {
            this.spu = spu
            this.skuInfo.category3Id = categoryThreeId
            this.skuInfo.tmId = spu.tmId
            this.skuInfo.spuId = spu.id
            let res1 = await this.$api.spu.imgValue(spu.id)
            if (res1.code == 200) {
                let list = res1.data
                list.forEach(element => {
                    element.isDefault = 0
                });
                this.imgValue = list
            } else {
                this.$message.error('获取图片信息失败，请重试')
            }
            let res2 = await this.$api.spu.saleValue(spu.id)
            if (res2.code == 200) {
                this.saleValue = res2.data
            } else {
                this.$message.error('获取销售信息失败，请重试')
            }
            let res3 = await this.$api.spu.platformValue(categoryOneId, categoryTwoId, categoryThreeId)
            if (res3.code == 200) {
                this.platformValue = res3.data
            } else {
                this.$message.error('获取平台信息失败，请重试')
            }
        },
        // 图片选中
        checkWhich(params) {
            this.imgList = params
        },
        // 修改默认图片
        reviseDefaultImg(row) {
            this.imgValue.forEach(item => {
                item.isDefault = 0
            })
            row.isDefault = 1
            this.skuInfo.skuDefaultImg = row.imgUrl
        },
        // 取消保存按钮
        cancel() {
            this.$emit('cancel', 0)
            Object.assign(this._data, this.$options.data())
        },
        // 保存数据
        async savevalueList() {
            // 整理平台属性数据
            this.skuInfo.skuAttrValueList = this.platformValue.reduce((prev, item) => {
                if (item.platforNeedValue) {
                    let [attrId, valueId] = item.platforNeedValue.split(':')
                    prev.push({ attrId, valueId })
                }
                return prev
            }, [])
            // 整理销售属性数据
            this.skuInfo.skuSaleAttrValueList = this.saleValue.reduce((prev, item) => {
                if (item.saleNeedValue) {
                    let [saleAttrId, saleAttrValueId] = item.saleNeedValue.split(':')
                    prev.push({ saleAttrId, saleAttrValueId })
                }
                return prev
            }, [])
            // 整理图片数据
            this.skuInfo.skuImageList = this.imgList.map(item => {
                return {
                    imgName: item.imgName,
                    imgUrl: item.imgUrl,
                    isDefault: item.isDefault,
                    spuImgId: item.id
                }
            })
            // 发请求
            let res = await this.$api.spu.saveValueList(this.skuInfo)
            if (res.code == 200) {
                this.$message.success('添加成功')
                this.$emit('cancel', 0)
                Object.assign(this._data, this.$options.data())
            }
        }
    }
}
</script>

<style>

</style>