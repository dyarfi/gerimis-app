<template>
  <div class="wrapper-map">
    <div class="w-full">
      <div class="search-wrapper">
        <a href="/#/dashboard" class="pr-6 py-3"
          ><svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.79995 3.00001L3.79995 9.00001L9.79995 15L8.59995 17.4L0.199951 9.00001L8.59995 0.600006L9.79995 3.00001Z"
              fill="black"
            /></svg
        ></a>
        <input
          type="text"
          placeholder="Enter cities"
          class="input-search"
          v-model="query"
          v-on:keyup.enter="
            e => {
              search({
                query: e.currentTarget.value
              })
              closeDetail = false
            }
          "
        />
        <a class="text-xl font-bold align-middle" href="/#/dashboard">...</a>
      </div>
      <div
        v-if="searchCity && searchCity.status === 'success'"
        :class="cities.length > 0 ? `card-city-wrapper` : `hidden`"
      >
        <a
          v-on:click="closeDetail = !closeDetail"
          class="text-gray-700 block w-full text-right mb-1 mr-0 pr-0 text-xs"
        >
          {{ closeDetail ? 'Open' : 'Close' }}
        </a>
        <div v-if="cities && cities.length > 0">
          <div
            :class="
              `card-city${
                !closeDetail
                  ? ` h-full overflow-auto border-b-2 border-gray-300`
                  : ` h-0 overflow-hidden p-0 m-0`
              }`
            "
            v-for="city in cities"
            :key="city.name"
          >
            <a
              v-on:click="
                removeCity({
                  id: city.id
                })
              "
              class="text-gray-700 block w-full mt-1"
              ><img src="@/assets/icon-x.svg" width="28" class="ml-auto" />
            </a>
            <div class="w-1/12">
              <img src="@/assets/pin-dark.svg" />
            </div>
            <div class="w-4/12 text-left">
              <div>
                <h3 class="font-bold">{{ city.name }}</h3>
              </div>
              <div>
                <h4 class="text-gray-400">{{ city.sys.country }}</h4>
              </div>
            </div>
            <div class="w-7/12 text-center">
              <div class="flex flex-row flex-wrap items-center">
                <div class="w-1/2">
                  <img
                    v-if="city.weather && city.weather[0]"
                    :src="
                      `${API_OMAP_BASE}img/wn/${city.weather[0].icon}@2x.png`
                    "
                    class="mx-auto"
                    width="100"
                  />
                </div>
                <div class="w-1/2">
                  <h4 class="text-1xl">{{ city.main.temp }}&#8457;</h4>
                </div>
              </div>
              <div class="flex flex-col">
                <h4 class="text-2xl capitalize">
                  {{ city.weather && city.weather[0].description }}
                </h4>
              </div>
            </div>
            <div class="w-full">
              <div class="flex flex-row flex-wrap items-start my-4 text-left">
                <div class="w-1/2">
                  <div class="text-xs text-gray-400">
                    Longitude and latitude
                  </div>
                  <div class="text-base">
                    {{ city.coord.lat }},
                    {{ city.coord.lon }}
                  </div>
                </div>
                <div class="w-1/2">
                  <div class="text-xs text-gray-400">Wind</div>
                  <div class="text-base">{{ city.wind.speed }}mph</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="searchCity.status === 'error'" class="card-city-wrapper">
        <div class="card-city px-3 py-4">
          <h1 class="font-bold">City not found : {{ query }}</h1>
        </div>
      </div>
      <iframe
        style="border:0"
        loading="lazy"
        class="maps-embed"
        allowfullscreen
        :src="
          `${API_GMAP_URL}key=${API_GMAP_KEY}&amp;q=${(searchCity.data &&
            searchCity.data.coord &&
            `${searchCity.data.coord.lat},${searchCity.data.coord.lon}`) ||
            city.name}&amp;zoom=8`
        "
      >
      </iframe>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { API_OMAP_BASE, API_GMAP_URL, API_GMAP_KEY } from '@/constants/env'

export default {
  data() {
    return {
      closeDetail: false,
      query: '',
      API_GMAP_URL,
      API_GMAP_KEY,
      API_OMAP_BASE
    }
  },
  computed: {
    ...mapState({
      city: state => state.currentCity.data,
      searchCity: state => state.currentSearch,
      cities: state => state.cities
    })
  },
  methods: {
    ...mapActions({
      search: 'getCurrentSearch',
      removeCity: 'removeCity'
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
</style>
