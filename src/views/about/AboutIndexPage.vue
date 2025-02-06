<template>
  <div class="about-index-page">
    <header class="page-header">
      <h1 class="page-title">关于我们</h1>
      <p class="page-description">
        我们是一支充满激情、富有创造力的团队,致力于为用户提供最好的 Markdown 编辑体验。
      </p>
    </header>

    <main class="page-content">
      <section class="company-intro">
        <h2 class="section-title">公司简介</h2>
        <p>
          我们的愿景是成为 Markdown 编辑领域的领导者,为全球的写作者、开发者、设计师等提供一流的
          Markdown 编辑工具和服务。
        </p>
        <p>
          我们的产品 Better Markdown 是一款基于 Web 技术的现代化 Markdown
          编辑器,它集成了众多强大的功能和优秀的用户体验,帮助你更高效、更优雅地创作 Markdown 内容。
        </p>
      </section>

      <section class="team-intro">
        <h2 class="section-title">团队介绍</h2>
        <ul class="team-list">
          <li class="team-item">
            <img src="@/assets/images/avatar1.png" alt="Avatar" class="avatar" />
            <h3 class="name">张三</h3>
            <p class="title">创始人 & CEO</p>
            <p class="description">多年开发经验,主导公司产品和技术方向。</p>
          </li>
          <li class="team-item">
            <img src="@/assets/images/avatar2.png" alt="Avatar" class="avatar" />
            <h3 class="name">李四</h3>
            <p class="title">联合创始人 & CTO</p>
            <p class="description">资深前端工程师,负责前端架构和开发。</p>
          </li>
          <li class="team-item">
            <img src="@/assets/images/avatar3.png" alt="Avatar" class="avatar" />
            <h3 class="name">王五</h3>
            <p class="title">产品经理</p>
            <p class="description">负责产品规划、设计和推广。</p>
          </li>
        </ul>
      </section>

      <section class="join-us">
        <h2 class="section-title">加入我们</h2>
        <p>我们是一支充满朝气、富有激情的团队,欢迎志同道合的你加入我们,一起创造更多优秀的产品!</p>
        <p>
          如果你对我们的事业感兴趣,请发送简历至
          <a href="mailto:hr@example.com">hr@example.com</a>,我们会尽快与你联系。
        </p>
      </section>
    </main>

    <footer class="page-footer">
      <p>&copy; {{ new Date().getFullYear() }} Better Markdown. All rights reserved.</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutIndexPage',
})
</script>

<style lang="scss" scoped>
.about-index-page {
  padding: 2rem;

  .page-header {
    text-align: center;
    margin-bottom: 2rem;

    .page-title {
      font-size: 2rem;
      font-weight: bold;
    }

    .page-description {
      font-size: 1.2rem;
      color: #666;
    }
  }

  .page-content {
    max-width: 800px;
    margin: 0 auto;

    .section-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .company-intro,
    .team-intro,
    .join-us {
      margin-bottom: 2rem;
    }

    .team-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      list-style: none;
      padding: 0;

      .team-item {
        text-align: center;

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-bottom: 1rem;
        }

        .name {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .title {
          color: #666;
          margin-bottom: 0.5rem;
        }

        .description {
          color: #999;
        }
      }
    }
  }

  .page-footer {
    text-align: center;
    color: #999;
    padding: 1rem;
    border-top: 1px solid #eee;
  }
}
</style>
