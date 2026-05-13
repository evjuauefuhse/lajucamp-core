<template>
    <div class="modal-box bg-base-200">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-xl font-bold mb-3">Mehr</h3>
        <div v-show="config.public.hds" class="rounded-lg border-solid border-2 border-neutral p-3">
            <figure class="flex flex-row justify-center w-full items-center space-x-3 justify-start">
                <img src="~assets/hds.png" class="max-h-24 max-w-32" />
                <p>Unterstützt durch die Heinrich Dammann Stiftung.</p>

            </figure>
        </div>
        <ul class="menu menu-lg p-0">
            <!--<MenuEntry @click="closeMoreDialog" v-if="checkDevelAccess()" name="Entwicklerinformationen" to="/test">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </MenuEntry>
            <MenuEntry @click="closeMoreDialog" v-if="checkPictureAccess()" name="Bildergalerie" to="/pictures">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            
            </MenuEntry>-->
            <div v-if="records.length !== 0">
                <div v-for="record in records" :key="record.id">
                    <MenuEntry @close="close()" v-if="checkAccessKey(record)" :name="record.name"
                        :to="(record.redirectUrl !== '') ? record.redirectUrl : '/misc/page-' + record.id">
                        <div v-html="record.icon"></div>
                    </MenuEntry>
                </div>
            </div>



        </ul>
    </div>
</template>

<script setup>
const config = useRuntimeConfig()

const instances = useInstanceManager()
const cookie = useCookie("keys_" + instances.instance().id, { expires: new Date('9999-12-31') })
const emit = defineEmits(["close"])

function close() {
    emit("close")
}
const hackyCookieWorkaround = () => {
    const currentType = typeof cookie.value
    if (currentType === "string") {
        return JSON.parse(cookie.value)
    } else {
        return cookie.value
    }
}
function checkMusicAccess() {
    if (cookie.value === undefined) return false
    const data = hackyCookieWorkaround()
    return data.some(obj => obj.allowMusic === true)
}

const pageManager = usePageManager()

let records = ref([])

onMounted(async () => {
    records.value = await pageManager.getList()
})


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
    const data = hackyCookieWorkaround()
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
            return data.some(obj => obj.id === record.featureKey)
        }
    }

}

</script>
