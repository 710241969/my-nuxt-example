<template>
  <h1>{{data}}</h1>
</template>

<script>
export default {
  async asyncData({ app }) {
    const { data } = await app.$axios.get('/api/bar')
    return { data }
  }
}
</script>
