<template>
    <LayoutThemeHelper>
        <dialog id="instance_switcher" class="modal">
            <div class="modal-box bg-base-200">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 class="text-xl font-bold mb-3">Evangelische Jugend</h3>
                <LayoutInstanceSwitcher @close="closeInstanceSwitcher" />
            </div>
        </dialog>
    
        <div class="drawer drawer-open">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content bg-base-100">
                <div class="header">
                    <div class="navbar bg-base-100">
                        <div class="navbar-start">
                            <a class="btn btn-ghost text-xl">{{ config.public.title }}</a>
                        </div>
                        <div class="navbar-end">
                            <router-link to="/search">
                                <button class="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
            
            
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="mb-5 mx-5">
                    <slot />
    
                </div>
            </div>
            <div class="drawer-side">
                <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                <ul class="menu menu-lg w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
                    <div>
                        <!-- Sidebar content here -->
                        <!-- header thing -->
                        <div @click="openSwitcher()" tabindex="0" role="button"
                            class="z-100 flex flex-row space-x-2 m-3 justify-start items-center">
                            <div class="avatar">
                                <div
                                    class="ring-secondary ring-offset-base-100 w-12 rounded-full ring ring-offset-2 bg-base-300 text-neutral mr-2">
                                    <!-- todo -->
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <div class="text-base font-bold">{{ instance.instance().name }}</div>
                                <div>{{ instance.instance().team }}</div>
                            </div>
                        </div>
    
                        <div class="divider"></div>
    
                        <li>
                            <RouterLink to="/"
                                :class="(groupedRoutes.home.includes($route.name)) ? 'active' : 'not_active'"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                  </svg>
                                  
                                Startseite</RouterLink>
                        </li>
                        <li  v-if="instance.instance().eventmode === 'event'">
                            <RouterLink to="/events"
                                :class="(groupedRoutes.events.includes($route.name)) ? 'active' : 'not_active'"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                  </svg>
                                  
    
                                Veranstaltungen</RouterLink>
                        </li>
                        <li v-if="checkMusicAccess()">
                            <RouterLink
                                :to="config.public.fallbacksongs ? '/songFallback' : '/music'"
                                :class="(groupedRoutes.music.includes($route.name)) ? 'active' : 'not_active'"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                                  </svg>
                                  
    
    
                                Liederbuch</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/posts"
                                :class="(groupedRoutes.news.includes($route.name)) ? 'active' : 'not_active'"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                  </svg>
                                  
    
    
    
                                News</RouterLink>
                        </li>
                        <div v-if="records !== []">
                            <div v-for="record in records" :key="record.id">
                                <li v-if="checkAccessKey(record)">
                                    <RouterLink :class="($route.name === 'misc-page-id' && $route.params.id === record.id) ? 'active' : 'not_active'" :to="'/misc/page-' + record.id" v-if="!record.redirectUrl.startsWith('http') && !record.redirectUrl.startsWith('/')">
                                            <div v-html="record.icon"></div>
                                            {{ record.name }}
                                    </RouterLink>
                                    <RouterLink :class="($route.path === record.redirectUrl) ? 'active' : 'not_active'" :to="record.redirectUrl" v-else-if="record.redirectUrl.startsWith('/')">
                                        <div v-html="record.icon"></div>
                                        {{ record.name }}
                                    </RouterLink>
                                    <a v-else :href="record.redirectUrl">
                                        <div v-html="record.icon"></div>
                                        {{ record.name }}
                                    </a>
                                </li>
                            </div>
                        </div>
                    </div>
    
                </ul>
    
            </div>
        </div>
    </LayoutThemeHelper>
    
</template>

<script setup>
const instance = useInstanceManager()
const config = useRuntimeConfig()
const pageManager = usePageManager()
const cookie = useCookie("keys_" + instance.instance().id, { expires: new Date('9999-12-31') })
const records = ref([])
function hackyCookieWorkaround() {
    const currentType = typeof cookie.value
    if (currentType === "string") {
        return JSON.parse(cookie.value)
    } else {
        return cookie.value
    }
}

function checkDevelAccess() {
    if (cookie.value === undefined) return false
    const data = hackyCookieWorkaround()
    return data.some(obj => obj.enableDevelResources === true)
}

function checkPictureAccess() {
    if (cookie.value === undefined) return false
    const data = hackyCookieWorkaround()
    return data.some(obj => obj.allowImages === true)
}

function checkAccessKey(record) {
    if (!record.needsFeatureKey) {
        console.debug("Allow because no featureKey set")
        return true
    }
    else {
        if (cookie === undefined || cookie.value === undefined) {
            console.debug("Deny because no cookie set")
            return false
        }
        else {
            console.debug("Check if cookie contains featureKey")
            return cookie.value.some(obj => obj.id === record.featureKey)
        }
    }

}

onMounted(async () => {
    records.value = await pageManager.getList()
})


function openSwitcher() {
    instance_switcher.showModal()
}

function closeInstanceSwitcher() {
    instance_switcher.close()
}

</script>