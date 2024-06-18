<template>
    <div v-if="items != null" class="flex flex-col space-y-3">
        <LostAndFoundListEntry v-if="items.length > 0" v-for="item in items" :key="item.id" :item="item" />
        <div v-else class="flex items-center h-screen">
            <span class="mx-auto text-sm font-light">Aktuell keine Fundstücke</span>
        </div>
    </div>
    <div v-else class="flex items-center h-screen">
        <span class="mx-auto loading loading-dots loading-lg"></span>
    </div>
</template>

<script setup>

const itemManager = useLostFoundManager()
let items = ref(null)

onMounted(async () => {
    items.value = await itemManager.getList()

})


</script>