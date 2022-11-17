<template>
    <div class='chart' ref="charts">
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: "linecharts",
    mounted() {
        let myCharts = echarts.init(this.$refs.charts)
        myCharts.setOption({
            xAxis: {
                show: false,
                type: 'category',
                data: ['运动', '服饰', '家具', '电子产品', '食品', '生活用品', '攀登', '旅游', '化妆品', '金饰', '保健品']
            },
            yAxis: {
                show: false,
            },
            series: [
                {
                    type: 'bar',
                    data: [10, 22, 3, 25, 44, 12, 28, 9, 22, 18, 45],
                }
            ],
            grid: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0
            },
            tooltip: {}
        })
    }
}
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%
}
</style>