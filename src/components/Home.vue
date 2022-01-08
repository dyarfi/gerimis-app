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
        <!-- <strong>{{ city && getTemp(city.main.temp) }}</strong> -->
        <!-- <strong>{{ temp }}</strong> -->
      </p>
      <span
        ><strong
          >{{ city && city.main.temp }}°{{ temp || '' }} /
          {{ fToC(city.main.temp) }}° C</strong
        >
      </span>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { fToC } from '@/utils'

export default {
  computed: {
    ...mapState({
      city: state => state.currentCity.data,
      temp: state => state.setup.temp
    })
  },
  methods: {
    ...mapActions({
      setTemp: 'setTemp'
    }),
    fToC
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
