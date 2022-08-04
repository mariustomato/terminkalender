<template>
    <div id="calendar-event">
        <div class="alert text-center" :class="alertColor">
            <template v-if="!event.edit">
                <div>
                    <slot name="eventPriority" :priorityDisplayName="priorityDisplayName"><strong>No Priority
                            :c</strong></slot>
                </div>
                <slot :event="event"> Failed :C </slot>
                <div>
                    <i class="fas fa-edit me-2" role="button" @click="editEvent()"></i>
                    <i class="far fa-trash-alt" role="button" @click="deleteEvent()"></i>
                </div>
            </template>
            <template v-else>

            </template>
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
            null
        }
    }
}
</script>



<style scoped>
</style>