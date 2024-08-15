<template>
        <div class="card card-compact bg-base-100 shadow-lg">
            <div v-if="props.item.pictures.length > 1" class="carousel w-full rounded-t-lg">
                <div v-for="(picture, index) in props.item.pictures" :id="'slide' + index" class="carousel-item relative w-full">
                    <figure><img :src="pb.files.getUrl(props.item, props.item.pictures[index])" /></figure>
                </div> 
            </div>
            <div v-else class="rounded-t-lg">
                <figure><img :src="pb.files.getUrl(props.item, props.item.pictures[0])" class="rounded-t-lg" /></figure>
            </div>
            <div class="card-body">
                <h2 class="card-title">{{ props.item.name }}</h2>
                <p>{{ props.item.description }}</p>
                <div class="card-actions justify-end">
                    <router-link :to="'/lostandfound/claim-' + props.item.id" class="btn btn-primary">Das ist meins!</router-link>
                </div>
            </div>
        </div>
</template>

<script setup>
const props = defineProps(['item'])
const pb = useInstanceManager().getPocketBase()
</script>