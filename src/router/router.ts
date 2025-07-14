// router.js
import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router';
import LoginForm from '../pages/login/LoginForm.vue';
import CreateAccountForm from '../pages/login/CreateAccountForm.vue';
import ForgetPasswordForm from '../pages/login/ForgetPasswordForm.vue';
import ResetPasswordForm from '../pages/login/ResetPasswordForm.vue';

import InstructorsList from '../pages/instructors/InstructorList.vue'
import AnnouncementsList from '../pages/announcements/AnnouncementsList.vue'
import AnnouncementForm from '../pages/announcements/AnnouncementForm.vue'
import InstructorDetails from '../pages/instructors/InstructorDetails.vue'
import InstructorContact from '../pages/instructors/InstructorContact.vue'
import LessonsList from '../pages/lessons/LessonsList.vue'
import ScheduleLessonForm from '../pages/lessons/ScheduleLessonForm.vue'
import TransactionsList from '../pages/transactions/TransactionsList.vue'
import TransactionDetails from '../pages/transactions/TransactionDetails.vue'
import SubjectsList from '../pages/subjects/SubjectsList.vue'
import SubjectDetails from '../pages/subjects/SubjectDetails.vue'
import NotFound from '../pages/NotFound.vue'
import Dashboard from '../pages/Dash-Board.vue'
import {useLoginStore} from "@/store/login";
import TransactionForm from "@/pages/transactions/TransactionForm.vue";

const routes: RouteRecordRaw[] = [
    // paths that can only be accessed if logged out
  { path: '/login', component: LoginForm, meta: { requiresLogout: true }},
  { path: '/login?logout=true', component: LoginForm, meta: { requiresLogout: true }},

    // paths that don't need to be protected
  { path: '/createAccount', component: CreateAccountForm },
  { path: '/forgetPassword', component: ForgetPasswordForm },
  { path: '/resetPassword', component: ResetPasswordForm },
  { path: '/:notFound(.*)', redirect: '/notFound' },
  { path: '/notFound', component: NotFound },

    // paths that can only be accessed if logged in
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard, meta: { requiresLogin: true } },
  { path: '/instructors', component: InstructorsList, meta: { requiresLogin: true } },
  { path: '/announcements', component: AnnouncementsList, meta: { requiresLogin: true } },
  { path: '/announcements/create', component: AnnouncementForm, meta: { requiresLogin: true } },
  { path: '/instructors/:id', component: InstructorDetails, children: [
      { path: 'contact', component: InstructorContact} // /coaches/c1/contact
  ], props: true, meta: { requiresLogin: true }},
  { path: '/lessons', component: LessonsList, meta: { requiresLogin: true } },
  { path: '/lessons/schedule', component: ScheduleLessonForm , meta: { requiresLogin: true }},
  { path: '/transactions', component: TransactionsList, meta: { requiresLogin: true } },
  { path: '/transactions/record', component: TransactionForm, meta: { requiresLogin: true } },
  { path: '/transactions/:id', component: TransactionDetails, meta: { requiresLogin: true } },
  { path: '/subjects', component: SubjectsList, meta: { requiresLogin: true } },
  { path: '/subjects/:id', component: SubjectDetails, meta: { requiresLogin: true } },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function(to, _, next) {
    const loginStore = useLoginStore();

    if (to.meta.requiresLogin && !loginStore.isLoggedIn) {
        next('/login');
    } else if (to.meta.requiresLogout && loginStore.isLoggedIn) {
        next('/dashboard');
    } else {
        next();
    }
})

export default router;
