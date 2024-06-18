<template>
  <LayoutThemeHelper>
    <main :data-theme="theme.getCurrentTheme()" class="content relative">
      <slot />
    </main>
  </LayoutThemeHelper>
</template>

<script setup>
const theme = useTheme();
</script>
