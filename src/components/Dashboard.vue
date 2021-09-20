<template>
  <div class="wrapper">
    <div class="flex flex-col">
      <div class="w-10/12 sm:w-3/12 mx-auto mb-6 text-left">
        <h6 class="text-sm mb-4 pt-2 mix-blend-overlay">Current location</h6>
        <router-link to="/detail" class="flex flex-row font-bold"
          ><img alt="App logo" src="@/assets/pin.svg" class="mr-2" />
          {{ city && city.name }}
        </router-link>
      </div>
      <div class="w-10/12 sm:w-3/12 mx-auto my-6 mb-6 text-left">
        <router-link
          to="/search"
          class="flex flex-row font-bold hover:text-dark mix-blend-overlay mb-8"
          ><img alt="App logo" src="@/assets/pin-add.svg" class="mr-2" /> Add
          Location</router-link
        >
        <slot v-for="city in cities">
          <router-link
            :key="city.id"
            :to="{ name: 'detailId', params: { id: city.id } }"
            class="flex flex-row font-normal mb-4"
            ><img :alt="city.name" src="@/assets/pin.svg" class="mr-2" />
            {{ city.name }}</router-link
          >
        </slot>
      </div>
      <div class="w-10/12 sm:w-3/12 mx-auto mt-6 mb-6 text-left">
        <a href="/" class="flex flex-row font-bold mb-4"
          ><img alt="App logo" src="@/assets/pin.svg" class="mr-2" />
          Settings</a
        >
        <a href="/" class="flex flex-row font-bold mb-4"
          ><img alt="App logo" src="@/assets/pin.svg" class="mr-2" /> Share this
          app
        </a>
        <a href="/" class="flex flex-row font-bold mb-4"
          ><img alt="App logo" src="@/assets/pin.svg" class="mr-2" /> Rate this
          app</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      city: state => state.currentCity.data,
      cities: state => state.cities.slice(0, 10)
    })
  }
}
</script>

<style scoped lang="postcss">
h1 {
  font-size: 2.125rem;
  margin-bottom: 1.625rem;
  @apply font-bold;
}
p {
  max-width: 14.313rem;
  letter-spacing: 0.43012px;
  @apply mix-blend-overlay;
}
</style>
