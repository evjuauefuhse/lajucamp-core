<template>
    <CardLikeContainer>
        <h1 class="text-3xl pb-3">Entwickleroptionen</h1>
        <div class="flex flex-col justify-center space-y-2">
            <button class="btn btn-primary" @click="resetCaches">Caches zurücksetzen</button>
            <RouterLink class="btn btn-primary" to="/admin">Admin Bereich erzwingen</RouterLink>
            <RouterLink class="btn btn-primary" to="/music">Reguläres Liederbuch erzwingen</RouterLink>
            <RouterLink class="btn btn-primary" to="/songFallback">Fallback Liederbuch erzwingen</RouterLink>
        </div>

    </CardLikeContainer>
</template>

<script setup>
import { useNetwork } from "@vueuse/core"

const { isOnline, offlineAt, downlink, downlinkMax, effectiveType, saveData, type } = useNetwork()

async function resetCaches() {
    console.log("Forcing cache reset.")
    await updateAllCaches()
}
</script>