<template>
  <div class="help-feedback-page">
    <header class="page-header">
      <h1 class="page-title">Feedback</h1>
      <p class="page-description">
        We value your feedback! Please let us know your thoughts, suggestions or issues you
        encountered.
      </p>
    </header>

    <main class="page-content">
      <form @submit.prevent="submitFeedback" class="feedback-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <div class="form-group">
          <label for="feedback">Feedback:</label>
          <textarea id="feedback" v-model="feedback" rows="5" required></textarea>
        </div>

        <div class="form-group">
          <button type="submit">Submit Feedback</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const feedback = ref('')

function submitFeedback() {
  // TODO: Implement submitting feedback
  console.log('Submitting feedback:', {
    name: name.value,
    email: email.value,
    feedback: feedback.value,
  })

  // Reset form
  name.value = ''
  email.value = ''
  feedback.value = ''
}
</script>

<style scoped lang="scss">
.help-feedback-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  .page-header {
    margin-bottom: 20px;
    .page-title {
      font-size: 24px;
    }
    .page-description {
      color: #666;
    }
  }

  .feedback-form {
    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }

      input,
      textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      button {
        padding: 8px 15px;
        background: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background: #0056b3;
        }
      }
    }
  }
}
</style>
