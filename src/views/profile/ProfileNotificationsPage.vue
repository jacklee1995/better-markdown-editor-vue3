<template>
  <div class="profile-notifications-page">
    <h1>Notification Settings</h1>

    <section class="notification-section">
      <h2>Email Notifications</h2>
      <div class="notification-options">
        <div class="notification-option" v-for="(option, index) in emailNotifications" :key="index">
          <div class="option-content">
            <h3>{{ option.title }}</h3>
            <p>{{ option.description }}</p>
          </div>
          <div class="option-toggle">
            <label class="toggle-switch">
              <input type="checkbox" v-model="option.enabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </section>

    <section class="notification-section">
      <h2>In-App Notifications</h2>
      <div class="notification-options">
        <div class="notification-option" v-for="(option, index) in appNotifications" :key="index">
          <div class="option-content">
            <h3>{{ option.title }}</h3>
            <p>{{ option.description }}</p>
          </div>
          <div class="option-toggle">
            <label class="toggle-switch">
              <input type="checkbox" v-model="option.enabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </section>

    <section class="notification-section">
      <h2>Notification Frequency</h2>
      <div class="frequency-options">
        <div class="form-group">
          <label for="frequency">Email Digest Frequency</label>
          <select id="frequency" v-model="frequency">
            <option value="immediately">Immediately</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Digest</option>
            <option value="never">Never</option>
          </select>
        </div>
      </div>
    </section>

    <div class="action-buttons">
      <button @click="saveSettings" class="save-button">Save Changes</button>
      <button @click="resetDefaults" class="reset-button">Reset to Defaults</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Email notification options
const emailNotifications = ref([
  {
    title: 'Document Updates',
    description: 'Receive notifications when your documents are updated or commented on.',
    enabled: true
  },
  {
    title: 'Team Activity',
    description: 'Receive notifications about team members and collaboration updates.',
    enabled: true
  },
  {
    title: 'Account Security',
    description: 'Receive notifications about security events and login attempts.',
    enabled: true
  },
  {
    title: 'Product Updates',
    description: 'Receive notifications about new features and product updates.',
    enabled: false
  },
  {
    title: 'Marketing Communications',
    description: 'Receive promotional emails and special offers.',
    enabled: false
  }
])

// In-app notification options
const appNotifications = ref([
  {
    title: 'Document Updates',
    description: 'Show notifications when your documents are updated or commented on.',
    enabled: true
  },
  {
    title: 'Team Activity',
    description: 'Show notifications about team members and collaboration updates.',
    enabled: true
  },
  {
    title: 'Account Security',
    description: 'Show notifications about security events and login attempts.',
    enabled: true
  },
  {
    title: 'Product Updates',
    description: 'Show notifications about new features and product updates.',
    enabled: true
  }
])

// Notification frequency
const frequency = ref('daily')

// Save notification settings
function saveSettings() {
  // TODO: Implement save settings logic
  console.log('Saving notification settings...')
  console.log('Email notifications:', emailNotifications.value)
  console.log('App notifications:', appNotifications.value)
  console.log('Frequency:', frequency.value)

  // Show success message
  alert('Notification settings saved successfully!')
}

// Reset to default settings
function resetDefaults() {
  // Reset email notifications
  emailNotifications.value.forEach(option => {
    if (option.title === 'Document Updates' ||
        option.title === 'Team Activity' ||
        option.title === 'Account Security') {
      option.enabled = true
    } else {
      option.enabled = false
    }
  })

  // Reset app notifications
  appNotifications.value.forEach(option => {
    option.enabled = true
  })

  // Reset frequency
  frequency.value = 'daily'

  // Show success message
  alert('Notification settings reset to defaults!')
}
</script>

<style scoped lang="scss">
.profile-notifications-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .notification-section {
    margin-bottom: 40px;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    h2 {
      font-size: 18px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
  }

  .notification-options {
    .notification-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #f5f5f5;

      &:last-child {
        border-bottom: none;
      }

      .option-content {
        flex: 1;

        h3 {
          font-size: 16px;
          margin-bottom: 5px;
        }

        p {
          font-size: 14px;
          color: #666;
          margin: 0;
        }
      }

      .option-toggle {
        margin-left: 20px;
      }
    }
  }

  .frequency-options {
    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
      }

      select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
        background-color: #fff;
      }
    }
  }

  .action-buttons {
    display: flex;
    gap: 15px;
    margin-top: 30px;

    button {
      padding: 12px 20px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;

      &.save-button {
        background-color: #007bff;
        color: white;
        border: none;

        &:hover {
          background-color: #0056b3;
        }
      }

      &.reset-button {
        background-color: #f8f9fa;
        color: #333;
        border: 1px solid #ddd;

        &:hover {
          background-color: #e2e6ea;
        }
      }
    }
  }

  // Toggle switch styling
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;

    input {
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .toggle-slider {
        background-color: #007bff;
      }

      &:checked + .toggle-slider:before {
        transform: translateX(26px);
      }
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 24px;

      &:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }
    }
  }
}

// Responsive styles
@media (max-width: 768px) {
  .profile-notifications-page {
    padding: 15px;

    .notification-option {
      flex-direction: column;
      align-items: flex-start;

      .option-toggle {
        margin-left: 0;
        margin-top: 10px;
      }
    }

    .action-buttons {
      flex-direction: column;

      button {
        width: 100%;
      }
    }
  }
}
</style>
