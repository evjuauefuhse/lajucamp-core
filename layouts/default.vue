<template>
    <LayoutThemeHelper class="min-h-full">
        <div v-if="phone">
            <LayoutTopbar class="sticky top-0 z-50" />
            <main :data-theme="theme.getCurrentTheme()" class="content px-3 bg-background relative pb-16">
                <slot />
            </main>
            <LayoutBottomNavigation :class="assembleNavbarClass()" />
            <div v-if="shouldShiftNavbar()" class="fixed bottom-0 left-0 min-h-4 h-4 w-full bg-base-100 z-10"></div>
        </div>
        <div v-else>
            <LayoutSidebar>
                <slot />
            </LayoutSidebar>
        </div>
    </LayoutThemeHelper>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints, useLocalStorage } from "@vueuse/core"

const theme = useTheme()
console.debug("Populating cache")
const categoryStore = useLocalStorage("categoryStore", { updated: null, items: [] })
const eventStore = useLocalStorage("eventStore", { updated: null, items: [] })
const pageStore = useLocalStorage("pageStore", { updated: null, items: [] })
const welcomeMessageStore = useLocalStorage("welcomeMessageStore", { updated: null, items: [] })
const postStore = useLocalStorage("postStore", { updated: null, items: [] })

const instances = useInstanceManager()
const device = useDevice()
const breakpoints = useBreakpoints(breakpointsTailwind)
const phone = breakpoints.smaller('md')

if (!instances.shouldDoInitialSetup && process.client) {
    const categoryManager = useCategoryManager()
    const eventManager = useEventManager()
    const pageManager = usePageManager()
    const welcomeManager = useWelcomeManager()
    const PostManager = usePostManager()


    if (await shouldUpdateCache(categoryStore, 'categories')) {
        await categoryManager.getList()
    }
    if (await shouldUpdateCache(eventStore, 'events')) {
        await eventManager.getList()
    }
    if (await shouldUpdateCache(pageStore, 'pages')) {
        await pageManager.getList()
    }
    if (await shouldUpdateCache(welcomeMessageStore, 'welcome_messages')) {
        await welcomeManager.getList()
    }
    if (await shouldUpdateCache(postStore, 'posts')) {
        await PostManager.getList()
    }
}


function shouldShiftNavbar() {
    return device.isIos && device.userAgent.includes("hasHomeButton=false");
}

function assembleNavbarClass() {
    if (shouldShiftNavbar()) {
        return "z-10 mb-4 lg:hidden"
    } else {
        return "z-10 lg:hidden"
    }
}
</script>
