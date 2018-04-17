<template>
  <div>
    <h1>{{data}}</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    // const data = await app.$axios.get('/api/index')
    // return { data }

    const { data } = await app.$axios.post("/api/foo");
    return { data };
  }
};
</script>
