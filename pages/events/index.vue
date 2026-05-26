<template>
    <CardLikeContainer>
        <h1 class="text-3xl pb-3">Veranstaltungen</h1>
    </CardLikeContainer>
    <EventListSplitted class="h-full" :filtercat="route.query.filtercat"/>
</template>

<script setup>
const route = useRoute()


</script>
