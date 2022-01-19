<template>
  <div id="app" class="main-app">
    <router-view v-if="!errors" />
    <div
      v-else
      class="flex items-center justify-center h-screen xl:w-1/2 mx-auto px-6"
    >
      <h1 class="text-3xl md:text-6xl md:font-bold text-center">
        {{ errors }}
        <small class="text-lg md:text-xl block mt-4"
          >Please re-check your internet or your browser permission to
          continue.</small
        >
      </h1>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data: function() {
    return {
      locationLatLong: {},
      getLocation: false,
      cityName: '',
      errors: null
    }
  },
  methods: {
    getWeatherByLocation() {
      const { setErrors, $store } = this
      if (!('geolocation' in navigator)) {
        setErrors('Geolocation is not available.')
      } else {
        this.getLocation = true
        navigator.geolocation.getCurrentPosition(
          pos => {
            this.getLocation = false
            this.locationLatLong = pos
            $store.dispatch('getCurrentCity', {
              lat: `${pos.coords.latitude}`,
              long: `${pos.coords.longitude}`
            })
          },
          err => {
            this.getLocation = false
            setErrors(err.message)
          }
        )
      }
    },
    setErrors(errors) {
      this.errors = errors
    }
  },
  created() {
    const vm = this
    vm.getWeatherByLocation()
    // vm.$store.dispatch('setTemp', vm.$store.state.setup.temp)
  },
  computed: {
    ...mapState({
      city: state => state.currentCity.data
    })
  }
}
</script>
