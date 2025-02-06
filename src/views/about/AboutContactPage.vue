<template>
  <div class="about-contact-page">
    <header class="page-header">
      <h1 class="page-title">联系我们</h1>
      <p class="page-description">
        如果您有任何问题、建议或合作意向,欢迎联系我们。我们会尽快回复您的信息。
      </p>
    </header>

    <main class="page-content">
      <section class="contact-info">
        <h2>联系方式</h2>
        <ul>
          <li>
            <i class="iconfont icon-location"></i>
            <span>地址:北京市海淀区中关村大街 xxx 号</span>
          </li>
          <li>
            <i class="iconfont icon-phone"></i>
            <span>电话:010-xxxxxxxx</span>
          </li>
          <li>
            <i class="iconfont icon-email"></i>
            <span>邮箱:<a href="mailto:contact@example.com">contact@example.com</a></span>
          </li>
        </ul>
      </section>

      <section class="contact-form">
        <h2>发送信息</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">姓名:</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label for="email">邮箱:</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label for="message">信息:</label>
            <textarea id="message" v-model="form.message" required></textarea>
          </div>
          <button type="submit">发送</button>
        </form>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

interface ContactForm {
  name: string
  email: string
  message: string
}

export default defineComponent({
  name: 'AboutContactPage',
  setup() {
    const form = reactive<ContactForm>({
      name: '',
      email: '',
      message: '',
    })

    const handleSubmit = () => {
      // TODO: 发送联系信息
      console.log('发送联系信息:', form)
      // 重置表单
      form.name = ''
      form.email = ''
      form.message = ''
    }

    return {
      form,
      handleSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
.about-contact-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .page-header {
    text-align: center;
    margin-bottom: 40px;

    .page-title {
      font-size: 32px;
      font-weight: bold;
    }

    .page-description {
      font-size: 18px;
      color: #666;
    }
  }

  .page-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    .contact-info {
      h2 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .iconfont {
            font-size: 24px;
            margin-right: 10px;
            color: #333;
          }

          span {
            font-size: 18px;
          }
        }
      }
    }

    .contact-form {
      h2 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .form-group {
        margin-bottom: 20px;

        label {
          display: block;
          font-size: 18px;
          margin-bottom: 5px;
        }

        input,
        textarea {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        textarea {
          height: 120px;
        }
      }

      button {
        padding: 10px 20px;
        font-size: 18px;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }
}
</style>
