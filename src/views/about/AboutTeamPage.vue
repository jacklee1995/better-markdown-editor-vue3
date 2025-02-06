<template>
  <div class="about-team-page">
    <header class="page-header">
      <h1 class="page-title">我们的团队</h1>
      <p class="page-description">
        我们是一支充满激情、富有创造力的团队,致力于为用户提供最好的 Markdown 编辑体验。
      </p>
    </header>

    <main class="page-content">
      <ul class="team-list">
        <li class="team-item" v-for="member in teamMembers" :key="member.id">
          <img :src="member.avatar" :alt="member.name" class="avatar" />
          <div class="info">
            <h3 class="name">{{ member.name }}</h3>
            <p class="title">{{ member.title }}</p>
            <p class="description">{{ member.description }}</p>
            <div class="social-links">
              <a
                v-for="link in member.socialLinks"
                :key="link.icon"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
              >
                <i :class="['iconfont', `icon-${link.icon}`]"></i>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface TeamMember {
  id: number
  name: string
  avatar: string
  title: string
  description: string
  socialLinks: {
    icon: string
    url: string
  }[]
}

export default defineComponent({
  name: 'AboutTeamPage',
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          name: '张三',
          avatar: require('@/assets/images/avatar1.png'),
          title: '创始人 & CEO',
          description: '多年开发经验,主导公司产品和技术方向。',
          socialLinks: [
            {
              icon: 'github',
              url: 'https://github.com/zhangsan',
            },
            {
              icon: 'twitter',
              url: 'https://twitter.com/zhangsan',
            },
          ],
        },
        {
          id: 2,
          name: '李四',
          avatar: require('@/assets/images/avatar2.png'),
          title: '联合创始人 & CTO',
          description: '资深前端工程师,负责前端架构和开发。',
          socialLinks: [
            {
              icon: 'github',
              url: 'https://github.com/lisi',
            },
            {
              icon: 'weibo',
              url: 'https://weibo.com/lisi',
            },
          ],
        },
        {
          id: 3,
          name: '王五',
          avatar: require('@/assets/images/avatar3.png'),
          title: '产品经理',
          description: '负责产品规划、设计和推广。',
          socialLinks: [
            {
              icon: 'twitter',
              url: 'https://twitter.com/wangwu',
            },
            {
              icon: 'zhihu',
              url: 'https://www.zhihu.com/people/wangwu',
            },
          ],
        },
      ] as TeamMember[],
    }
  },
})
</script>

<style lang="scss" scoped>
.about-team-page {
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

    .team-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      list-style: none;
      padding: 0;

      .team-item {
        display: flex;
        align-items: center;
        background-color: #f8f8f8;
        padding: 1.5rem;
        border-radius: 4px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-right: 1.5rem;
        }

        .info {
          flex: 1;

          .name {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }

          .title {
            color: #666;
            margin-bottom: 0.5rem;
          }

          .description {
            color: #999;
            margin-bottom: 1rem;
          }

          .social-links {
            display: flex;

            .social-link {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
              color: #fff;
              background-color: #333;
              transition: background-color 0.3s;

              &:hover {
                background-color: #007bff;
              }

              .iconfont {
                font-size: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
