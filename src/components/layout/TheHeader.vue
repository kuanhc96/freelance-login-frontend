<template>
    <header>
        <div class="navbar navbar-expand-lg navbar-dark bg-light fixed-top"
             v-if="isLoggedIn"
        >
            <div class="container">
                <router-link to="/" class="navbar-brand">
                    <img src="@/assets/images/logo.png" alt="Logo" id="logo-img" width="150"/>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link to="/announcements" class="nav-link">Announcements</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/instructorsOrStudents" class="nav-link">
                            <span v-if="isStudent">Instructors</span>
                            <span v-else>Students</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/lessons" class="nav-link ">Lessons</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/subjects" class="nav-link ">Subjects</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/transactions" class="nav-link ">Transaction</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/profile" class="nav-link ">Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="#" class="nav-link " @click="logout">Logout</router-link>
                    </li>
                </ul>
                <span class="nav-item">
            <span class="fa-stack">
              <a href="#">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fab fa-facebook-f fa-stack-1x text-dark"></i>
              </a>
            </span>
          </span>
                <span class="nav-item">
            <span class="fa-stack">
              <a href="#">
                <i class="fas fa-circle fa-stack-2x text-secondary"></i>
                <i class="fab fa-twitter fa-stack-1x text-dark"></i>
              </a>
            </span>
          </span>

            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, Ref, computed } from 'vue';
import { useLoginStore } from "@/store/login";
import {useRouter} from "vue-router";

export default defineComponent({
    setup() {
        const loginStore = useLoginStore();
        const router = useRouter();
        const isLoggedIn: Ref<boolean> = computed(function() {
            return loginStore.isLoggedIn;
        })

        const isStudent: Ref<boolean> = computed(function() {
            return loginStore.isStudent;
        })

        async function logout(): Promise<void> {
            await loginStore.logout();
            await router.replace("/login")
        }

        return {
            isLoggedIn,
            isStudent,
            logout
        }
    }
})
</script>
