<template>
  <div class="home-features-page">
    <header class="page-header">
      <h1 class="page-title">{{ $t('home.features.title') }}</h1>
      <p class="page-subtitle">{{ $t('home.features.subtitle') }}</p>
    </header>

    <main class="page-content">
      <section class="feature-section">
        <div class="feature-icon">
          <i class="icon-edit"></i>
        </div>
        <div class="feature-content">
          <h2 class="feature-title">{{ $t('home.features.editing.title') }}</h2>
          <p class="feature-description">{{ $t('home.features.editing.description') }}</p>
        </div>
      </section>

      <section class="feature-section">
        <div class="feature-icon">
          <i class="icon-preview"></i>
        </div>
        <div class="feature-content">
          <h2 class="feature-title">{{ $t('home.features.preview.title') }}</h2>
          <p class="feature-description">{{ $t('home.features.preview.description') }}</p>
        </div>
      </section>

      <section class="feature-section">
        <div class="feature-icon">
          <i class="icon-sync"></i>
        </div>
        <div class="feature-content">
          <h2 class="feature-title">{{ $t('home.features.sync.title') }}</h2>
          <p class="feature-description">{{ $t('home.features.sync.description') }}</p>
        </div>
      </section>

      <section class="feature-section">
        <div class="feature-icon">
          <i class="icon-collab"></i>
        </div>
        <div class="feature-content">
          <h2 class="feature-title">{{ $t('home.features.collaboration.title') }}</h2>
          <p class="feature-description">{{ $t('home.features.collaboration.description') }}</p>
        </div>
      </section>

      <section class="feature-section">
        <div class="feature-icon">
          <i class="icon-export"></i>
        </div>
        <div class="feature-content">
          <h2 class="feature-title">{{ $t('home.features.export.title') }}</h2>
          <p class="feature-description">{{ $t('home.features.export.description') }}</p>
        </div>
      </section>

      <section class="feature-section">
        <div class="feature-icon">
          <i class="icon-theme"></i>
        </div>
        <div class="feature-content">
          <h2 class="feature-title">{{ $t('home.features.customization.title') }}</h2>
          <p class="feature-description">{{ $t('home.features.customization.description') }}</p>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <router-link to="/signup" class="cta-button">
        {{ $t('home.features.cta') }}
      </router-link>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.home-features-page {
  padding: 2rem;

  .page-header {
    text-align: center;
    margin-bottom: 3rem;

    .page-title {
      font-size: 2.5rem;
      font-weight: bold;
      color: #333;
    }

    .page-subtitle {
      font-size: 1.25rem;
      color: #666;
    }
  }

  .page-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;

    .feature-section {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      background-color: #f8f8f8;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .feature-icon {
        font-size: 2rem;
        color: #007aff;
        margin-right: 1.5rem;
      }

      .feature-content {
        .feature-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .feature-description {
          font-size: 1rem;
          color: #666;
        }
      }
    }
  }

  .page-footer {
    margin-top: 3rem;
    text-align: center;

    .cta-button {
      display: inline-block;
      padding: 1rem 2rem;
      font-size: 1.25rem;
      font-weight: bold;
      color: #fff;
      background-color: #007aff;
      border-radius: 4px;
      text-decoration: none;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: darken(#007aff, 10%);
      }
    }
  }
}
</style>
