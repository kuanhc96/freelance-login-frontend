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
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.golf {
  background-color: #3d008d;
  color: white;
}

.english {
  background-color: #71008d;
  color: white;
}

.holes {
  background-color: #8d006e;
  color: white;
}

</style>