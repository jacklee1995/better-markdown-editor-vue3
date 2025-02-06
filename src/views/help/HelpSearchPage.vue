<template>
  <div class="help-search-page">
    <header class="page-header">
      <h1 class="page-title">Search Help</h1>
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search help topics..."
          @keyup.enter="searchHelp"
        />
        <button @click="searchHelp">Search</button>
      </div>
    </header>

    <main class="page-content">
      <div v-if="isLoading" class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i>
      </div>

      <div v-else-if="searchResults.length === 0" class="no-results">
        <p>No results found for "{{ searchQuery }}".</p>
        <p>Try searching for something else.</p>
      </div>

      <ul v-else class="search-results">
        <li v-for="result in searchResults" :key="result.id">
          <router-link :to="result.url">
            <h2>{{ result.title }}</h2>
            <p>{{ result.excerpt }}</p>
          </router-link>
        </li>
      </ul>
    </main>

    <footer class="page-footer">
      <p>Powered by Markdown Editor Help</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { searchHelpTopics, HelpSearchResult } from '@/api/help'

export default defineComponent({
  name: 'HelpSearchPage',

  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const searchResults = ref<HelpSearchResult[]>([])
    const isLoading = ref(false)

    async function searchHelp() {
      if (searchQuery.value.trim() === '') {
        return
      }

      isLoading.value = true

      try {
        const results = await searchHelpTopics(searchQuery.value)
        searchResults.value = results
      } catch (error) {
        console.error('Failed to search help topics:', error)
        // TODO: Show error message to user
      }

      isLoading.value = false
    }

    return {
      searchQuery,
      searchResults,
      isLoading,
      searchHelp,
    }
  },
})
</script>

<style lang="scss" scoped>
.help-search-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-header {
  padding: 2rem;
  background-color: #f0f0f0;
  text-align: center;

  .page-title {
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  .search-box {
    display: flex;
    justify-content: center;

    input[type='text'] {
      width: 100%;
      max-width: 30rem;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      font-size: 1rem;
    }

    button {
      margin-left: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 0.25rem;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}

.page-content {
  flex: 1;
  padding: 2rem;

  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: #007bff;
  }

  .no-results {
    text-align: center;

    p {
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }
  }

  .search-results {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 1.5rem;

      a {
        display: block;
        padding: 1rem;
        background-color: #f8f8f8;
        border-radius: 0.25rem;
        text-decoration: none;
        color: #333;

        &:hover {
          background-color: #f0f0f0;
        }

        h2 {
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }

        p {
          font-size: 1rem;
        }
      }
    }
  }
}

.page-footer {
  padding: 1rem;
  background-color: #f0f0f0;
  text-align: center;
  font-size: 0.875rem;
}
</style>
