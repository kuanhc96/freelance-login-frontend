import {GetPackageResponse} from "@/dto/response/getPackageResponse";
import {GetSubjectResponse} from "@/dto/response/getSubjectResponse";
import {defineStore} from "pinia";
import {useLoginStore} from "@/store/login";
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import {useSubjectsStore} from "@/store/subjects";
import {PACKAGES_BY_SUBJECT_ENDPOINT} from "@/store";
import PackageService from "@/services/PackageService";

export interface PackagesState {
    subjectGUIDToPackagesMap: Record<string, GetPackageResponse[]>
}

export const usePackagesStore = defineStore('packages', {
    state: (): PackagesState => ({
        subjectGUIDToPackagesMap: {}
    }),
    getters: {
        getPackagesBySubjectGUID: (state) => (subjectGUID: string) => {
            if (subjectGUID in state.subjectGUIDToPackagesMap) {
                return state.subjectGUIDToPackagesMap[subjectGUID];
            } else {
                return [];
            }
        },
        hasPackagesBySubjectGUID: (state) => (subjectGUID: string) => {
            if (subjectGUID in state.subjectGUIDToPackagesMap) {
                const list: GetPackageResponse[] = state.subjectGUIDToPackagesMap[subjectGUID];
                return !((Array.isArray(list)) && list.length > 0);
            } else {
                return false;
            }
        }
    },
    actions: {
        async setPackages(): Promise<void> {
            const loginStore = useLoginStore();
            const instructorsStore = useInstructorsOrStudentsStore();
            const subjectsStore = useSubjectsStore();
            if (loginStore.isStudent) {
                for (const instructor of instructorsStore.getSubscribedInstructors) {
                    for (const subject of subjectsStore.getSubjectsByInstructorGUID(instructor.userGUID)) {
                        this.subjectGUIDToPackagesMap[subject.subjectGUID] = await PackageService.getPackagesBySubjectGUID(subject.subjectGUID);
                    }

                }
            } else {
                const subjects: GetSubjectResponse[] = subjectsStore.getSubjectsByInstructorGUID(loginStore.getUserGUID);
                for (const subject of subjects) {
                    this.subjectGUIDToPackagesMap[subject.subjectGUID] = await PackageService.getPackagesBySubjectGUID(subject.subjectGUID);
                }
            }
        }
    }
})
