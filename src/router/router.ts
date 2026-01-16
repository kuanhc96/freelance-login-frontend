// router.js
import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router';
import ForgetPasswordForm from '../pages/login/ForgetPasswordForm.vue';
import ResetPasswordForm from '../pages/login/ResetPasswordForm.vue';

import InstructorsOrStudentsList from '@/pages/instructorsOrStudents/InstructorsOrStudentsList.vue'
import AnnouncementsPage from '../pages/announcements/AnnouncementsPage.vue'
import AnnouncementForm from '../pages/announcements/AnnouncementForm.vue'
import InstructorDetails from '@/pages/instructorsOrStudents/InstructorDetails.vue'
import InstructorContact from '@/pages/instructorsOrStudents/InstructorContact.vue'
import LessonsList from '../pages/lessons/LessonsList.vue'
import ScheduleLessonForm from '../pages/lessons/ScheduleLessonForm.vue'
import TransactionsList from '../pages/transactions/TransactionsList.vue'
import TransactionDetailsModal from '../components/transactions/TransactionDetailsModal.vue'
import NotFound from '../pages/NotFound.vue'
import Dashboard from '../pages/Dash-Board.vue'
import TransactionForm from "@/pages/transactions/TransactionForm.vue";
import ProfilePage from "@/pages/profile/ProfilePage.vue";
import CallbackPage from "@/pages/login/CallbackPage.vue";
import AuthorizePage from "@/pages/login/AuthorizePage.vue";
import {useLoginStore} from "@/store/login";

const routes: RouteRecordRaw[] = [
    // paths that can only be accessed if logged out
  // { path: '/login', component: LoginForm, meta: { requiresLogout: true }},
  // { path: '/login?logout=true', component: LoginForm, meta: { requiresLogout: true }},
  //
  //   // paths that don't need to be protected
  // { path: '/createAccount', component: CreateAccountForm },
    { path: '/callback', component: CallbackPage, meta: {requiresLogin: false} },
  { path: '/authorize', component: AuthorizePage },
  { path: '/forgetPassword', component: ForgetPasswordForm, meta: {requiresLogin: false} },
  { path: '/resetPassword', component: ResetPasswordForm, meta: {requiresLogin: false} },
  { path: '/:notFound(.*)', redirect: '/notFound', meta: {requiresLogin: false} },
  { path: '/notFound', component: NotFound, meta: {requiresLogin: false} },

    // paths that can only be accessed if logged in
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard, meta: { requiresLogin: true } },
  { path: '/instructorsOrStudents', component: InstructorsOrStudentsList, meta: { requiresLogin: true } },
  { path: '/announcements', component: AnnouncementsPage, meta: { requiresLogin: true } },
  { path: '/announcements/create', component: AnnouncementForm, meta: { requiresLogin: true } },
  { path: '/instructorsOrStudents/:id', component: InstructorDetails, children: [
      { path: 'contact', component: InstructorContact} // /coaches/c1/contact
  ], props: true, meta: { requiresLogin: true }},
  { path: '/lessons', component: LessonsList, meta: { requiresLogin: true } },
  { path: '/lessons/schedule', component: ScheduleLessonForm , meta: { requiresLogin: true }},
    {path: '/profile', component: ProfilePage, meta: { requiresLogin: true }},
  { path: '/transactions', component: TransactionsList, meta: { requiresLogin: true } },
  { path: '/transactions/record', component: TransactionForm, meta: { requiresLogin: true } },
  { path: '/transactions/:id', component: TransactionDetailsModal, meta: { requiresLogin: true } },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async(to, _, next) => {
    const requiresLogin: boolean = to.matched.some(record => record.meta.requiresLogin);
    const loginStore = useLoginStore();

    if (requiresLogin) {
        await loginStore.checkLogin();
        if (loginStore.isLoggedIn) {
          next();
        } else {
          loginStore.login();
          return;
        }
    } else {
        next();
    }
})

export default router;
