import { SubjectsState } from '@/store/subjects'
import { LoginState } from './login'
import { InstructorsState } from './instructors'
import { AnnouncementsState } from './announcements'
export interface RootState {
    subjects: SubjectsState
    login: LoginState
    instructors: InstructorsState
    announcements: AnnouncementsState
}