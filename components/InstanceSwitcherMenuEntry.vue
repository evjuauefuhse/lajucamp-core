<template>
    <button class="flex flex-row hover:bg-base-300 active:bg-base-300 focus:bg-base-300 h-12 rounded-lg"
        @click="sendToPage">
        <div class="flex flex-col justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 mx-4">
                <slot />
            </svg>
        </div>
        <div class="flex flex-col justify-center items-center">
            <div>{{ props.title }}</div>
        </div>
    </button>
</template>

<script setup>
const props = defineProps(["to", "title"])
const emit = defineEmits(['close'])

async function sendToPage() {
    emit("close")
    await navigateTo(props.to)
}
</script>