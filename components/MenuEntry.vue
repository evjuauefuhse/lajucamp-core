<template>
    <div @click="sendToPage" v-if="!props.to.startsWith('http')">
        <li>
            <a class="px-1">
                <div>
                    <slot />
                    {{ props.name }}
                </div>
            </a>
        </li>
    </div>
    <li v-else>
        <a :href="props.to" class="px-1">
            <slot />
            {{ props.name }}
        </a>
    </li>


</template>

<script setup>
const props = defineProps(['name', 'to'])
const emit = defineEmits(["close"])

async function sendToPage() {
    emit("close")
    await navigateTo(props.ot)
}
</script>