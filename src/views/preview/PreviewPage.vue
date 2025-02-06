<template>
  <div class="preview-page">
    <div class="preview-header">
      <h1>Preview</h1>
      <nav>
        <ul>
          <li>
            <router-link :to="{ name: `${RouteNames.Preview}-Index` }"> Overview </router-link>
          </li>
          <li>
            <router-link :to="{ name: `${RouteNames.Preview}-File` }"> File </router-link>
          </li>
          <li>
            <router-link :to="{ name: `${RouteNames.Preview}-Markdown` }"> Markdown </router-link>
          </li>
          <li>
            <router-link :to="{ name: `${RouteNames.Preview}-Html` }"> HTML </router-link>
          </li>
          <li>
            <router-link :to="{ name: `${RouteNames.Preview}-Pdf` }"> PDF </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="preview-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router/constants'
</script>

<style lang="scss" scoped>
.preview-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  .preview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #e8e8e8;

    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }

    nav {
      ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          margin-left: 20px;

          &:first-child {
            margin-left: 0;
          }

          a {
            color: #333;
            text-decoration: none;
            font-weight: bold;

            &:hover {
              color: #007bff;
            }

            &.router-link-active {
              color: #007bff;
            }
          }
        }
      }
    }
  }

  .preview-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }
}
</style>
