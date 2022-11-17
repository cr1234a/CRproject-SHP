<template>
  <div>
    <cart></cart>
    <sale></sale>
    <floor></floor>
  </div>
</template>

<script>
import cart from './Card'
import sale from './Sale'
import floor from './floor'
export default {
  name: 'Dashboard',
  components: {
    cart,
    sale,
    floor
  },
}
</script>

<style lang="scss" scoped>

</style>
