<template>
  <section>
    <BaseCard card-title="Create Account">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label" for="email">Email</label>
          <input class="form-control" type="email" id="email" required />
        </div>
        <div class="mb-3">
          <label class="form-label" for="name">Name</label>
          <input class="form-control" type="text" id="name" required />
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input class="form-control" type="password" id="password" required />
        </div>
        <div class="mb-3">
          <label class="form-label" for="retype-password">Retype Password</label>
          <input class="form-control" type="password" id="retype-password" required />
        </div>
        <div class="mb-3">
          <label for="dateInput" class="form-label">Birthday</label>
          <input type="date" value="1996-01-01" class="form-control" id="dateInput">
        </div>
        <div class="mb-3">
          <label class="form-label">Gender</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
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
              value="female"
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
            <textarea class="form-control" placeholder="Short Bio" id="description" rows=6></textarea>
        </div>
        <div class="mb-3">
          <button class="btn btn-secondary" type="submit">Create Account</button>
        </div>
      </form>
      <div>
        <router-link to="/login">Login</router-link>
      </div>
    </BaseCard>
  </section>
</template>

<style scoped>
.btn-secondary {
  background-color: #e677d3
}

/* section {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  background-color: #b6f0a7; /* Sage Green 
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input[type='radio'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='radio'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
} */

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
      birthYear: 0,
      birthMonth: 0,
      birthDay: 0,
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
        console.log("LOL");
        this.apiEndpoint = '';
        
        if (this.selectedRole === 'student') {
          this.apiEndpoint = 'http://localhost:8081/student/createStudent'
        } else {
          this.apiEndpoint = 'http://localhost:8081/instructor/createInstructor'
        }

        fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.name,
                email: this.email,
                password: this.password,
                birthYear: this.birthYear,
                birthMonth: this.birthMonth,
                birthDay: this.birthDay,
                gender: this.selectedGender,
                description: this.description
            }),
        });
      } else {
        console.log('password and retype password must match');
      }
    }
  }
};
</script>
