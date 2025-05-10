<template>
  <section>
    <BaseCard card-title="Create Account">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label" for="email">Email</label>
          <input class="form-control" type="email" id="email" v-model="email" required />
        </div>
        <div class="mb-3">
          <label class="form-label" for="name">Name</label>
          <input class="form-control" type="text" id="name" v-model="name" required />
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input class="form-control" type="password" id="password" v-model="password" required />
        </div>
        <div class="mb-3">
          <label class="form-label" for="retype-password">Retype Password</label>
          <input class="form-control" type="password" id="retype-password" v-model="retypePassword" required />
        </div>
        <div class="mb-3">
          <label for="dateInput" class="form-label">Birthday</label>
          <input type="date" value="1996-01-01" class="form-control" id="dateInput" v-model="dateInput">
        </div>
        <div class="mb-3">
          <label class="form-label">Gender</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="MALE"
              v-model="selectedGender"
            />
            <label class="form-check-label" for="male">Male</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="FEMALE"
              v-model="selectedGender"
            />
            <label class="form-check-label" for="female">Female</label>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Register as...</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="student"
              value="student"
              v-model="selectedRole"
            />
            <label for="student">Student</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="instructor"
              value="instructor"
              v-model="selectedRole"
            />
            <label for="instructor">Instructor</label>
          </div>
        </div>
        <div class="mb-3">
            <label class="form-label" for="description">Description</label>
            <textarea class="form-control" placeholder="Short Bio" id="description" rows=6 v-model="description"></textarea>
        </div>
        <div class="mb-3">
          <button class="btn btn-secondary" type="submit">Create Account</button>
        </div>
      </form>
      <div>
        <router-link class="btn btn-primary" to="/login">Login</router-link>
      </div>
    </BaseCard>
  </section>
</template>

<style scoped>
</style>

<script>
import BaseCard from '../ui/BaseCard.vue';
export default {
  components: {
    BaseCard,
  },
  data() {
    return {
      email: '',
      name:'',
      password: '',
      dateInput: '',
      retypePassword:'',
      selectedRole: '', // Will hold the value "student" or "instructor" depending on which radio is checked
      selectedGender: '', // Will hold the value "male" or "female" depending on which radio is checked
      description: '',
      apiEndpoint: ''
    };
  },
  methods: {
    submitForm() {
      if (this.password === this.retypePassword) {
        this.apiEndpoint = '';
        
        if (this.selectedRole === 'student') {
          this.apiEndpoint = 'http://localhost:8081/student/createStudent'
        } else {
          this.apiEndpoint = 'http://localhost:8081/instructor/createInstructor'
        }

        const response = fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.name,
                email: this.email,
                password: this.password,
                birthday: this.dateInput,
                gender: this.selectedGender,
                description: this.description
            }),
        });
        if (response.ok) {
          this.$router.push('/login');
        } else {
          alert('an error occurred when creating an account')
        }
      } else {
        alert('password and retype password must match');
      }
    }
  }
};
</script>
