<script lang="ts">
import {defineComponent, onMounted, ref, Ref, PropType, computed} from 'vue'
import Calendar, {Options} from "@toast-ui/calendar";
import {GetLessonResponse} from "@/dto/response/getLessonResponse";
import {EventObject} from "@toast-ui/calendar/types/types/events";
export default defineComponent({
    name: 'MonthlyCalendar',
    props: {
        precreatedLessons: {
            type: Array as PropType<GetLessonResponse[]>,
            default: () => []
        },
        subjectName: {
            type: String as PropType<string>,
            required: true
        },
        calendarId: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup(props) {
        const calendarContainer: Ref<HTMLDivElement | null> = ref(null);
        let calendarInstance: Calendar;

        const calendarEvents: Ref<EventObject[]> = computed(function() {
            if (props.precreatedLessons.length == 0) {
                return [];
            }
            return props.precreatedLessons!.map((lesson, index) => {
                const eventObject: EventObject = {
                    id: index,
                    calendarId: props.calendarId,
                    title: props.subjectName,
                    category: 'time',
                    start: lesson.startDate,
                    end: lesson.endDate,
                    isReadOnly: true,
                }
                return eventObject;
            })
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
                    useDetailPopup: true,
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

                calendarInstance.createEvents(calendarEvents.value);
            }
        });

        return { calendarContainer }

    }


})

</script>

<template>
    <div class="m-3 p-3" ref="calendarContainer" style="height: 300px;"></div>
</template>

