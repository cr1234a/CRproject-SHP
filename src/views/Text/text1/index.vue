<template>
    <div>
        <el-button v-show="$store.state.user.buttons.indexOf('but.Add1') != -1">测试管理1</el-button>
        <el-button v-show="$store.state.user.buttons.indexOf('but.Add2') != -1">测试管理2</el-button>
    </div>
</template>

<script>
export default {
    name: 'text1'
}
</script>

<style>

</style>