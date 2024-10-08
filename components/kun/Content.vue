<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify'

defineProps<{
  content: string
}>()
</script>

<template>
  <div
    class="kungalgame-content"
    v-html="DOMPurify.sanitize(content, { ADD_ATTR: ['line'] })"
  />
</template>

<style lang="scss">
@use '~/assets/css/editor/index.scss';

.kungalgame-content {
  width: 100%;
  padding-top: 10px;
  padding-right: 17px;

  * {
    &:not(ul, ol, li, blockquote) {
      white-space: pre-wrap;
      word-break: break-word;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    color: var(--kungalgame-font-color-3);
  }

  h1,
  h2 {
    padding-top: 16px;
    margin-bottom: 24px;
    margin-top: 48px;
    border-top: 1px solid var(--kungalgame-trans-blue-2);
  }

  h3,
  h4 {
    margin-top: 32px;
    margin-bottom: 16px;
  }

  h5,
  h6 {
    margin: 8px 0;
  }

  ul,
  ol {
    line-height: 2rem;
  }

  img {
    max-width: 100%;
  }

  del {
    text-decoration: line-through;
  }

  p {
    margin: 17px 0;

    code {
      margin: 0 5px;
      background-color: var(--kungalgame-trans-blue-1);
      padding: 2px 7px;
      border-radius: 7px;
    }
  }

  blockquote {
    margin: 17px 0;
    padding: 17px;
    border-left: 5px solid var(--kungalgame-blue-5);
    border-radius: 10px;
    background-color: var(--kungalgame-trans-blue-0);
    color: var(--kungalgame-font-color-3);
    line-height: 2rem;

    p {
      margin: 0;
    }
  }

  pre {
    margin: 17px 0;
    border-radius: 5px;
    padding: 17px;
    background-color: var(--kungalgame-trans-white-5);
    position: relative;
    box-shadow: var(--shadow);
    overflow-x: auto;

    code {
      font-size: 15px;
      font-family: monospace;
      float: left;
      min-width: 100%;

      .code-line {
        display: block;
        padding-left: 16px;
        padding-right: 16px;
        margin-left: -16px;
        margin-right: -16px;
        border-left: 4px solid transparent;
      }

      .code-line.inserted {
        color: var(--kungalgame-white-5);
        background-color: var(--kungalgame-green-4);
      }

      .code-line.deleted {
        color: var(--kungalgame-white-5);
        background-color: var(--kungalgame-red-5);
      }

      .highlight-line {
        margin-left: -16px;
        margin-right: -16px;
        background-color: var(--kungalgame-trans-blue-1);
        border-left: 4px solid var(--kungalgame-blue-5);
      }

      .line-number::before {
        display: inline-block;
        width: 1rem;
        text-align: right;
        margin-right: 16px;
        margin-left: -8px;
        color: var(--kungalgame-gray-4);
        content: attr(line);
      }
    }
  }

  a {
    cursor: pointer;
    font-weight: bold;
    color: var(--kungalgame-blue-5);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  table {
    border: 1px solid var(--kungalgame-blue-5);
    border-radius: 5px;
    white-space: nowrap;
  }

  th,
  td {
    border: 1px solid var(--kungalgame-blue-5);
    padding: 3px;
    text-align: left;
  }

  tr:nth-child(even) {
    background-color: var(--kungalgame-trans-blue-1);
  }

  .tableWrapper {
    color: var(--kungalgame-font-color-3);
    position: relative;
    overflow-x: auto;
  }
}

@media (max-width: 700px) {
  .kungalgame-content {
    padding: 10px;
  }
}
</style>
