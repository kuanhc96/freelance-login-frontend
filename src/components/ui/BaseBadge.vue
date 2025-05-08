<template>
    <base-button class="badge" :class="type"
      link :to="to">
      <span >
          {{title}}
      </span>
    </base-button>
</template>

<script>
export default {
    props: ['type', 'title'],
    computed: {
        text() {
            return this.title.toUpperCase();
        },
        to() {
          return '/subjects/' + this.title; 
        }
    }, 
}
</script>

<style scoped>
</style>