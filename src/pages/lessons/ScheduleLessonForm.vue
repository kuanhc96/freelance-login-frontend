<template>
    <section>
        <base-card :card-title="'Schedule Lesson'">
            <the-monthly-calendar
                :key="monthlyCalendarKey"
                :already-created-lessons="alreadyScheduledLessons"
                already-created-lessons-subject-name="Scheduled Lesson"
                :precreated-lessons="scheduledPrecreatedLessons"
                :precreated-lessons-subject-name="selectedSubject === null? '':selectedSubject.subjectName"
                already-created-lessons-calendar-id="scheduled lessons"
                precreated-lessons-calendar-id="TBD lessons"
                view="month"
            ></the-monthly-calendar>
            <the-monthly-calendar
                :key="monthlyCalendarKey"
                :already-created-lessons="alreadyScheduledLessons"
                already-created-lessons-subject-name="Scheduled Lesson"
                :precreated-lessons="scheduledPrecreatedLessons"
                :precreated-lessons-subject-name="selectedSubject === null? '':selectedSubject.subjectName"
                already-created-lessons-calendar-id="scheduled lessons"
                precreated-lessons-calendar-id="TBD lessons"
                view="week"
            ></the-monthly-calendar>
            <form action="" @submit.prevent="submitSchedule">
                <div class="d-flex justify-content-center m-3">
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label class="form-label fs-5" for="instructorDropdown">Schedule Lesson With</label>
                        </div>
                        <div class="col-md-6">
<!--                            if student, select instructor -->
                            <select
                                v-if="isStudent"
                                class="w-100 form-select"
                                id="instructorDropdown"
                                v-model="selectedInstructorGUID"
                            >
                                <option selected="">Select Instructor</option>
                                <option
                                    v-for="instructor in subscribedInstructors"
                                    :key="instructor.userGUID"
                                    :value="instructor.userGUID"
                                >{{ instructor.name }}</option>
                            </select>
<!--                        if instructor, select student-->
                            <select
                                v-else
                                class="w-100 form-select"
                                id="studentDropdown"
                                v-model="selectedStudentGUID"
                            >
                                <option selected="">Select Student</option>
                                <option
                                    v-for="student in myStudents"
                                    :key="student.userGUID"
                                    :value="student.userGUID"
                                >{{ student.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div
                    class="d-flex justify-content-center m-3"
                    v-if="selectedInstructorGUID !== '' || selectedStudentGUID !== ''"
                >
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label class="form-label fs-5" for="subjectDropdown">Choose Course Subject</label>
                        </div>
                        <div class="col-md-6">
                            <select
                                class="w-100 form-select"
                                id="subjectDropdown"
                                v-model="selectedSubject"
                            >
                                <option selected="">Select Subject</option>
                                <option
                                    v-for="subject in subjects"
                                    :key="subject.subjectGUID"
                                    :value="subject"
                                >{{ subject.subjectName }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div
                    class="d-flex justify-content-center m-3"
                    v-if="selectedSubject !== null && selectedSubject.subjectGUID !== ''"
                >
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label for="packagesDropdown" class="form-label fs-5">Plan</label>
                        </div>
                        <div class="col-md-6">
                            <select
                                class="w-100 form-select"
                                id="packagesDropdown"
                                v-model="selectedPackageGUID"
                            >
                                <option selected="">Select Plan</option>
                                <option
                                    v-for="package_ in packages"
                                    :key="package_.packageGUID"
                                    :value="package_.packageGUID"
                                >
                                    {{package_.numberOfLessons}} Lesson(s), {{selectedSubject.price}} NTD/Lesson ({{ package_.discountCode }} plan)
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center m-3">
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label for="locationDropdown" class="form-label fs-5">Location</label>
                        </div>
                        <div class="col-md-6">
                            <select
                                class="w-100 form-select"
                                id="locationDropdown"
                                v-model="selectedLocation"
                            >
                                <option selected="">Location</option>
                                <option value="test1">Test1</option>
                                <option value="test2">Test2</option>
                                <option value="test3">Test3</option>
                                <option value="none">Decide Later</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label for="dateTimeInput" class="form-label fs-5">
                                Start Date &amp; Time
                            </label>
                        </div>
                        <div class="col-md-6 d-flex justify-content-around">
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    id="decideDateTimeLater"
                                    :value="true"
                                    v-model="decideDateTimeLater"
                                    checked
                                >
                                <label
                                    class="form-check-label"
                                    for="decideDateTimeLater"
                                >
                                    Decide Later
                                </label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    id="decideDateTimeNow"
                                    :value="false"
                                    v-model="decideDateTimeLater"
                                >
                                <label
                                    class="form-check-label"
                                    for="decideDateTimeNow"
                                >
                                    Schedule Now
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mb-3" v-if="!decideDateTimeLater">
                    <div class="col-md-4">
                        <input
                            type="datetime-local"
                            id="dateInput"
                            class="form-control"
                            v-model="inputDateTime"
                        >
                    </div>
                </div>
                <div
                    v-if="numberOfLessons > 1"
                    class="d-flex justify-content-center m-3"
                >
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label for="frequency" class="form-label fs-5">Frequency</label>
                        </div>
                        <div class="col-md-6">
                            <select
                                class="w-100 form-select"
                                id="frequencyDropdown"
                                v-model="frequency"
                            >
                                <option selected="">Frequency</option>
                                <option value="DAILY">Daily</option>
                                <option value="WEEKLY">Weekly</option>
                                <option value="MONTHLY">Monthly</option>
                                <option value="NONE">Decide Later</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center m-3">
                    <div class="col-md-8">
                        <div class="d-grid">
                            <button
                                @click="submitSchedule"
                                type="button"
                                class="btn btn-secondary"
                            >
                                Submit Schedule
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </base-card>
    </section>
</template>

<script lang="ts">
import {computed, defineComponent, Ref, ref, watch} from 'vue'
import {GetSubjectResponse} from "@/dto/response/getSubjectResponse";
import {useSubjectsStore} from "@/store/subjects";
import {useLoginStore} from "@/store/login";
import {useInstructorsOrStudentsStore} from '@/store/instructorsOrStudents';
import {usePackagesStore} from '@/store/packages';
import {useRouter} from 'vue-router';
import {GetUserResponse} from "@/dto/response/getUserResponse";
import {CreateLessonsRequest} from '@/dto/request/createLessonsRequest'
import Cookies from "js-cookie";
import {GetPackageResponse} from "@/dto/response/getPackageResponse";
import TheMonthlyCalendar from "@/components/layout/TheMonthlyCalendar.vue";
import {PrecreateLessonsRequest} from "@/dto/request/precreateLessonsRequest";
import {GetLessonResponse} from "@/dto/response/getLessonResponse";
import {useLessonsStore} from "@/store/lessons";

export default defineComponent({
    name: 'ScheduleLessonForm',
    components: {
        TheMonthlyCalendar
    },
    setup() {
        const subjectsStore = useSubjectsStore();
        const loginStore = useLoginStore();
        const instructorsOrStudentsStore = useInstructorsOrStudentsStore();
        const packagesStore = usePackagesStore();
        const lessonsStore = useLessonsStore();
        const router = useRouter();

        const selectedInstructorGUID: Ref<string> = ref('');
        const selectedStudentGUID: Ref<string> = ref('');
        const selectedSubject: Ref<GetSubjectResponse | null> = ref(null);
        const selectedPackageGUID: Ref<string> = ref('');
        const decideDateTimeLater: Ref<boolean> = ref(true);
        const inputDateTime: Ref<string> = ref('');
        const frequency: Ref<string> = ref('NONE');
        const selectedLocation: Ref<string> = ref('');
        const precreatedLessons: Ref<GetLessonResponse[]> = ref([]);
        const scheduledPrecreatedLessons: Ref<GetLessonResponse[]> = ref([]);
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        });
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return instructorsOrStudentsStore.getSubscribedInstructors;
        });
        const myStudents: Ref<GetUserResponse[]> = computed(function() {
            return instructorsOrStudentsStore.getMyStudents;
        });
        const isStudent: Ref<boolean> = computed(function() {
            return loginStore.isStudent;
        });
        const subjects: Ref<GetSubjectResponse[]> = computed(function() {
            if (loginStore.isStudent) {
                return subjectsStore.getSubjectsByInstructorGUID(selectedInstructorGUID.value);
            } else {
                return subjectsStore.getSubjectsByInstructorGUID(userGUID.value);
            }
        });

        const packages: Ref<GetPackageResponse[]> = computed(function() {
            if (selectedSubject.value === null) {
                return [];
            } else {
                return packagesStore.getPackagesBySubjectGUID(selectedSubject.value.subjectGUID);
            }
        });

        const numberOfLessons: Ref<number> = computed(function() {
            const package_ = packages.value.find(package_ => package_.packageGUID === selectedPackageGUID.value);
            return package_?.numberOfLessons!;
        });

        const alreadyScheduledLessons: Ref<GetLessonResponse[]> = computed(function() {
            const alreadyCreatedLessons = loginStore.isStudent? lessonsStore.getLessonsByStudentGUID(userGUID.value):
                lessonsStore.getLessonsByInstructorGUID(userGUID.value);
            return alreadyCreatedLessons.filter(
                lesson => lesson.lessonStatus === 'SCHEDULED'
            );
        });

        const monthlyCalendarKey: Ref<string> = computed(function() {
            return scheduledPrecreatedLessons.value.length + '|' + scheduledPrecreatedLessons.value[0]?.startDate + '|' +
                alreadyScheduledLessons.value.length + '|' + alreadyScheduledLessons.value[0].startDate;
        });

        async function precreateLessons(): Promise<void> {
            const csrfToken = Cookies.get('XSRF-TOKEN');
            const precreateLessonsRequest: PrecreateLessonsRequest = {
                studentGUID: isStudent.value? userGUID.value : selectedStudentGUID.value,
                instructorGUID: isStudent.value? selectedInstructorGUID.value: userGUID.value,
                startDate: inputDateTime.value,
                location: selectedLocation.value,
                subjectGUID: selectedSubject.value!.subjectGUID,
                packageGUID: selectedPackageGUID.value,
                lessonFrequency: frequency.value
            }
            const response: Response = await fetch(
                'http://localhost:8081/lessons/precreateLessons', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify(precreateLessonsRequest)
                }
            );

            if (response.ok) {
                precreatedLessons.value = await response.json();
                scheduledPrecreatedLessons.value = precreatedLessons.value.filter(
                    lesson => lesson.lessonStatus === 'SCHEDULED'
                );
            }
        }

        watch([inputDateTime, frequency], precreateLessons);

        async function submitSchedule(): Promise<void> {
            if (precreatedLessons.value.length > 0) {
                const csrfToken = Cookies.get('XSRF-TOKEN');
                const createLessonsRequest: CreateLessonsRequest = {
                    studentGUID: isStudent.value? userGUID.value : selectedStudentGUID.value,
                    instructorGUID: isStudent.value? selectedInstructorGUID.value: userGUID.value,
                    subjectGUID: selectedSubject.value!.subjectGUID,
                    packageGUID: selectedPackageGUID.value,
                    precreatedLessons: precreatedLessons.value
                };
                const response: Response = await fetch(
                    'http://localhost:8081/lessons/createLessons', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-XSRF-TOKEN': csrfToken
                        },
                        body: JSON.stringify(createLessonsRequest)
                    }
                );
                if (response.ok) {
                    await router.push('/lessons')
                }

            }
        }

        return {
            selectedInstructorGUID,
            selectedStudentGUID,
            selectedSubject,
            decideDateTimeLater,
            inputDateTime,
            selectedPackageGUID,
            numberOfLessons,
            frequency,
            precreatedLessons,
            scheduledPrecreatedLessons,
            alreadyScheduledLessons,
            selectedLocation,
            subjects,
            packages,
            subscribedInstructors,
            myStudents,
            isStudent,
            monthlyCalendarKey,
            submitSchedule
        }
    }
})

</script>


