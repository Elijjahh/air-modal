<script setup lang="ts"></script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 12px 40px;
  border: none;

  border-radius: 1000px;
  background: rgb(23, 75, 124);

  color: rgb(255, 255, 255);

  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: center;

  transition: background 0.3s;

  &:hover {
    background: rgb(15, 49, 81);
  }
}
</style>
