<template>
    <dialog id="instance_switcher" class="modal modal-top">
        <div v-drag="onDrag" class="modal-box bg-base-200">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 class="text-xl font-bold mb-3">Evangelische Jugend</h3>
            <LayoutInstanceSwitcher @close="closeInstanceSwitcher" />
        </div>
    </dialog>

    <div class="header">
        <div class="navbar bg-base-100">

            <button @click="$router.go(-1)" v-show="(!topRoutes.includes($route.name)) && (!device.isAndroid)"
                class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

            </button>
            <div class="flex-1">
                <div class="btn btn-ghost normal-case text-xl p-2" @click="openSwitcher()">
                    <div class="avatar">
                        <div
                            class="ring-secondary ring-offset-base-100 w-8 rounded-full ring ring-offset-2 bg-base-300 text-neutral mr-2">
                            <!-- todo -->
                        </div>
                    </div>
                    {{ instanceName }}

                </div>
            </div>
            <div class="flex-none">
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
</template>


<script setup>
const instances = useInstanceManager()
const instanceName = ref("")
onMounted(() => {
    instanceName.value = instances.instance().name
})
const runtimeConfig = useRuntimeConfig()
const device = useDevice()
const topRoutes = [
    'index',
    'events',
    'news',
    'music',
    'misc'

]

function openSwitcher() {
    instance_switcher.showModal()
}

function closeInstanceSwitcher() {
    instance_switcher.close()
}

function onDrag(state) {
    if (state.dragging === true && (state.up === true || state.down === true) && state.distance > 50) {
        closeInstanceSwitcher()
    }
}

</script>