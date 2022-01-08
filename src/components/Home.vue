<template>
  <div class="wrapper mt-24">
    <router-link to="/dashboard">
      <img
        alt="App logo"
        src="@/assets/app.svg"
        class="mx-auto animate-bounce hover:animate-spin"
      />
      <h1>Gerimis</h1>
      <p class="mx-auto">
        Dont worry about the weather we all here
      </p>
      <p class="mx-auto mt-5 font-bold">
        {{ city && city.name }}
      </p>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      city: state => state.currentCity.data
    })
  }
}
</script>

<style scoped lang="postcss">
h1 {
  font-size: 2.125rem;
  margin-bottom: 1.625rem;
  @apply font-bold mix-blend-hard-light;
}
p {
  max-width: 14.313rem;
  letter-spacing: 0.43012px;
}
</style>
