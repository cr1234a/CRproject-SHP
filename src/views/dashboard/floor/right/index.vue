<template>
    <el-card>
        <div class="search">
            <div>销售额类别占比</div>
            <div class="radio">
                <el-radio-group v-model="value" size="small" class="a">
                    <el-radio-button label="全部渠道"></el-radio-button>
                    <el-radio-button label="线上"></el-radio-button>
                    <el-radio-button label="门店"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="chart" ref="chart"></div>
    </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'right',
    data() {
        return {
            value: '全部渠道'
        }
    },
    mounted() {
        let mychart = echarts.init(this.$refs.chart)
        mychart.setOption({
            title: {
                text: '上海',
                subtext: '1048',
                left: 'center',
                top: "center"
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: true
                    },
                    data: [
                        { value: 1048, name: '上海' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ]
        })
        // 绑定事件
        mychart.on('mouseover', (params) => {
            const { value, name } = params.data
            mychart.setOption({
                title: {
                    text: name,
                    subtext: value,
                },
            })
        })
    }
}
</script>

<style scoped>
.search {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
}

.radio {
    margin-top: -15px;
    /* padding-top: 5px; */
}

.a {
    transform: translateY(7px);
}

.chart {
    width: 100%;
    height: 276px;
}
</style>