// router.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../pages/login/LoginForm.vue';
import CreateAccountForm from '../pages/login/CreateAccountForm.vue';
import ForgetPasswordForm from '../pages/login/ForgetPasswordForm.vue';
import ResetPasswordForm from '../pages/login/ResetPasswordForm.vue';

import InstructorsList from '../pages/instructors/InstructorList'
import InstructorDetails from '../pages/instructors/InstructorDetails'
import InstructorContact from '../pages/instructors/InstructorContact'
import SearchInstructors from '../pages/instructors/SearchInstructors'
import CoursesList from '../pages/courses/CoursesList'
import CourseDetails from '../pages/courses/CourseDetails'
import TransactionsList from '../pages/transactions/TransactionsList'
import TransactionDetails from '../pages/transactions/TransactionDetails'
import SubjectDetails from '../pages/subjects/SubjectDetails'
import NotFound from '../pages/NotFound.vue'
import Dashboard from '../pages/Dash-Board.vue'

const routes = [
  { path: '/login', component: LoginForm },
  { path: '/login?logout=true', component: LoginForm },
  { path: '/createAccount', component: CreateAccountForm },
  { path: '/forgetPassword', component: ForgetPasswordForm },
  { path: '/resetPassword', component: ResetPasswordForm },

  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/instructors', component: InstructorsList },
  { path: '/instructors/search', component: SearchInstructors },
  { path: '/instructors/:id', component: InstructorDetails, children: [
      { path: 'contact', component: InstructorContact} // /coaches/c1/contact
  ]},
  { path: '/courses', component: CoursesList },
  { path: '/courses/:id', component: CourseDetails },
  { path: '/transactions', component: TransactionsList },
  { path: '/transactions/:id', component: TransactionDetails },
  { path: '/subjects', component: null },
  { path: '/subjects/:id', component: SubjectDetails },
  { path: '/:notFound(.*)', redirect: '/notFound' },
  { path: '/notFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;