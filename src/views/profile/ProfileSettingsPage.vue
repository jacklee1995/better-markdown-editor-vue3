<template>
  <div class="profile-settings-page">
    <h1>Profile Settings</h1>

    <form @submit.prevent="saveSettings">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="settings.name" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="settings.email" required />
      </div>

      <div class="form-group">
        <label for="bio">Bio</label>
        <textarea id="bio" v-model="settings.bio"></textarea>
      </div>

      <div class="form-group">
        <label for="avatar">Avatar</label>
        <input type="file" id="avatar" @change="handleAvatarUpload" />
        <img
          v-if="settings.avatar"
          :src="settings.avatar"
          alt="Avatar preview"
          class="avatar-preview"
        />
      </div>

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useProfileStore } from '@/store/profile'

const profileStore = useProfileStore()

const settings = reactive({
  name: profileStore.name,
  email: profileStore.email,
  bio: profileStore.bio,
  avatar: profileStore.avatar,
})

const handleAvatarUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      settings.avatar = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const saveSettings = () => {
  profileStore.updateProfile(settings)
}
</script>

<style scoped lang="scss">
.profile-settings-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    margin-bottom: 20px;
  }

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
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    textarea {
      height: 100px;
    }

    .avatar-preview {
      max-width: 200px;
      margin-top: 10px;
    }
  }

  button[type='submit'] {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
