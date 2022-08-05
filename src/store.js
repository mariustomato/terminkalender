import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";

const state = reactive({
    calendarWeekData,
    activeView: "CalendarWeek",
});

const getters = {
    activeDay: () => state.calendarWeekData.find((day) => day.active),
    activeView: () => state.activeView,
};

const mutations = {
    deleteEvent(dayId, eventTitle) {
        state.calendarWeekData.find((day) => day.id === dayId).events.splice(state.calendarWeekData.find((day) => day.id === dayId).events.findIndex((event) => event.title === eventTitle), 1);
        //const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
        //const index = dayObj.events.findIndex((event) => event.title === eventTitle);
        //dayObj.events.splice(index, 1);
    },
    editEvent(dayId, eventTitle) {
        state.calendarWeekData.map((dayObj) => {
            dayObj.events.map((event) => (event.edit = false));
        })
        const currentDay = state.calendarWeekData.find((day) => day.id === dayId);
        const currentEvent = currentDay.events.find((event) => event.title === eventTitle);
        currentEvent.edit = true;
    },
    updateEvent(dayId, oldEventTitle, newEventObject) {
        const newEventTitle = newEventObject.title !== "" ? newEventObject.title : oldEventTitle;
        const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
        const eventObj = dayObj.events.find((event) => event.title === oldEventTitle);
        eventObj.title = newEventTitle;
        eventObj.priority = Number(newEventObject.priority);
        eventObj.edit = false;
    },
    setActiveDay(dayId) {
        state.calendarWeekData.map((day) => (day.active = false))
        const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
        dayObj.active = true;
    },
    addEvent(eventObj) {
        console.log(eventObj);
        const dayObj = getters.activeDay();
        //dayObj.events.join(eventObj);
        dayObj.events.push({
            title: eventObj.title,
            edit: false,
            color: eventObj.color,
            priority: Number(eventObj.priority)
        });
    },
    setActiveView(view) {
        state.activeView = view;
    }
};

export default {
    state: readonly(state),
    getters,
    mutations,
}