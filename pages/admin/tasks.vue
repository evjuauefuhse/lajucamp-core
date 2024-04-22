<template>
  <AdminLayoutHeader
    title="Aufgaben"
    subtitle="Hier werden Veranstaltungen angezeigt, bei denen Handlungsbedarf besteht."
    :path="[
      { name: 'Home', path: '/admin', active: false },
      { name: 'Aufgaben', path: '/admin/tasks', active: true },
    ]"
  >
    <!-- Action Buttons here -->
  </AdminLayoutHeader>
  <div class="pl-3">
    <div class="overflow-x-auto">
      <div role="alert" class="alert alert-error mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        
    
        <span>Die hier gelisteten Veranstaltungen erfüllen nicht die Mindestanforderungen, um in der App gelistet zu werden. Sie werden nicht in der App angezeigt, bis die Probleme behoben sind. Bitte behebe die angegebenen Probleme in der Veranstaltungsverwaltung.</span>
        <p></p>
      </div>
      <AdminTaskList :data="events" />
    </div>
  </div>
</template>
<script setup>

const taskStore = useAdminEventTasksStore()
const eventManager = useEventManager();

definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const events = ref([])


for (let [key, value] of Object.entries(taskStore.tasks)) {
  events.value.push({event: await eventManager.getById(key), reason: taskStore.reasons[value]})
}
</script>