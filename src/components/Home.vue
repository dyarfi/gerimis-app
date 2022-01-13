<template>
  <div class="wrapper mt-24">
    <router-link to="/dashboard">
      <ph-sun-horizon
        class="mx-auto animate-bounce mb-6"
        :size="84"
        color="#ffffff"
        weight="thin"
      />
      <!-- <ph-cloud-sun
        class="mx-auto animate-bounce mb-6"
        :size="84"
        color="#ffffff"
        weight="thin"
      /> -->
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
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-32 w-32 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
          <path
            class="animate-bounce"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M5 13l4 4L19 7"
          />
        </svg> -->
        <!-- <svg
          class="h-32 w-32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg> -->
      </span>
    </router-link>
  </div>
</template>

<script>
// import { PhSunHorizon, PhCloudSun } from 'phosphor-vue'
import { PhSunHorizon } from 'phosphor-vue'
import { mapState, mapActions } from 'vuex'
import { fToC } from '@/utils'

export default {
  components: {
    PhSunHorizon
    // PhCloudSun
  },
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
