<template>
  <AdminLayoutHeader
    title="Neue Seite erstellen"
    subtitle="Diese Seite wird in der App unter 'Mehr' angezeigt."
    :path="[
      { name: 'Home', path: '/admin', active: false },
      { name: 'Seiten', path: '/admin/pages', active: false },
      { name: 'Neue Seite', path: '/admin/pages/new', active: true },
    ]"
  >
    <div class="btn btn-primary">Speichern</div>

  </AdminLayoutHeader>
  <div class="pl-3">
    <div class="overflow-x-auto">
      <AdminPageEdit />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: "auth",
  layout: "admin",
});
</script>