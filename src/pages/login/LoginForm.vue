<template>
    <section>
        <BaseCard card-title="Login" @refresh="refresh">
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label class="form-label" for="email">User Email </label>
                    <input class="form-control" type="email" id="email" v-model="email" required/>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="password">Password </label>
                    <input class="form-control" type="password" id="password" v-model="password" required/>
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

<script>
import BaseCard from '../../components/ui/BaseCard.vue';

export default {
    components: {
        BaseCard
    },
    data() {
        return {
            email: '',
            password: '',
            selectedRole: 'STUDENT'
        }
    },
    async created() {
        const urlParams = new URLSearchParams(window.location.search);
        const isLogout = urlParams.get('logout') === 'true';
        if (isLogout) {
            try {
                this.$store.dispatch('login/logout');
                await fetch('http://localhost:8081/apiLogout', {
                    method: 'POST',
                    credentials: 'include'
                })
            } catch (err) {
                console.warn('Failed to logout on backend')
            }
        } else {
            try {
                const response = await fetch(
                    'http://localhost:8081/checkLogin', {
                        method: 'POST',
                        credentials: 'include'
                    }
                );

                if (!response.ok) {
                    throw new Error('Not authenticated')
                }

                const data = await response.json();
                this.$store.dispatch('login/login', {
                    success: data.success,
                    userGUID: data.userGUID,
                    role: data.role,
                    email: data.email
                });

                this.$router.push('/');
            } catch (err) {
                console.warn('Authentication failed with loginToken');
                this.$router.push('/login');
            }
        }
    },
    methods: {
        refresh() {
            this.email = '';
            this.password = '';
            this.$router.push("/login");
        },
        submitForm() {
            console.log(this.selectedRole)
            fetch("http://localhost:8081/apiLogin", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': this.email,
                    'password': this.password,
                    'role': this.selectedRole
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
                            this.$store.dispatch('login/login', {
                                success: data.success,
                                userGUID: data.userGUID,
                                role: data.role,
                                email: data.email
                            });
                            this.$router.push('/')
                        }
                    }
                )

        }
    }
}
</script>


<style lang="scss" scoped>
</style>
