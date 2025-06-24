<template>
  <section>
    <BaseCard card-title="Login" @refresh="refresh">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label" for="email">User Email </label>
          <input class="form-control" type="email" id="email" v-model="email" required />
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Password </label>
          <input class="form-control" type="password" id="password" v-model="password" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Login as...</label>
          <div class="form-check">
            <input
              class="form-check-input "
              type="radio"
              id="student"
              value="STUDENT"
              v-model="selectedRole"
              checked
            />
            <label for="student">Student</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="instructor"
              value="INSTRUCTOR"
              v-model="selectedRole"
            />
            <label for="instructor">Instructor</label>
          </div>
        </div>
        <div class="d-grid vstack mb-3">
          <button class="btn btn-secondary" type="submit">Login</button>
        </div>
      </form>
      <div>
        <router-link class="btn btn-primary me-3" to="/createAccount">Create an account</router-link>
        <router-link class="btn btn-primary" to="/forgetPassword">Forgot password?</router-link>
      </div>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, Ref, onBeforeMount } from 'vue';
import type { RootState } from '@/store/types'
import { LoginResponse } from '@/dto/response/loginResponse';

import BaseCard from '../../components/ui/BaseCard.vue';

const router = useRouter();
const store = useStore<RootState>();

const email: Ref<String> = ref('');
const password: Ref<String> = ref('');
const selectedRole: Ref<String> = ref('STUDENT');

function refresh(): void {
    email.value = '';
    password.value = '';
    router.push("/login");
}

onBeforeMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isLogout = urlParams.get('logout') === 'true';
    if (isLogout) {
      try {
        store.dispatch('login/logout'); 
        await fetch(store.getters['login/backendService'] + 'apiLogout', {
          method: 'POST',
          credentials: 'include'
        })
      } catch (err) {
        console.warn('Failed to logout on backend')
      }
    } else {
      try {
        const response: Response = await fetch(
          store.getters['login/backendService'] + 'checkLogin', {
            method: 'POST',
            credentials: 'include'
          }
        );

        if (!response.ok) {
          throw new Error('Not authenticated')
        }

        const data: LoginResponse = await response.json();
        store.dispatch('login/login', {
          status: data.success,
          userGUID: data.userGUID,
          role: data.role,
          email: data.email
        }); 

        router.push('/');
      } catch (err) {
        console.warn('Authentication failed with loginToken');
        router.push('/login');
      }
    }

  }
)

function submitForm(): void {
    fetch(store.getters['login/backendService'] + "apiLogin", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'password': password,
          'role': selectedRole
        }),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
        }
      })
      .then(data => {
          if (data) {
            store.dispatch('login/login', {
              status: data.success,
              userGUID: data.userGUID,
              role: data.role,
              email: data.email
            }); 
            router.push('/');
          }
        }

      )

}

</script>
