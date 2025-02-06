<template>
  <div class="help-index-page">
    <header class="page-header">
      <h1 class="page-title">Help Center</h1>
      <div class="page-subtitle">How can we help you today?</div>
      <div class="search-box">
        <input type="text" placeholder="Search help articles..." />
        <button class="search-btn">Search</button>
      </div>
    </header>

    <main class="page-content">
      <section class="help-categories">
        <div class="category-grid">
          <div class="category-item" v-for="category in helpCategories" :key="category.id">
            <router-link :to="category.link">
              <div class="category-icon">
                <i :class="category.icon"></i>
              </div>
              <h3 class="category-name">{{ category.name }}</h3>
              <p class="category-desc">{{ category.description }}</p>
            </router-link>
          </div>
        </div>
      </section>

      <section class="popular-articles">
        <h2 class="section-title">Popular Articles</h2>
        <ul class="article-list">
          <li v-for="article in popularArticles" :key="article.id">
            <router-link :to="article.link">{{ article.title }}</router-link>
          </li>
        </ul>
      </section>

      <section class="help-cta">
        <h2>Still have questions?</h2>
        <p>Our support team is here to help!</p>
        <router-link to="/help/contact" class="cta-btn">Contact Support</router-link>
      </section>
    </main>

    <footer class="page-footer">
      <div class="footer-links">
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
      </div>
      <div class="footer-copyright">
        &copy; {{ currentYear }} Markdown Editor. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const helpCategories = ref([
  {
    id: 1,
    name: 'Getting Started',
    description: 'Learn how to get started with our markdown editor.',
    icon: 'icon-rocket',
    link: '/help/getting-started',
  },
  {
    id: 2,
    name: 'Editor Basics',
    description: 'Master the basics of using the markdown editor.',
    icon: 'icon-align-left',
    link: '/help/editor-basics',
  },
  {
    id: 3,
    name: 'Keyboard Shortcuts',
    description: 'Work faster with keyboard shortcuts.',
    icon: 'icon-keyboard',
    link: '/help/keyboard-shortcuts',
  },
  {
    id: 4,
    name: 'Themes & Customization',
    description: 'Personalize your editor with themes and settings.',
    icon: 'icon-paint-brush',
    link: '/help/themes-customization',
  },
  {
    id: 5,
    name: 'Exporting & Saving',
    description: 'Learn how to export and save your work.',
    icon: 'icon-download',
    link: '/help/exporting-saving',
  },
  {
    id: 6,
    name: 'Troubleshooting',
    description: 'Solve common issues and problems.',
    icon: 'icon-bug',
    link: '/help/troubleshooting',
  },
])

const popularArticles = ref([
  {
    id: 1,
    title: 'How to create a new document',
    link: '/help/create-new-document',
  },
  {
    id: 2,
    title: 'Keyboard shortcuts cheatsheet',
    link: '/help/keyboard-shortcuts-cheatsheet',
  },
  {
    id: 3,
    title: 'Applying a theme to the editor',
    link: '/help/applying-theme',
  },
  {
    id: 4,
    title: 'Exporting to PDF',
    link: '/help/exporting-pdf',
  },
  {
    id: 5,
    title: 'Troubleshooting synchronization issues',
    link: '/help/troubleshooting-sync',
  },
])
</script>

<style lang="scss" scoped>
.help-index-page {
  .page-header {
    text-align: center;
    padding: 60px 0;
    background-color: #f8f8f8;

    .page-title {
      font-size: 36px;
      margin-bottom: 10px;
    }

    .page-subtitle {
      font-size: 20px;
      color: #666;
    }

    .search-box {
      margin-top: 30px;

      input {
        width: 400px;
        height: 50px;
        padding: 0 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 18px;
      }

      .search-btn {
        height: 50px;
        margin-left: 10px;
        padding: 0 30px;
        border: none;
        border-radius: 5px;
        background-color: #0070f3;
        color: #fff;
        font-size: 18px;
        cursor: pointer;

        &:hover {
          background-color: #0060d9;
        }
      }
    }
  }

  .page-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 0;

    .help-categories {
      margin-bottom: 60px;

      .category-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
      }

      .category-item {
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 5px;
        text-align: center;

        a {
          color: inherit;
          text-decoration: none;
        }

        .category-icon {
          font-size: 36px;
          margin-bottom: 20px;
          color: #0070f3;
        }

        .category-name {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .category-desc {
          color: #666;
        }
      }
    }

    .popular-articles {
      margin-bottom: 60px;

      .section-title {
        font-size: 30px;
        margin-bottom: 20px;
      }

      .article-list {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 10px;

          a {
            color: #0070f3;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    .help-cta {
      text-align: center;

      h2 {
        font-size: 30px;
        margin-bottom: 10px;
      }

      p {
        font-size: 18px;
        color: #666;
        margin-bottom: 20px;
      }

      .cta-btn {
        display: inline-block;
        padding: 15px 30px;
        border-radius: 5px;
        background-color: #0070f3;
        color: #fff;
        font-size: 18px;
        text-decoration: none;

        &:hover {
          background-color: #0060d9;
        }
      }
    }
  }

  .page-footer {
    padding: 30px 0;
    text-align: center;
    border-top: 1px solid #ddd;

    .footer-links {
      margin-bottom: 20px;

      a {
        margin: 0 10px;
        color: #666;
        text-decoration: none;

        &:hover {
          color: #333;
        }
      }
    }

    .footer-copyright {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
