<template>
  <div class="help-page">
    <header class="help-header">
      <h1>{{ $t('help.title') }}</h1>
      <p>{{ $t('help.subtitle') }}</p>
      <div class="help-search">
        <input
          type="text"
          :placeholder="$t('help.searchPlaceholder')"
          v-model="searchQuery"
          @keyup.enter="search"
        />
        <button @click="search">{{ $t('help.searchButton') }}</button>
      </div>
    </header>

    <main class="help-content">
      <aside class="help-sidebar">
        <nav>
          <ul>
            <li v-for="category in helpCategories" :key="category.id">
              <router-link :to="category.link">{{ category.label }}</router-link>
            </li>
          </ul>
        </nav>
      </aside>

      <section class="help-articles">
        <router-view></router-view>
      </section>
    </main>

    <footer class="help-footer">
      <p>{{ $t('help.contactUs') }}</p>
      <ul class="help-contact-links">
        <li>
          <a href="mailto:support@example.com">{{ $t('help.emailUs') }}</a>
        </li>
        <li>
          <a href="tel:+1234567890">{{ $t('help.callUs') }}</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HelpPage',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const searchQuery = ref('')

    const helpCategories = [
      { id: 1, label: t('help.gettingStarted'), link: '/help/getting-started' },
      { id: 2, label: t('help.accountBilling'), link: '/help/account-billing' },
      { id: 3, label: t('help.features'), link: '/help/features' },
      { id: 4, label: t('help.security'), link: '/help/security' },
    ]

    function search() {
      router.push({ path: '/help/search', query: { q: searchQuery.value } })
    }

    return {
      searchQuery,
      helpCategories,
      search,
    }
  },
})
</script>

<style lang="scss" scoped>
.help-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.help-header {
  padding: 2rem;
  text-align: center;
  background-color: #f0f0f0;

  h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
}

.help-search {
  display: flex;
  justify-content: center;

  input {
    width: 300px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0 4px 4px 0;
    background-color: #333;
    color: #fff;
    cursor: pointer;
  }
}

.help-content {
  flex: 1;
  display: flex;
}

.help-sidebar {
  flex: 0 0 250px;
  padding: 2rem;
  background-color: #f8f8f8;

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        color: #333;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.help-articles {
  flex: 1;
  padding: 2rem;
}

.help-footer {
  padding: 1rem;
  text-align: center;
  background-color: #f0f0f0;
  font-size: 0.875rem;

  p {
    margin-bottom: 0.5rem;
  }
}

.help-contact-links {
  list-style: none;
  padding: 0;

  li {
    display: inline-block;
    margin: 0 0.5rem;

    a {
      color: #333;
    }
  }
}
</style>
