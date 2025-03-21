// router.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import CreateAccountForm from '../components/CreateAccountForm.vue';
import ForgetPasswordForm from '../components/ForgetPasswordForm.vue';
import ResetPasswordForm from '../components/ResetPasswordForm.vue';

import InstructorsList from '../pages/instructors/InstructorList'
import InstructorDetails from '../pages/instructors/InstructorDetails'
import CoursesList from '../pages/courses/CoursesList'
import CourseDetails from '../pages/courses/CourseDetails'
import TransactionsList from '../pages/transactions/TransactionsList'
import TransactionDetails from '../pages/transactions/TransactionDetails'

const routes = [
  { path: '/login', component: LoginForm },
  { path: '/createAccount', component: CreateAccountForm },
  { path: '/forgetPassword', component: ForgetPasswordForm },
  { path: '/resetPassword', component: ResetPasswordForm },

  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: null },
  { path: '/instructors', component: InstructorsList },
  { path: '/instructors/:id', component: InstructorDetails, children: [
      { path: 'contact', component: null} // /coaches/c1/contact
  ]},
  { path: '/courses', component: CoursesList },
  { path: '/courses/:id', component: CourseDetails },
  { path: '/transactions', component: TransactionsList },
  { path: '/transactions/:id', component: TransactionDetails },
  { path: '/:notFound(.*)', component: null }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;