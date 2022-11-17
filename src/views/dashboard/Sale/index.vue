<template>
    <el-card class="box-card" style="margin:10px 0">
        <div slot="header" class="clearfix">
            <el-tabs class="top" v-model="activeName" @tab-click="handleClick">
                <!--  @tab-click="handleClick" -->
                <el-tab-pane label="销售额" name="first"></el-tab-pane>
                <el-tab-pane label="访问量" name="second"></el-tab-pane>
            </el-tabs>
            <div class="right">
                <span @click="day">本日</span>
                <span @click="week">本周</span>
                <span @click="month">本月</span>
                <span class="span" @click="year">本年</span>
                <el-date-picker class='data' type="daterange" range-separator="-" start-placeholder="开始日期"
                    end-placeholder="结束日期" size="small" v-model="formate" :unlink-panels="true">
                </el-date-picker> <!-- v-model="value1" -->
            </div>
        </div>
        <div>
            <el-row :gutter="10" class="move">
                <el-col :span="16">
                    <div class="left" ref="left"></div>
                </el-col>
                <el-col :span="8">
                    <div v-show="this.activeName == 'first'">
                        <h3>门店{{ title }}排名</h3>
                        <ul>
                            <li>
                                <span class="dot">1</span>
                                <span class="two">肯德基</span>
                                <span class="three">32,3234</span>
                            </li>
                            <li>
                                <span class="dot">2</span>
                                <span class="two">麦当劳</span>
                                <span class="three">29,9132</span>
                            </li>
                            <li>
                                <span class="dot">3</span>
                                <span class="two">海底捞</span>
                                <span class="three">26,6223</span>
                            </li>
                            <li>
                                <span class="dot">4</span>
                                <span class="two">华莱士</span>
                                <span class="three">22,3445</span>
                            </li>
                            <li>
                                <span class="dot">5</span>
                                <span class="two">汉堡王</span>
                                <span class="three">21,9663</span>
                            </li>
                            <li>
                                <span class="dot">6</span>
                                <span class="two">德克士</span>
                                <span class="three">19,2683</span>
                            </li>
                        </ul>
                    </div>
                    <div v-if="this.activeName !== 'first'" ref="bie" style="width:100%;height:300px">
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
import * as echarts from 'echarts'
import moment from 'moment';
export default {
    name: "sale",
    data() {
        return {
            activeName: 'first',
            myChart: null,
            formate: [],
            series: []
        }
    },
    methods: {
        // 时间切换
        month() {
            let start = moment().startOf('month').format('YYYY-MM-DD')
            let end = moment().endOf('month').format('YYYY-MM-DD')
            this.formate = [start, end]
        },
        day() {
            let start = moment().startOf('day').format('YYYY-MM-DD')
            this.formate = [start, start]
        },
        week() {
            const start = moment().weekday(1).format('YYYY-MM-DD'); //本周一
            const end = moment().weekday(7).format('YYYY-MM-DD');
            this.formate = [start, end]
        },
        year() {
            let start = moment().startOf('year').format('YYYY-MM-DD')
            let end = moment().endOf('year').format('YYYY-MM-DD')
            this.formate = [start, end]
        },
        handleClick(tab) {
            if (tab.name == 'second') {
                // this.$refs.bie.style.width = '100%'
                // this.$refs.bie.style.height = '300px'
                this.$nextTick(() => {
                    const mychart = echarts.init(this.$refs.bie)
                    mychart.setOption(
                        {
                            title: {
                                text: '门店全年访问量',
                                left: 'left'
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'right'
                            },
                            series: [
                                {
                                    // name: '门店访问量占比',
                                    type: 'pie',
                                    radius: '50%',
                                    data: [
                                        { value: 1048, name: '肯德基' },
                                        { value: 735, name: '麦当劳' },
                                        { value: 580, name: '海底捞' },
                                        { value: 484, name: '华莱士' },
                                        { value: 300, name: '汉堡王' },
                                        { value: 250, name: '德克士' }
                                    ],
                                    emphasis: {
                                        itemStyle: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ],
                            grid: {
                                left: '0%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true,
                            }

                        }
                    )
                })

            }
        }
    },
    computed: {
        title() {
            return this.activeName == 'first' ? '销售额' : '访问量'
        }
    },
    watch: {
        title() {
            if (this.activeName == 'second') {
                this.series = [
                    {
                        name: `${this.title}趋势`,
                        type: 'bar',
                        barWidth: '60%',
                        data: [50, 75, 250, 442, 120, 340, 118, 379, 420, 78, 112, 327],
                        itemStyle: {
                            color: '#a90000'
                        }
                    }
                ]
            } else {
                this.series = [
                    {
                        name: '销售额趋势',
                        type: 'bar',
                        barWidth: '60%',
                        data: [82, 52, 200, 334, 390, 330, 220, 250, 330, 158, 468, 278],
                        itemStyle: {
                            color: '#5470c6'
                        }
                    }
                ]
            }
            this.myChart.setOption({
                title: {
                    text: `${this.title}趋势`
                },
                series: this.series
            })
        }
    },
    mounted() {
        this.myChart = echarts.init(this.$refs.left)
        this.myChart.setOption({
            title: {
                text: '销售额趋势'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '销售额趋势',
                    type: 'bar',
                    barWidth: '60%',
                    data: [82, 52, 200, 334, 390, 330, 220, 250, 330, 158, 468, 278],
                }
            ]
        })

    }
}
</script>

<style scoped>
.clearfix {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-bottom: 0px !important;
}

.top {
    width: 100%;
}

.right {
    position: absolute;
    right: 0
}

.right span {
    margin: 0 10px;
    font-size: 13px;
    cursor: pointer
}

.right .span {
    margin: 0 20px 0 10px;
}

.left {
    width: 100%;
    height: 300px
}

.move {
    transform: translateY(-35px);
}

h3 {
    transform: translateY(-20px);
}

ul {
    list-style: none;
    width: 100%;
    height: 200px
}

.dot {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #2f3430;
    border-radius: 50%;
    color: white;
    text-align: center;
    line-height: 20px;
    /* font-size: 16px; */
    /* vertical-align: middle; */
}

.two {
    margin: 0px 40px
}

.three {
    float: right;
    color: #e1251b
}

ul li:nth-child(n+2) {
    margin-top: 20px
}
</style>