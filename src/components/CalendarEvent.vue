<template>
    <div id="calendar-event">
        <div class="alert text-center" :class="alertColor">
            <transition name="fade" mode="out-in">
                <div v-if="!event.edit">
                    <div>
                        <slot name="eventPriority" :priorityDisplayName="priorityDisplayName"><strong>No Priority
                                :c</strong></slot>
                    </div>
                    <slot :event="event"> Failed :C </slot>
                    <div>
                        <i class="fas fa-edit me-2" role="button" @click="editEvent()"></i>
                        <i class="far fa-trash-alt" role="button" @click="deleteEvent()"></i>
                    </div>
                </div>
                <div v-else>
                    <select class="form-select" v-model="newEventPriority">
                        <option value="-1">Hoch</option>
                        <option value="0">Mittel</option>
                        <option value="1">Tief</option>
                    </select>
                    <input type="text" class="form-control mt-2" ref="newEventTitleInput" :placeholder="event.title"
                        @input="setNewEventTitle($event)" />
                    <hr>
                    <i class="fas fa-check" role="button" @click="saveEdit()"></i>
                </div>
            </transition>
        </div>
    </div>

</template>



<script>
import Store from '../store';
export default {
    name: "CalendarEvent",
    props: {
        event: Object,
        day: Object,
    },
    data() {
        return {
            newEventTitle: this.event.title,
            newEventPriority: this.event.priority,
        }
    },
    computed: {
        priorityDisplayName() {
            switch (this.event.priority) {
                case 1:
                    return "Tief";
                case 0:
                    return "Mittel"
                case -1:
                    return "Hoch";
            }
            return "Undefinierbar";
        },
        alertColor() {
            return "alert-" + this.event.color;
        }
    },
    methods: {
        deleteEvent() {
            Store.mutations.deleteEvent(this.day.id, this.event.title);
        },
        editEvent() {
            Store.mutations.editEvent(this.day.id, this.event.title);
            this.$nextTick(() => {
                this.$refs.newEventTitleInput.focus();
            });
        },
        setNewEventTitle(event) {
            this.newEventTitle = event.target.value;
        },
        setNewEventPriority(event) {
            this.newEventPriority = event.target.value;
        },
        saveEdit() {
            Store.mutations.updateEvent(this.day.id, this.event.title, { title: this.newEventTitle, priority: this.newEventPriority });
        }
    }
}
</script>



<style scoped>
</style>