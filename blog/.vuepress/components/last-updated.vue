<template>
  <div class="last-updated">
    {{ text }} {{ $page.lastUpdated }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: 'Última modificación'
      }
    }
  }
</script>

<style scoped>
  .last-updated {
    display: inline-flex;
    line-height: 12px;
    font-size: 12px;
    margin-right: 20px;
  }
</style>
