<template>
    <div class="card border-start" :class="cardClasses">
        <div class="card-header text-center" :class="cardHeaderClasses" role="button" @click="setActive()">
            <strong>{{ day.fullName }}</strong>
        </div>
        <div class="card-body">
            <transition name="fade" mode="out-in">
                <div v-if="day.events.length">
                    <transition-group name="list">
                        <CalendarEvent v-for="event in events" :key="event.title" :event="event" :day="day">
                            <template #eventPriority="slotProps">
                                {{ slotProps.priorityDisplayName }}
                            </template>
                            <template #default="{ event: brot }">
                                {{ brot.title }}
                            </template>
                        </CalendarEvent>
                    </transition-group>
                </div>
                <div v-else>
                    <div class="alert alert-light text-center">
                        <i>Keine Termine.</i>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>



<script>
import CalendarEvent from './CalendarEvent';
import Store from '../store';
export default {
    name: "CalendarDay",
    components: {
        CalendarEvent
    },
    props: {
        day: {
            type: Object,
            required: true,
            default: function () {
                return {
                    id: -1,
                    fullName: "Fehlender Wochentag",
                    events: []
                }
            },
            validator: function (value) {
                if (Object.keys(value).includes("id")) {
                    return true;
                }
            },
        },
    },
    computed: {
        cardClasses() {
            return this.day.id === Store.getters.activeDay().id ? ["border-primary"] : null;
        },
        cardHeaderClasses() {
            return this.day.id === Store.getters.activeDay().id ? ["bg-primary", "text-white"] : null;
        },
        events() {
            return Store.getters.events(this.day.id);
        }
    },
    methods: {
        setActive() {
            Store.mutations.setActiveDay(this.day.id);
        }
    }
}
</script>



<style scoped>
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-enter-to,
.list-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.list-enter-active,
.list-leave-active {
    transition: all 1s ease;
}

.list-move {
    transition: transform 0.8s ease;
}
</style>