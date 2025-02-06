<template>
  <div class="home-testimonials-page">
    <header class="page-header">
      <h1 class="page-title">{{ $t('home.testimonials.title') }}</h1>
      <p class="page-subtitle">{{ $t('home.testimonials.subtitle') }}</p>
    </header>

    <main class="page-content">
      <div class="testimonial-list">
        <div class="testimonial-item" v-for="testimonial in testimonials" :key="testimonial.id">
          <div class="testimonial-content">
            <p class="testimonial-text">"{{ testimonial.content }}"</p>
          </div>
          <div class="testimonial-author">
            <img :src="testimonial.avatar" :alt="testimonial.name" class="testimonial-avatar" />
            <div class="testimonial-info">
              <p class="testimonial-name">{{ testimonial.name }}</p>
              <p class="testimonial-title">{{ testimonial.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Testimonial {
  id: number
  content: string
  name: string
  avatar: string
  title: string
}

const testimonials = ref<Testimonial[]>([
  {
    id: 1,
    content:
      'This is the best Markdown editor I have ever used. It has all the features I need and the user experience is amazing!',
    name: 'John Doe',
    avatar: 'https://example.com/avatar1.jpg',
    title: 'Software Engineer',
  },
  {
    id: 2,
    content:
      'I love how easy it is to create beautiful documents with this editor. The preview feature is really helpful and the export options are great.',
    name: 'Jane Smith',
    avatar: 'https://example.com/avatar2.jpg',
    title: 'Technical Writer',
  },
  {
    id: 3,
    content:
      'As a developer, I appreciate the powerful features and customization options of this Markdown editor. It has greatly improved my productivity.',
    name: 'Mike Johnson',
    avatar: 'https://example.com/avatar3.jpg',
    title: 'Front-end Developer',
  },
])
</script>

<style scoped lang="scss">
.home-testimonials-page {
  padding: 2rem;

  .page-header {
    text-align: center;
    margin-bottom: 2rem;

    .page-title {
      font-size: 2.5rem;
      color: #333;
    }

    .page-subtitle {
      font-size: 1.25rem;
      color: #666;
    }
  }

  .page-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .testimonial-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .testimonial-item {
    padding: 1.5rem;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .testimonial-content {
    margin-bottom: 1.5rem;

    .testimonial-text {
      font-size: 1.125rem;
      color: #333;
      line-height: 1.6;
    }
  }

  .testimonial-author {
    display: flex;
    align-items: center;

    .testimonial-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 1rem;
    }

    .testimonial-info {
      .testimonial-name {
        font-size: 1.125rem;
        font-weight: bold;
        color: #333;
      }

      .testimonial-title {
        font-size: 0.875rem;
        color: #666;
      }
    }
  }
}
</style>
