<template>
  <section>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <div>
          <label for="retype-password">Retype Password</label>
          <input type="password" id="retype-password" required />
        </div>
        <div>
          <label for="birthday">Birthday (optional)</label>
          <select id="year">
            <option>Year</option>
          </select>
          <select id="month">
            <option>Month</option>
          </select>
          <select id="day">
            <option>Day</option>
          </select>
        </div>
        <div>
          Gender
          <input
                  type="radio"
                  id="male"
                  value="male"
                  v-model="selectedGender"
          />
          <label for="male">Male</label>
          <input
                  type="radio"
                  id="female"
                  value="female"
                  v-model="selectedGender"
          />
          <label for="female">Female</label>
        </div>
        <div>
          <h3>Register as...</h3>
          <div>
            <input
                    type="radio"
                    id="student"
                    value="student"
                    v-model="selectedRole"
            />
            <label for="student">Student</label>
            <input
                    type="radio"
                    id="instructor"
                    value="instructor"
                    v-model="selectedRole"
            />
            <label for="instructor">Instructor</label>
          </div>
        </div>
        <div>
          <h4 for="description">Description</h4>
        <div>
          <textarea id="description" rows=6></textarea>
        </div>
        </div>
        <div>
          <button type="submit">Create Account</button>
        </div>
      </form>
      <div>
        <router-link to="/login">Login</router-link>
      </div>
    </BaseCard>
  </section>
</template>
<script>
export default {
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
          this.apiEndpoint = 'http://localhost:8081/createStudent'
        } else {
          this.apiEndpoint = 'http://localhost:8081/createInstructor'
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

<style scoped>

section {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}

</style>