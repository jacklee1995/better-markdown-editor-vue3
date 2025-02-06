<template>
  <div class="about-careers-page">
    <header class="page-header">
      <h1 class="page-title">Careers at Better Markdown</h1>
      <p class="page-description">
        Join our team and help us build the best Markdown editor for developers!
      </p>
    </header>

    <main class="page-content">
      <section class="job-openings">
        <h2 class="section-title">Current Job Openings</h2>
        <ul class="job-list">
          <li class="job-item" v-for="job in jobs" :key="job.id">
            <h3 class="job-title">{{ job.title }}</h3>
            <p class="job-description">{{ job.description }}</p>
            <a :href="job.applyUrl" class="job-apply-link">Apply Now</a>
          </li>
        </ul>
      </section>

      <section class="why-join-us">
        <h2 class="section-title">Why Join Us</h2>
        <ul class="reasons-list">
          <li class="reason-item">Work on an exciting, innovative product</li>
          <li class="reason-item">Collaborate with a talented, passionate team</li>
          <li class="reason-item">Opportunities for growth and learning</li>
          <li class="reason-item">Competitive salary and benefits</li>
          <li class="reason-item">Flexible work hours and location</li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    description:
      'We are looking for an experienced frontend engineer to help build our core product using Vue.js, TypeScript, and cutting-edge web technologies.',
    applyUrl: '/jobs/senior-frontend-engineer',
  },
  {
    id: 2,
    title: 'Markdown Parsing Specialist',
    description:
      'We are seeking a Markdown expert to work on our custom Markdown parsing engine. Deep knowledge of Markdown syntax and experience with parsing libraries required.',
    applyUrl: '/jobs/markdown-parsing-specialist',
  },
  // ...more job listings
]
</script>

<style scoped lang="scss">
.about-careers-page {
  padding: 2rem;

  .page-header {
    text-align: center;
    margin-bottom: 2rem;

    .page-title {
      font-size: 2rem;
    }

    .page-description {
      font-size: 1.25rem;
      color: #666;
    }
  }

  .page-content {
    section {
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .job-list {
      list-style: none;
      padding: 0;

      .job-item {
        margin-bottom: 1.5rem;

        .job-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .job-description {
          color: #666;
          margin-bottom: 0.5rem;
        }

        .job-apply-link {
          color: #007bff;
        }
      }
    }

    .reasons-list {
      list-style: disc;
      padding-left: 1.5rem;

      .reason-item {
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
