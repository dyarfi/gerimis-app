<template>
  <div id="app" class="main-app">
    <router-view v-if="!errors" />
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
      const { $store } = this
      if (!('geolocation' in navigator)) {
        this.errors = 'Geolocation is not available.'
        return
      }
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
          this.errors = err.message
        }
      )
    }
  },
  created() {
    const vm = this
    vm.getWeatherByLocation()
  },
  computed: {
    ...mapState({
      city: state => state.currentCity.data
    })
  }
}
</script>
