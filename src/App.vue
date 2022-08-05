<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <keep-alive>
          <component :is="activeView" />
        </keep-alive>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4 offset-4">
        <CalendarEntry />
      </div>
      <div class="col-2 offset-2">
        <div class="float-end">
          <!-- Mit dem Button blenden wir die Calendar-Settings-Component ein bzw. aus. -->
          <button class="btn btn-lg mb-2" :class="buttonSettings" @click="viewSettings()">
            <i class="fas fa-cogs"></i>
          </button>
        </div>
        <CalendarSettings v-show="settings" />
      </div>
    </div>
  </div>
</template>

<script>
import CalendarWeek from "./components/CalendarWeek";
import CalendarWeekAsList from "./components/CalendarWeekAsList"
import CalendarEntry from "./components/CalendarEntry";
import CalendarSettings from "./components/CalendarSettings";
import Store from "./store";
export default {
  name: "App",
  components: {
    CalendarWeek,
    CalendarWeekAsList,
    CalendarEntry,
    CalendarSettings
  },
  data() {
    return {
      settings: false,
    }
  },
  computed: {
    buttonSettings() {
      return this.settings ? ["btn-success"] : ["btn-outline-success"];
    },
    activeView() {
      return Store.getters.activeView();
    }
  },
  methods: {
    viewSettings() {
      this.settings = !this.settings;
    }
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";

.square {
  width: 40px;
  height: 40px;
}
</style>
