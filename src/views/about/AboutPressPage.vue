<template>
  <div class="about-press-page">
    <header class="page-header">
      <h1 class="page-title">新闻报道</h1>
      <p class="page-description">
        我们的产品和团队受到了业界的广泛关注和认可,以下是一些主要的新闻报道。
      </p>
    </header>

    <main class="page-content">
      <ul class="press-list">
        <li class="press-item" v-for="item in pressList" :key="item.id">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <img :src="item.cover" :alt="item.title" class="cover" />
            <div class="info">
              <h3 class="title">{{ item.title }}</h3>
              <p class="source">{{ item.source }}</p>
              <p class="date">{{ item.date }}</p>
            </div>
          </a>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface PressItem {
  id: number
  title: string
  source: string
  date: string
  cover: string
  url: string
}

export default defineComponent({
  name: 'AboutPressPage',
  data() {
    return {
      pressList: [
        {
          id: 1,
          title: 'Better Markdown: 为 Markdown 创作提供更优雅的体验',
          source: '36氪',
          date: '2022-01-01',
          cover: require('@/assets/images/press-cover-1.jpg'),
          url: 'https://example.com/press/1',
        },
        {
          id: 2,
          title: '写作者的新选择:Better Markdown 让 Markdown 写作更高效',
          source: '少数派',
          date: '2022-02-15',
          cover: require('@/assets/images/press-cover-2.jpg'),
          url: 'https://example.com/press/2',
        },
        {
          id: 3,
          title: 'Better Markdown: 重新定义 Markdown 编辑器',
          source: 'TechCrunch',
          date: '2022-03-10',
          cover: require('@/assets/images/press-cover-3.jpg'),
          url: 'https://example.com/press/3',
        },
      ] as PressItem[],
    }
  },
})
</script>

<style lang="scss" scoped>
.about-press-page {
  padding: 2rem;

  .page-header {
    text-align: center;
    margin-bottom: 2rem;

    .page-title {
      font-size: 2rem;
      font-weight: bold;
    }

    .page-description {
      color: #666;
    }
  }

  .page-content {
    .press-list {
      list-style: none;
      padding: 0;

      .press-item {
        margin-bottom: 1.5rem;

        a {
          display: flex;
          align-items: center;
          border: 1px solid #eee;
          border-radius: 4px;
          padding: 1rem;
          color: inherit;
          text-decoration: none;
          transition: box-shadow 0.3s;

          &:hover {
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          }

          .cover {
            width: 120px;
            height: 80px;
            object-fit: cover;
            margin-right: 1rem;
          }

          .info {
            flex: 1;

            .title {
              font-size: 1.2rem;
              font-weight: bold;
              margin-bottom: 0.5rem;
            }

            .source {
              color: #999;
              margin-bottom: 0.25rem;
            }

            .date {
              color: #999;
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
}
</style>
