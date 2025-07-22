<script lang="ts">
import {defineComponent, onMounted, ref, Ref, PropType, computed} from 'vue'
import Calendar, {Options} from "@toast-ui/calendar";
export default defineComponent({
    name: 'MonthlyCalendar',
    props: {
        startDate: {
            type: String as PropType<string>,
            required: true
        },
        startTime: {
            type: String as PropType<string>,
            required: true
        },
        duration: {
            type: Number as PropType<number>,
            required: true
        },
        subjectName: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup(props) {
        const calendarContainer: Ref<HTMLDivElement | null> = ref(null);
        let calendarInstance: Calendar;

        const endDateTime: Ref<string> = computed(function() {
            const inputDateTime: Date = new Date(props.startDate + "T" + props.startTime);
            inputDateTime.setMinutes(inputDateTime.getMinutes() + props.duration);

            const pad = (n: number) => n.toString().padStart(2, '0');

            const year = inputDateTime.getFullYear();
            const month = pad(inputDateTime.getMonth() + 1); // Months are 0-based
            const day = pad(inputDateTime.getDate());
            const hours = pad(inputDateTime.getHours());
            const minutes = pad(inputDateTime.getMinutes());
            const seconds = pad(inputDateTime.getSeconds());

            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        })


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
                        calendarId: 'monthly-form',
                        title: props.subjectName,
                        category: 'time',
                        start: props.startDate + "T" + props.startTime,
                        end: endDateTime.value
                    }
                ]);
            }
        });

        return { calendarContainer }

    }


})

</script>

<template>
    <div class="m-3 p-3" ref="calendarContainer" style="height: 300px;"></div>
</template>

<style scoped>

</style>
