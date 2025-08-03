<template>
    <div v-if="records != null">
        <EventListEntry v-if="records.length > 0" v-for="item in records" :key="item.id" :item="item" />
        <span class="text-sm font-light text-center" v-else>Keine markierten Veranstaltungen stehen an. Sobald du unter "Events" Veranstaltungen markierst, werden sie hier angezeigt.</span>
    </div>
    <div v-else>
        <EventListEntrySkeleton v-for="i in (parseInt((props.limit !== undefined) ? props.limit : 8))" :key="i" />
    </div>
</template>

<script setup>
const props = defineProps(["limit"])
const eventManager = useEventManager()
let records = ref(null)


onMounted(async () => {
    if (props.limit === undefined) {
        records.value = await eventManager.getUpcomingHomepageFavoriteEvents()
    } else {
        records.value = await eventManager.getUpcomingHomepageFavoriteEvents(props.limit)
    }
})

</script>