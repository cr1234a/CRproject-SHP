<template>
    <el-row :gutter="10">
        <el-col :span="12">
            <left></left>
        </el-col>
        <el-col :span="12">
            <right></right>
        </el-col>
    </el-row>
</template>

<script>
import left from './left'
import right from './right'
export default {
    name: 'floor',
    components: {
        left,
        right,
    }
}
</script>

<style>

</style>