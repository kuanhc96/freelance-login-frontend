<script lang="ts">
import {defineComponent, onMounted, ref, Ref} from 'vue'
import Calendar, {Options} from "@toast-ui/calendar";
export default defineComponent({
    name: 'MonthlyCalendar',
    setup() {
        const calendarContainer: Ref<HTMLDivElement | null> = ref(null);
        let calendarInstance: Calendar;

        onMounted(() => {
            if (calendarContainer.value) {
                const options: Options = {
                    defaultView: 'month',
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
                    month: {
                        startDayOfWeek: 1,
                        visibleWeeksCount: 3,
                        visibleEventCount: 3
                    },
                    gridSelection: {
                        enableDblClick: false,
                        enableClick: true
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
