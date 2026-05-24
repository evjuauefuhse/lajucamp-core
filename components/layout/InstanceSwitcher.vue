<template>
    <div v-if="!instances.shouldDoInitialSetup()">
        <div class="flex flex-col space-y-1">
            <div @click="instanceDropdown = !instanceDropdown"
                :class="(instanceDropdown ? 'rounded-t-lg' : 'rounded-lg') + ' bg-base-100'">
                <div class="flex flex-row justify-between">
                    <div class="flex flex-row">
                        <div class="avatar">
                            <div class="w-12 rounded-full bg-base-300 text-neutral m-3">
				<img v-if="instanceImage != null" :src="instanceImage" />
                            </div>
                        </div>
                        <div class="h-full flex flex-col my-3">
                            <div class="font-bold">{{ instances.instance().name }}</div>
                            <div>{{ instances.instance().team }}</div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <button class="btn btn-sm btn-circle btn-outline mr-3">
                            <svg v-if="!instanceDropdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" class="size-5">
                                <path fill-rule="evenodd"
                                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                class="size-5">
                                <path fill-rule="evenodd"
                                    d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                                    clip-rule="evenodd" />
                            </svg>

                        </button>
                    </div>
                </div>

            </div>
            <div :class="(instanceDropdown ? 'visible' : 'hidden') + ' rounded-b-lg bg-base-100'">
                <div v-for="instance in instances.getList()" v-show="instance.id !== instances.instance().id"
                    @click="switchInstance(instance.id)" class="flex flex-row">
                    <div class="flex flex-col justify-center items-center">
                        <div class="avatar">
                            <div class="w-8 h-8 rounded-full bg-base-300 text-neutral m-3">
				<img v-if="instanceImage != null" :src="instanceImage" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col my-3 justify-center items-center">
                        <div>{{ instance.name }}</div>
                    </div>
                </div>
                <RouterLink @click="closeInstanceSwitcher()" to="/misc/settings/instances/add"
                    class="flex flex-row mt-3">
                    <div class="flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6 mt-2 mb-5 mx-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div class="flex flex-col mb-3 justify-center items-center">
                        <div>Instanz hinzufügen</div>
                    </div>
                </RouterLink>
            </div>
        </div>

        <div class="flex flex-col mt-3">
            <InstanceSwitcherMenuEntry @close="closeInstanceSwitcher" title="Berechtigungsschlüssel"
                to="/misc/settings/keys">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </InstanceSwitcherMenuEntry>
            <InstanceSwitcherMenuEntry @close="closeInstanceSwitcher" title="Erscheinungsbild"
                to="/misc/settings/appearance">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </InstanceSwitcherMenuEntry>
            <InstanceSwitcherMenuEntry @close="closeInstanceSwitcher" title="Über diese App" to="/misc/about">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </InstanceSwitcherMenuEntry>
        </div>
        <div class="flex flwx-row justify-center">
            <a :href="config.public.imprint" class="btn btn-ghost btn-sm">Impressum</a>
            <a :href="config.public.privacy" class="btn btn-ghost btn-sm">Datenschutz</a>
        </div>
    </div>
</template>

<script setup>
const instanceDropdown = ref(false)
const emit = defineEmits("close")
const config = useRuntimeConfig()
const props = defineProps(["admin"])

const instances = useInstanceManager()

const instanceImage = ref("")
onMounted(() => {
    if("icon" in instances.instance()) {
        instanceImage.value = instances.instance().icon
    }
})
function closeInstanceSwitcher() {
    emit("close")
}

async function switchInstance(id) {
    instances.setInstance(id)
    if (props.admin !== undefined) {
        await navigateTo("/admin")
    } else {
        await navigateTo("/")
    }
    window.location.reload(false);
}


</script>
