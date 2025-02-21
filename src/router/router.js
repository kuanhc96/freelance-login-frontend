// router.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import CreateAccountForm from '../components/CreateAccountForm.vue';
import ForgetPasswordForm from '../components/ForgetPasswordForm.vue';
import ResetPasswordForm from '../components/ResetPasswordForm.vue';

const routes = [
  { path: '/login', component: LoginForm },
  { path: '/createAccount', component: CreateAccountForm },
  { path: '/forgetPassword', component: ForgetPasswordForm },
  { path: '/resetPassword', component: ResetPasswordForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;