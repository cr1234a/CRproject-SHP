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
                data: ['访问量', '访问量', '访问量', '访问量', '访问量', '访问量', '访问量', '访问量']
            },
            yAxis: {
                show: false,
            },
            series: [
                {
                    type: 'line',
                    data: [10, 22, 3, 25, 44, 12, 28, 9],
                    itemStyle: {
                        opacity: 0
                    },
                    lineStyle: {
                        color: "skyblue"
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'skyblue' },
                                { offset: 1, color: "#fff" }
                            ],
                            global: false
                        }
                    },
                    smooth: true
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