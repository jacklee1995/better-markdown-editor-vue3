<template>
  <div class="home-page">
    <header class="header">
      <div class="container">
        <h1 class="logo">My App</h1>
        <nav class="nav">
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="main">
      <section class="hero">
        <div class="container">
          <h2 class="hero-title">Welcome to My App</h2>
          <p class="hero-subtitle">Discover amazing features and tools</p>
          <router-link to="/signup" class="btn btn-primary">Get Started</router-link>
        </div>
      </section>

      <section class="features">
        <div class="container">
          <h2 class="section-title">Key Features</h2>
          <div class="feature-list">
            <div class="feature-item">
              <i class="icon icon-feature-1"></i>
              <h3 class="feature-title">Feature 1</h3>
              <p class="feature-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div class="feature-item">
              <i class="icon icon-feature-2"></i>
              <h3 class="feature-title">Feature 2</h3>
              <p class="feature-description">
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div class="feature-item">
              <i class="icon icon-feature-3"></i>
              <h3 class="feature-title">Feature 3</h3>
              <p class="feature-description">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="cta">
        <div class="container">
          <h2 class="cta-title">Ready to Get Started?</h2>
          <p class="cta-description">Sign up now and unlock the full potential of our app.</p>
          <router-link to="/signup" class="btn btn-secondary">Sign Up Now</router-link>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} My App. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
})
</script>

<style lang="scss" scoped>
.home-page {
  .header {
    background-color: #f8f8f8;
    padding: 20px 0;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 24px;
      font-weight: bold;
    }

    .nav {
      ul {
        list-style: none;
        display: flex;

        li {
          margin-left: 20px;

          a {
            text-decoration: none;
            color: #333;
            font-weight: bold;

            &:hover {
              color: #007bff;
            }
          }
        }
      }
    }
  }

  .main {
    padding: 40px 0;

    .hero {
      background-color: #007bff;
      color: #fff;
      padding: 80px 0;
      text-align: center;

      .hero-title {
        font-size: 36px;
        margin-bottom: 20px;
      }

      .hero-subtitle {
        font-size: 18px;
        margin-bottom: 40px;
      }

      .btn-primary {
        background-color: #fff;
        color: #007bff;
        padding: 10px 20px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          background-color: #f8f8f8;
        }
      }
    }

    .features {
      padding: 80px 0;
      text-align: center;

      .section-title {
        font-size: 32px;
        margin-bottom: 40px;
      }

      .feature-list {
        display: flex;
        justify-content: center;

        .feature-item {
          max-width: 300px;
          margin: 0 20px;

          .icon {
            font-size: 48px;
            color: #007bff;
            margin-bottom: 20px;
          }

          .feature-title {
            font-size: 24px;
            margin-bottom: 10px;
          }

          .feature-description {
            font-size: 16px;
            color: #666;
          }
        }
      }
    }

    .cta {
      background-color: #f8f8f8;
      padding: 80px 0;
      text-align: center;

      .cta-title {
        font-size: 32px;
        margin-bottom: 20px;
      }

      .cta-description {
        font-size: 18px;
        margin-bottom: 40px;
      }

      .btn-secondary {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }

  .footer {
    background-color: #333;
    color: #fff;
    padding: 20px 0;
    text-align: center;
  }
}
</style>
