// src/store/types.ts

// 1️⃣ Import each module's state interface
import { SubjectsState } from '@/store/subjects'
import { LoginState } from './login'
import { InstructorsState } from '@/store/instructors'
import { AnnouncementsState } from '@/store/announcements'
// import { LessonsState }  from '@/store/lessons'
// import { TransactionsState } from '@/store/transactions'

// 2️⃣ Define the shape of your root store
export interface RootState {
  // if you have any top-level state, include it here:
  // appName: string

  // each module becomes a property on the root state
  subjects:      SubjectsState
  login:          LoginState
  instructors:   InstructorsState
  announcements: AnnouncementsState
//   lessons:       LessonsState
//   transactions:  TransactionsState
}
