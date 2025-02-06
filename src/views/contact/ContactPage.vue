<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

function submitForm() {
  // TODO: Send form data to server
  console.log('Form submitted:', form)

  // Reset form
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<template>
  <div class="contact-page">
    <h1>Contact Us</h1>
    <p>If you have any questions, suggestions or feedback, please feel free to contact us.</p>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" v-model="form.message" required></textarea>
      </div>

      <button type="submit">Send</button>
    </form>
  </div>
</template>

<style scoped>
.contact-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
