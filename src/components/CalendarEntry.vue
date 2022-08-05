<template>
    <div id="calender-entry">
        <div class="card">
            <div class="card-header text-center">
                <h5>Neuer Termin für: <strong> {{ activeDay }} </strong></h5>
            </div>
            <div class="card-body">
                <div class="alert alert-danger" v-if="error"> Der Titel darf nicht leer sein! </div>
                <input type="text" class="form-control" ref="eventTitleInput" placeholder="Neuer Eintrag"
                    v-model="event.title" @keyup.enter.exact="addNewEvent()" @keyup.ctrl.enter="resetEventInput()" />
                <select class="form-select mt-2" v-model="event.priority">
                    <option value="-1">Hoch</option>
                    <option value="0">Mittel</option>
                    <option value="1">Tief</option>
                </select>
                <div class="text-center mt-3">
                    <span v-for="color in eventColors" :key="color" class="d-inline-block alert m-0 me-2 square"
                        :class="eventColorClasses(color)" role="button" @click="changeColor(color)">
                    </span>
                </div>
                <hr />
                <div class="d-grid gap-2">
                    <button class="btn btn-primary" @click="addNewEvent()">Eintragen</button>
                    <button class="btn btn-danger" @click="resetEventInput()">Inhalt löschen</button>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import Store from "../store";
export default {
    name: "CalendarEntry",
    data() {
        return {
            eventColors: ["primary", "success", "info", "warning", "danger"],
            event: {
                title: "",
                color: "primary",
                priority: "0",
            },
            error: false,
        }
    },
    computed: {
        activeDay() {
            return Store.getters.activeDay().fullName;
        }
    },
    mounted() {
        this.$refs.eventTitleInput.focus();
    },
    methods: {
        eventColorClasses(color) {
            return ["alert-" + color,
            this.event.color === color ? "border border-" + this.event.color : ""];
        },
        changeColor(color) {
            this.event.color = color;
        },
        addNewEvent() {
            if (this.event.title === "") {
                this.$nextTick(() => {
                    this.$refs.eventTitleInput.focus();
                });
                return (this.error = true)
            }
            Store.mutations.addEvent(this.event);
            this.error = false;
            this.event = {
                title: "",
                color: "primary",
                priority: "0",
            }
        },
        resetEventInput() {
            this.event = {
                title: "",
                color: "primary",
                priority: "0",
            }
        }
    }
}
</script>



<style scoped>
</style>