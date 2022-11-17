<template>
    <el-card>
        <div class="search">
            <div>线上热门搜索</div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item>双皮奶</el-dropdown-item>
                    <el-dropdown-item>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- <div class="chart-position"> -->
        <el-row :gutter="10" class="chart-position">
            <el-col :span="12">
                <chart></chart>
            </el-col>
            <el-col :span="12">
                <chart></chart>
            </el-col>
        </el-row>
        <!-- </div> -->
        <div style="margin-top:20px">
            <el-table :data="tableData" style="width: 100%;" border>
                <el-table-column label="排名" width="80" align="center" type="index">
                </el-table-column>
                <el-table-column label="搜索关键字" width="180" align="center">
                </el-table-column>
                <el-table-column label="用户数" sortable align="center">
                </el-table-column>
                <el-table-column label="周涨幅" sortable align="center">
                </el-table-column>
            </el-table>
        </div>
        <el-pagination background layout="prev, pager, next" :total="1000" class="pag">
        </el-pagination>
    </el-card>
</template>

<script>
import chart from './charts'
export default {
    name: 'left',
    data() {
        return {
            tableData: [{}]
        }
    },
    components: {
        chart
    }
}
</script>

<style scoped>
.search {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
}

.chart-position {
    margin-top: 10px
}

.pag {
    display: flex;
    justify-content: end;
    margin-top: 10px
}
</style>