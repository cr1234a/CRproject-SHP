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
                min: 0,
                max: 100,

            },
            yAxis: {
                show: false,
                type: 'category',
                data: ['完成程度百分比']
            },
            series: [
                {
                    type: 'bar',
                    color: '#771b15',
                    data: [78],
                    showBackground: true,
                    backgroundStyle: {
                        color: '#eee'
                    },
                    label: {
                        show: true,
                        formatter: '78%'
                    }
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