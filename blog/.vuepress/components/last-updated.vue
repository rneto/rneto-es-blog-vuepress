<template>
  <div class="last-updated">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
      <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
    </svg>
    {{ text }} {{ $page.lastUpdated }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: 'Última revisión'
      }
    },
    mounted: function() {
      this.appendToHeader()
    },
    methods: {
      appendToHeader: function() {
        setTimeout(() => {
          let headerReference = document.querySelector('.post-meta-date');
          let lastUpdatedReference = document.querySelector('.last-updated');
          if (headerReference && lastUpdatedReference) {
            headerReference.after(lastUpdatedReference);
          }
        }, 100);
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
