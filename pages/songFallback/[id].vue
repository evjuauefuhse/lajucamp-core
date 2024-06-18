<template>
    <div v-if="song !== null">

        <CardLikeContainer>
            <h1 class="text-3xl">{{ song.name }}</h1>
            <p class="leading-normal text-lg" v-html="song.content"></p>
        </CardLikeContainer>
    </div>
</template>

<script setup>
const route = useRoute()
const song = ref(null)
const songs = useSongManager()

onMounted(async () => {
    song.value = await songs.getById(route.params.id)
})
</script>