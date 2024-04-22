<template>
  <AdminHomeGreeting class="mb-3"/>
  <RouterLink to="/admin/tasks" v-if="Object.keys(taskStore.tasks).length !== 0">
    <div role="alert" class="alert alert-error m-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
      
  
      <span>Es besteht Handlungsbedarf. Einige Veranstaltungen werden nicht angezeigt, solange du dieses Problem nicht behebst.</span>
      <p></p>
    </div>
  </RouterLink>

  <div class="stats stats-vertical lg:stats-horizontal shadow w-full mx-3">
    <div class="stat">
      <div class="stat-title">Meine Events</div>
      <div class="stat-value text-orange-600">{{ myEvents }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Events</div>
      <div class="stat-value text-purple-600">{{ allEvents }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Kategorien</div>
      <div class="stat-value text-red-600">{{ allCats }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Posts</div>
      <div class="stat-value text-green-600">{{ allPosts }}</div>
    </div>
  </div>

  <div class="pt-3 flex md:flex-row flex-col space-y-5 md:space-x-5 mx-3">
    <HomepageWelcomeCardBundle class="w-full" />
    <HomepageEventListCard class="w-full" />
    <SingleNewsCard class="w-full" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const pb = usePocketBase();
const eventManager = useEventManager();
const categoryManager = useCategoryManager();
const postManager = usePostManager();

const allEvents = (await eventManager.getList()).length;
const allCats = (await categoryManager.getList()).length;
const allPosts = (await postManager.getList()).length;
const myEvents = (await eventManager.getList(-1, pb.authStore.model.team)).length;
const taskStore = useAdminEventTasksStore()
</script>
