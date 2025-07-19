<script lang="ts">
import {defineComponent, onMounted, Ref, ref} from 'vue'
import Calendar, {Options} from "@toast-ui/calendar";
export default defineComponent({
    name: 'CalendarPage',
    setup() {
        const calendarContainer: Ref<HTMLDivElement | null> = ref(null);
        let calendarInstance: Calendar;

        onMounted(() => {
            if (calendarContainer.value) {
                const options: Options = {
                    defaultView: 'week',
                    isReadOnly: true,
                    timezone: {
                        zones: [
                            {
                                timezoneName: 'Asia/Taipei',
                                displayLabel: 'Taipei'
                            }
                        ]
                    },
                    useDetailPopup: false,
                    useFormPopup: false,
                    week: {
                        startDayOfWeek: 1,
                        hourStart: 8,
                        hourEnd: 21,
                        eventView: ['time'],
                        taskView: false
                    }
                }
                calendarInstance = new Calendar(calendarContainer.value, options);

                calendarInstance.createEvents([
                    {
                        id: '1',
                        calendarId: '1',
                        title: 'Meeting',
                        category: 'time',
                        start: '2025-07-16T10:30:00',
                        end: '2025-07-16T12:30:00'
                    }
                ]);
            }
        });

        return { calendarContainer }
    }
})

</script>

<template>
    <div class="m-3 p-3" ref="calendarContainer" style="height: 600px;"></div>
</template>

<style scoped>

</style>
