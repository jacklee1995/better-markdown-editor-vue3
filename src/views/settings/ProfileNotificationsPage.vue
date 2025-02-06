<template>
  <div class="profile-notifications-page">
    <h1>Notification Settings</h1>

    <section class="email-notifications">
      <h2>Email Notifications</h2>
      <div class="notification-options">
        <div class="option-item">
          <input type="checkbox" id="newComment" v-model="emailSettings.newComment" />
          <label for="newComment">New comments</label>
        </div>
        <div class="option-item">
          <input type="checkbox" id="newFollower" v-model="emailSettings.newFollower" />
          <label for="newFollower">New followers</label>
        </div>
        <div class="option-item">
          <input type="checkbox" id="newLike" v-model="emailSettings.newLike" />
          <label for="newLike">New likes</label>
        </div>
        <div class="option-item">
          <input type="checkbox" id="newMention" v-model="emailSettings.newMention" />
          <label for="newMention">New mentions</label>
        </div>
      </div>
    </section>

    <section class="push-notifications">
      <h2>Push Notifications</h2>
      <div class="notification-options">
        <div class="option-item">
          <input type="checkbox" id="pushNewComment" v-model="pushSettings.newComment" />
          <label for="pushNewComment">New comments</label>
        </div>
        <div class="option-item">
          <input type="checkbox" id="pushNewFollower" v-model="pushSettings.newFollower" />
          <label for="pushNewFollower">New followers</label>
        </div>
        <div class="option-item">
          <input type="checkbox" id="pushNewLike" v-model="pushSettings.newLike" />
          <label for="pushNewLike">New likes</label>
        </div>
        <div class="option-item">
          <input type="checkbox" id="pushNewMention" v-model="pushSettings.newMention" />
          <label for="pushNewMention">New mentions</label>
        </div>
      </div>
    </section>

    <button class="save-btn" @click="saveNotificationSettings">Save Changes</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emailSettings = ref({
  newComment: true,
  newFollower: true,
  newLike: true,
  newMention: true,
})

const pushSettings = ref({
  newComment: true,
  newFollower: true,
  newLike: true,
  newMention: true,
})

function saveNotificationSettings() {
  // TODO: Save notification settings
  console.log('Notification settings saved')
}
</script>

<style lang="scss" scoped>
.profile-notifications-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .notification-options {
    margin-bottom: 20px;

    .option-item {
      margin-bottom: 10px;
    }
  }

  .save-btn {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
