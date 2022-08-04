import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";

const state = reactive({
    calendarWeekData,
});

const getters = {
    activeDay: () => state.calendarWeekData.find((day) => day.active),
};

const mutations = {
    deleteEvent(dayId, eventTitle) {
        state.calendarWeekData.find((day) => day.id === dayId).events.splice(state.calendarWeekData.find((day) => day.id === dayId).events.findIndex((event) => event.title === eventTitle), 1);
        //const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
        //const index = dayObj.events.findIndex((event) => event.title === eventTitle);
        //dayObj.events.splice(index, 1);
    }
};

export default {
    state: readonly(state),
    getters,
    mutations,
}