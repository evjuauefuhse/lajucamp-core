<template>
    <div v-if="data != null">
        <MusicListFallbackEntry v-for="item in data" :key="item.id" :item="item" />
    </div>
    <div v-else>
        <EventListEntrySkeleton v-for="i in 8" :key="i" />
    </div>
</template>

<script setup>
const pb = useInstanceManager().getPocketBase()
const songManager = useSongManager()
const data = ref(null)

data.value = await songManager.getList()


</script>