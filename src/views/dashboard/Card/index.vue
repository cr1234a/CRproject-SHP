<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                <el-card>
                    <detail title="总销售额" count="￥126560">
                        <template slot="footer">
                            <span>日销售额&nbsp;&nbsp;￥12423</span>
                        </template>
                        <template slot="charts">
                            <span>周同比&nbsp;&nbsp;56.67%&nbsp;<svg t="1667311777929" class="icon" viewBox="0 0 1024 1024"
                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3049" width="16" height="16">
                                    <path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="3050"></path>
                                </svg></span>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span>日同比&nbsp;&nbsp;19.16%&nbsp;<svg t="1667311818974" class="icon"
                                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4065"
                                    width="16" height="16">
                                    <path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="4066"></path>
                                </svg></span>
                        </template>
                    </detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <detail title="访问量" count="88460">
                        <template slot="footer">
                            <span>日访问量&nbsp;&nbsp;1258</span>
                        </template>
                        <template slot="charts">
                            <linecharts></linecharts>
                        </template>
                    </detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <detail title="支付笔数" count="53420">
                        <template slot="footer">
                            <span>转化率&nbsp;&nbsp;59%</span>
                        </template>
                        <template slot="charts">
                            <bar></bar>
                        </template>
                    </detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <detail title="运营活动效果" count="78%">
                        <template slot="charts">
                            <progresschart></progresschart>
                        </template>
                        <template slot="footer">
                            <span>周同比&nbsp;&nbsp;12%&nbsp;<svg t="1667311777929" class="icon" viewBox="0 0 1024 1024"
                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3049" width="16" height="16">
                                    <path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="3050"></path>
                                </svg></span>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span>日同比&nbsp;&nbsp;8%&nbsp;<svg t="1667311818974" class="icon"
                                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4065"
                                    width="16" height="16">
                                    <path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="4066"></path>
                                </svg></span>
                        </template>
                    </detail>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import detail from './Detail/index.vue'
import linecharts from './lineCharts/index.vue'
import bar from './Bar'
import progresschart from './Progress/index.vue'
export default {
    name: "cart",
    components: {
        detail,
        linecharts,
        bar,
        progresschart
    }
}
</script>

<style>

</style>