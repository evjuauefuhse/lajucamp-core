<template>
    <div class="flex flex-row justify-between items-center py-1 space-x-1">
        <router-link :to="'/events/' + props.item.id" class="flex flex-row space-x-1 w-5/6">
            <div class="flex flex-col text-sm font-bold">
                <EventListEntryDateContainer :record="props.item" />
            </div>
            <div class="flex flex-col">
                <h1 class="text-lg font-bold">{{ props.item.name }}</h1>
                <div class="flex gap-2">
                    <div class="badge badge-sm max-w-64 badge-info gap-2 badge-outline text-xs inline-block truncate">
                        {{ props.item.expand.location.name }}
                    </div>
                    <div class="badge badge-sm badge-accent gap-2 badge-outline text-xs inline-block truncate">
                        {{ props.item.expand.category.name }}
                    </div>
                </div>
            </div>
        </router-link>


        <div v-if="props.showFavoriteButton">
            <EventFavoritesButton :id="props.item.id" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["item", "showFavoriteButton"])

const favorites = useFavorites()

</script>

<style scoped>
.event-chip {
    margin: 0.1rem;
}
</style>
