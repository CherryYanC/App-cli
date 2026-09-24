<script lang="ts">
export default {}
</script>

<style lang="scss">
/*
 * uni-ui 部分弹层的默认层级低于应用 TabBar。
 * 在应用入口统一抬高弹层容器，确保其遮罩和内容始终覆盖底部导航。
 */
.uni-popup {
  z-index: $app-z-index-modal !important;
}

.uni-drawer {
  z-index: $app-z-index-modal !important;
}
</style>
