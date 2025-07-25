<script lang="ts">
import {defineComponent, onMounted, ref, Ref, PropType} from 'vue'
import Calendar, {Options} from "@toast-ui/calendar";
import {GetLessonResponse} from "@/dto/response/getLessonResponse";
import {EventObject} from "@toast-ui/calendar/types/types/events";
type ViewType = 'month' | 'week' | 'day';
export default defineComponent({
    name: 'MonthlyCalendar',
    props: {
        view: {
            type: String as PropType<ViewType>,
            default: 'month'
        },
        alreadyCreatedLessons: {
            type: Array as PropType<GetLessonResponse[]>,
            default: () => []
        },
        precreatedLessons: {
            type: Array as PropType<GetLessonResponse[]>,
            default: () => []
        },
        alreadyCreatedLessonsSubjectName: {
            type: String as PropType<string>,
            required: true
        },
        precreatedLessonsSubjectName: {
            type: String as PropType<string>,
            required: true
        },
        alreadyCreatedLessonsCalendarId: {
            type: String as PropType<string>,
            required: true
        },
        precreatedLessonsCalendarId: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup(props) {
        const calendarContainer: Ref<HTMLDivElement | null> = ref(null);
        let calendarInstance: Calendar;

        function getCalendarEvents(lessons: GetLessonResponse[], subjectName: string, calendarId: string): EventObject[] {
            if (lessons.length == 0) {
                return [];
            }
            return lessons!.map((lesson, index) => {
                const eventObject: EventObject = {
                    id: index,
                    calendarId: calendarId,
                    title: subjectName? subjectName: lesson.subjectName,
                    category: 'time',
                    start: lesson.startDate,
                    end: lesson.endDate,
                    isReadOnly: true,
                }
                return eventObject;
            })
        }

        onMounted(() => {
            if (calendarContainer.value) {
                const options: Options = {
                    defaultView: props.view,
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
                    week: {
                        startDayOfWeek: 1,
                        hourStart: 8,
                        hourEnd: 21,
                        eventView: ['time'],
                        taskView: false
                    },
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

                calendarInstance.createEvents(
                    getCalendarEvents(props.precreatedLessons, props.precreatedLessonsSubjectName, props.precreatedLessonsCalendarId).concat(
                        getCalendarEvents(props.alreadyCreatedLessons, props.alreadyCreatedLessonsSubjectName, props.alreadyCreatedLessonsCalendarId)
                    )
                );
            }
        });

        return { calendarContainer }

    }


})

</script>

<template>
    <div class="m-3 p-3" ref="calendarContainer" style="height: 300px;"></div>
</template>

