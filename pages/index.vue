<template>
    <div class="flex flex-col space-y-3">
        <HomePageOfflineCard v-if="!online" />
        <HomepageWelcomeCardBundle />
        <HomepageEventListCard v-if="instance.instance().eventmode === 'event'" />
        <HomepageRestrictedCard v-else />
        <HomepageSingleNewsCard />
        <HomepageInstallCard />
    </div>
</template>

<script setup>
import { useOnline } from "@vueuse/core"

const route = useRoute()
const instance = useInstanceManager()
const cookie = useCookie("installed", { expires: new Date('9999-12-31') })
const online = useOnline()
const songManager = useSongManager()

if (route.query.standalone === 'true') {
    cookie.value = true
}
const settings = useUserSettings()

function checkAge(date) {
    // Get the current date and time
    const now = new Date();

    // Get the timestamp for two hours ago
    const twoHoursAgo = new Date(now.getTime() - (2 * 60 * 60 * 1000));

    // Compare the provided date with the timestamp for two hours ago
    return date < twoHoursAgo;
}

if (online.value) {
    if (settings.get("lastCacheUpdate") === undefined) {
        await updateAllCaches()
        settings.set("lastCacheUpdate", (new Date()))
        console.debug("Updating all caches because never.")
    } else {
        if (checkAge(settings.get("lastCacheUpdate"))) {
            await updateAllCaches()
            console.debug("Updating all caches because old.")
        }
    }
    // await songManager.getList()

}
</script>
