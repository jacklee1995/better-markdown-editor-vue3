<template>
  <div class="help-topic-page">
    <div class="topic-header">
      <h1 class="topic-title">{{ topic.title }}</h1>
      <p class="topic-meta">
        <span>Last updated: {{ topic.updatedAt }}</span>
        <span>Author: {{ topic.author }}</span>
      </p>
    </div>

    <div class="topic-content" v-html="topic.content"></div>

    <div class="topic-footer">
      <div class="topic-tags">
        <span class="tag" v-for="tag in topic.tags" :key="tag">{{ tag }}</span>
      </div>

      <div class="topic-actions">
        <button class="btn btn-primary" @click="editTopic">Edit</button>
        <button class="btn btn-danger" @click="deleteTopic">Delete</button>
      </div>
    </div>

    <div class="related-topics">
      <h2>Related Topics</h2>
      <ul>
        <li v-for="related in relatedTopics" :key="related.id">
          <router-link :to="{ name: 'HelpTopic', params: { id: related.id } }">
            {{ related.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHelpStore } from '@/store/help'

const route = useRoute()
const router = useRouter()
const helpStore = useHelpStore()

const topic = ref({
  id: '',
  title: '',
  content: '',
  tags: [] as string[],
  author: '',
  updatedAt: '',
})

const relatedTopics = ref([])

onMounted(async () => {
  const topicId = route.params.id as string
  topic.value = await helpStore.fetchTopic(topicId)
  relatedTopics.value = await helpStore.fetchRelatedTopics(topicId)
})

function editTopic() {
  router.push({ name: 'HelpTopicEdit', params: { id: topic.value.id } })
}

async function deleteTopic() {
  await helpStore.deleteTopic(topic.value.id)
  router.push({ name: 'HelpIndex' })
}
</script>

<style lang="scss" scoped>
.help-topic-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  .topic-header {
    margin-bottom: 2rem;

    .topic-title {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .topic-meta {
      color: #666;
      font-size: 0.9rem;

      span {
        margin-right: 1rem;
      }
    }
  }

  .topic-content {
    line-height: 1.6;

    h2 {
      font-size: 1.5rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #ddd;
    }

    p {
      margin-bottom: 1rem;
    }

    ul,
    ol {
      margin-bottom: 1rem;
      padding-left: 2rem;

      li {
        margin-bottom: 0.5rem;
      }
    }

    pre {
      background-color: #f4f4f4;
      padding: 1rem;
      overflow-x: auto;
    }

    code {
      font-family: monospace;
      background-color: #f4f4f4;
      padding: 0.25rem;
    }
  }

  .topic-footer {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .topic-tags {
      .tag {
        display: inline-block;
        background-color: #ddd;
        color: #333;
        padding: 0.25rem 0.5rem;
        margin-right: 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.8rem;
      }
    }

    .topic-actions {
      .btn {
        margin-left: 1rem;
      }
    }
  }

  .related-topics {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #ddd;

    h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

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
}
</style>
