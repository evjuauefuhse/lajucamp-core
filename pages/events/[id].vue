<template>
  <CardLikeContainer>
    <div v-if="record != null">
      <span class="text-sm font-light"
        >{{
          new Intl.DateTimeFormat("de", {
            weekday: "long",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(record.start))
        }}
        -
        {{
          new Intl.DateTimeFormat("de", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(record.end))
        }}</span
      >
      <div class="flex flex-row justify-between space-x-2">
        <h1 class="text-3xl">{{ record.name }}</h1>
        <FavoriteButton :id="record.id" />
      </div>
      <TeamNote v-if="record.team !== undefined" :team="record.team" />
      <div class="flex gap-2 py-2">
	<EventLocationChip :name="record.expand.location.name" :id="record.expand.location.id" />
        <div class="badge badge-accent gap-2 badge-outline badge-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>

          {{ record.expand.category.name }}
        </div>
      </div>
      <div class="prose" v-html="record.description"></div>
    </div>
    <div v-else class="flex items-center h-screen">
      <span class="mx-auto loading loading-dots loading-lg"></span>
    </div>
  </CardLikeContainer>
</template>

<script setup>
const route = useRoute();
const eventManager = useEventManager();
const record = ref(null);
const favorites = useFavorites()

onMounted(async () => {
  record.value = await eventManager.getById(route.params.id);
});
</script>
