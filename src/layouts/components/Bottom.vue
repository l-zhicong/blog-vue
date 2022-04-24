<template>
  <div class="app-bottom">
    我就不备案，该后端已部署到k8s上请放心食用
  </div>
</template>

<script>
export default {
  name: "Bottom"
}
</script>

<style scoped>
  .app-bottom {
    height: 20px;
    text-align:center;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
