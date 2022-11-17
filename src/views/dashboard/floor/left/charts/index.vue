<template>
    <div>
        <div class="size">
            <span style="margin-right:5px">搜索用户数</span>
            <svg t="1667310584850" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2017" width="16" height="16">
                <path
                    d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
                    p-id="2018" fill="#bfbfbf"></path>
            </svg>
        </div>
        <div class="num">
            <span>12321</span>
            <span style="margin-left:10px;font-size:14px;color:#9e9ea5">17.7%</span>
            <svg t="1667311777929" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="3049" width="12" height="12">
                <path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="3050"></path>
            </svg>
            <svg t="1667311818974" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="4065" width="12" height="12">
                <path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="4066"></path>
            </svg>
        </div>
        <div class="chart" ref="chart"></div>

    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'chart',
    mounted() {
        let mychart = echarts.init(this.$refs.chart)
        mychart.setOption({
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
                    data: [22, 15, 47, 63, 24, 74, 36, 22],
                    itemStyle: {
                        opacity: 0
                    },
                    lineStyle: {
                        color: "#ff9569"
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: '#e92758' },
                                { offset: 1, color: "white" }
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

<style scoped>
.size {
    font-size: 12px;
    display: flex;
    justify-content: left;
    color: #9e9ea5
}

.num {
    font-size: 18px;
    margin-top: 10px
}

.chart {
    width: 100%;
    height: 50px
}
</style>