<template>
  <div class="home-index-page">
    <header class="header">
      <div class="container">
        <h1 class="title">{{ $t('home.title') }}</h1>
        <p class="subtitle">{{ $t('home.subtitle') }}</p>
        <div class="actions">
          <router-link to="/editor" class="btn btn-primary btn-lg">{{
            $t('home.startWriting')
          }}</router-link>
          <router-link to="/about" class="btn btn-secondary btn-lg">{{
            $t('home.learnMore')
          }}</router-link>
        </div>
      </div>
    </header>

    <main class="main">
      <section class="features">
        <div class="container">
          <h2 class="section-title">{{ $t('home.featuresTitle') }}</h2>
          <div class="feature-list">
            <div class="feature-item">
              <i class="icon icon-edit"></i>
              <h3 class="title">{{ $t('home.feature1Title') }}</h3>
              <p class="desc">{{ $t('home.feature1Desc') }}</p>
            </div>
            <div class="feature-item">
              <i class="icon icon-preview"></i>
              <h3 class="title">{{ $t('home.feature2Title') }}</h3>
              <p class="desc">{{ $t('home.feature2Desc') }}</p>
            </div>
            <div class="feature-item">
              <i class="icon icon-export"></i>
              <h3 class="title">{{ $t('home.feature3Title') }}</h3>
              <p class="desc">{{ $t('home.feature3Desc') }}</p>
            </div>
            <div class="feature-item">
              <i class="icon icon-theme"></i>
              <h3 class="title">{{ $t('home.feature4Title') }}</h3>
              <p class="desc">{{ $t('home.feature4Desc') }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="get-started">
        <div class="container">
          <h2 class="section-title">{{ $t('home.getStartedTitle') }}</h2>
          <ol class="step-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <h3 class="title">{{ $t('home.step1Title') }}</h3>
                <p class="desc">{{ $t('home.step1Desc') }}</p>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <h3 class="title">{{ $t('home.step2Title') }}</h3>
                <p class="desc">{{ $t('home.step2Desc') }}</p>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <h3 class="title">{{ $t('home.step3Title') }}</h3>
                <p class="desc">{{ $t('home.step3Desc') }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <p class="copyright">
          &copy; {{ new Date().getFullYear() }} Markdown Editor. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeIndexPage',
})
</script>

<style lang="scss" scoped>
.home-index-page {
  .header {
    background-color: #f8f8f8;
    padding: 80px 0;
    text-align: center;

    .title {
      font-size: 48px;
      margin-bottom: 20px;
    }

    .subtitle {
      font-size: 24px;
      color: #666;
      margin-bottom: 40px;
    }

    .actions {
      .btn {
        margin: 0 10px;
      }
    }
  }

  .main {
    padding: 80px 0;

    .section-title {
      font-size: 36px;
      text-align: center;
      margin-bottom: 60px;
    }
  }

  .features {
    background-color: #fff;

    .feature-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .feature-item {
        width: 300px;
        padding: 30px;
        text-align: center;
        margin: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

        .icon {
          font-size: 48px;
          color: #333;
          margin-bottom: 20px;
        }

        .title {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .desc {
          font-size: 16px;
          color: #666;
        }
      }
    }
  }

  .get-started {
    background-color: #f8f8f8;

    .step-list {
      max-width: 800px;
      margin: 0 auto;
      counter-reset: step;

      .step-item {
        display: flex;
        align-items: center;
        margin-bottom: 40px;

        .step-num {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #333;
          color: #fff;
          font-size: 24px;
          text-align: center;
          line-height: 60px;
          margin-right: 20px;
          counter-increment: step;

          &::before {
            content: counter(step);
          }
        }

        .step-content {
          flex: 1;

          .title {
            font-size: 24px;
            margin-bottom: 10px;
          }

          .desc {
            font-size: 16px;
            color: #666;
          }
        }
      }
    }
  }

  .footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 20px 0;

    .copyright {
      font-size: 14px;
    }
  }
}
</style>
