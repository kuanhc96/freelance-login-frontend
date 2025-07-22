<script lang="ts">
import {defineComponent, onMounted, Ref, ref, PropType, computed} from 'vue'
import Calendar, {Options} from "@toast-ui/calendar";
import {GetLessonResponse} from "@/dto/response/getLessonResponse";
import {EventObject} from "@toast-ui/calendar/types/types/events";
export default defineComponent({
    name: 'CalendarPage',
    props: {
        lessons: {
            type: Array as PropType<GetLessonResponse[]>,
            default:() => []
        }
    },
    setup(props) {
        const calendarContainer: Ref<HTMLDivElement | null> = ref(null);
        let calendarInstance: Calendar;

        const calendarEvents: Ref<EventObject[]> = computed(function() {
            if (props.lessons.length == 0) {
                return [];
            }
            return props.lessons!.map((lesson, index) => {
               const eventObject: EventObject = {
                   id: index,
                   calendarId: '1',
                   title: lesson.subjectName,
                   category: 'time',
                   start: lesson.startDate,
                   end: new Date(new Date(lesson.startDate).getTime() + 60 * 60 * 1000).toLocaleTimeString()
               }
               return eventObject;
            })
        })

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

                calendarInstance.createEvents(calendarEvents.value);
            }
        });

        return {
            calendarContainer
        }
    }
})

</script>

<template>
    <div class="m-3 p-3" ref="calendarContainer" style="height: 300px;"></div>
</template>

<style scoped>

</style>
