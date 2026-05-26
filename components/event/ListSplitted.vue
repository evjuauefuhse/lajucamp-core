<template>
    <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <h3 class="font-bold text-lg">Filter</h3>
            <div class="pt-4">
                <div class="collapse collapse-plus">
                    <input type="checkbox" />
                    <div class="collapse-title text-base font-light">
                        Kategorien
                    </div>
                    <div class="collapse-content">
                        <div class="flex flex-row space-x-3">
                            <input type="checkbox" @click="filter.showAllCategories()"
                                :disabled="filter.categoryFilter.length == 0"
                                :checked="filter.categoryFilter.length == 0" class="checkbox" />
                            <div class="flex flex-col" @click="filter.showAllCategories()">
                                <h1 class="text-lg font-bold">alle anzeigen</h1>
                                <div class="flex gap-2 overflow-hidden text-ellipsis text-sm font-light">
                                    alle Kategorien werden ausgewählt.
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-row space-x-3" v-for="category in categories">
                            <input type="checkbox" @change="filter.toggleCategory(category.id)"
                                :checked="filter.categoryFilter.includes(category.id)" class="checkbox" />
                            <div @click="filter.toggleCategory(category.id)" class="flex flex-col">
                                <h1 class="text-lg font-bold">{{ category.name }}</h1>
                                <div class="flex gap-2 overflow-hidden text-ellipsis text-sm font-light">
                                    {{ category.description }}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="collapse collapse-plus">
                    <input type="checkbox" />
                    <div class="collapse-title text-base font-light">
                        Sprengel
                    </div>
                    <div class="collapse-content">
                        <div class="flex flex-row space-x-3">
                            <input type="checkbox" @click="filter.showAllTeams()"
                                :disabled="filter.teamFilter.length == 0" :checked="filter.teamFilter.length == 0"
                                class="checkbox" />
                            <div class="flex flex-col" @click="filter.showAllTeams()">
                                <h1 class="text-lg font-bold">alle anzeigen</h1>
                                <div class="flex gap-2 overflow-hidden text-ellipsis text-sm font-light">
                                    alle Sprengel werden ausgewählt.
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-row space-x-3" v-for="team in teams">
                            <input type="checkbox" @change="filter.toggleTeam(team.id)"
                                :checked="filter.teamFilter.includes(team.id)" class="checkbox" />
                            <div @click="filter.toggleTeam(team.id)" class="flex flex-col">
                                <h1 class="text-lg font-bold pb-3">{{ team.name }}</h1>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="collapse collapse-plus">
                    <input type="checkbox" />
                    <div class="collapse-title text-base font-light">
                        Orte
                    </div>
                    <div class="collapse-content">
                        <div class="flex flex-row space-x-3">
                            <input type="checkbox" @click="filter.showAllLocations()"
                                :disabled="filter.locationFilter.length == 0"
                                :checked="filter.locationFilter.length == 0" class="checkbox" />
                            <div class="flex flex-col" @click="filter.showAllLocations()">
                                <h1 class="text-lg font-bold">alle anzeigen</h1>
                                <div class="flex gap-2 overflow-hidden text-ellipsis text-sm font-light">
                                    alle Orte werden ausgewählt.
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-row space-x-3" v-for="location in locations">
                            <input type="checkbox" @change="filter.toggleLocation(location.id)"
                                :checked="filter.locationFilter.includes(location.id)" class="checkbox" />
                            <div @click="filter.toggleLocation(location.id)" class="flex flex-col">
                                <h1 class="text-lg font-bold pb-3">{{ location.name }}</h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn btn-secondary">OK</button>
                </form>
            </div>
        </div>
    </dialog>

    <div class="flex justify-between">
        <div v-if="!loading" role="tablist" class="tabs tabs-boxed w-min">
            <div v-for="(item, index) in records" :class="'tab' + ((activeTab === index) ? ' tab-active' : '')"
                role="tab" :value="index" @click="setTab(index)">{{ item.day
                }}</div>
        </div>
        <div v-else class="skeleton h-8 w-28">

        </div>
        <div class="indicator">
            <span v-show="filter.categoryFilter.length + filter.locationFilter.length + filter.teamFilter.length !== 0"
                class="indicator-item indicator-start badge badge-secondary">{{ filter.categoryFilter.length +
                    filter.locationFilter.length + filter.teamFilter.length }}</span>
            <button :disabled="loading" class="btn btn-ghost btn-sm" onclick="my_modal_1.showModal()">Filter</button>
        </div>

    </div>
    <div v-show="!loading">
        <div v-if="records != null">
            <div class="card card-compact z-0" v-if="records.length > 0">
                <Swiper @swiper="initSwiper" class="w-full z-0" @slideChange="onSwipe"
                    :autoplay="{ delay: 4 }">
                    <SwiperSlide v-for="(item, index) in records" :key="index" :item="item" class="h-full">
                        <div class="collapse collapse-plus">
                            <input type="checkbox" />
                            <div class="collapse-title text-base font-light">
                                Vergangene Veranstaltungen
                            </div>
                            <div class="collapse-content">
                                <EventListEntry v-for="event in item.events.past"
                                    v-show="(isSameDate(new Date(event.start), new Date(event.end))) && (filter.categoryFilter.length === 0 || filter.categoryFilter.includes(event.expand.category.id)) && (filter.locationFilter.length === 0 || filter.locationFilter.includes(event.expand.location.id)) && (filter.teamFilter.length === 0 || filter.teamFilter.includes(event.team))"
                                    :key="event.id" :item="event" />
                            </div>
                        </div>
                        <EventListEntry v-if="item.events.scheduled.length > 0" v-for="event in item.events.scheduled"
                            v-show="(isSameDate(new Date(event.start), new Date(event.end))) && (filter.categoryFilter.length === 0 || filter.categoryFilter.includes(event.expand.category.id)) && (filter.locationFilter.length === 0 || filter.locationFilter.includes(event.expand.location.id)) && (filter.teamFilter.length === 0 || filter.teamFilter.includes(event.team))"
                            :key="event.id" :item="event" :showFavoriteButton="true" />
                        <div class="flex flex-col justify-start" v-else>
                            <div class="max-w-md text-center">
                                <h1 class="text-xl">Das war's für heute!</h1>
                                <p class="pt-3">
                                    Wechsle zu einem anderen Tag oder blende vergangene Veranstaltungen ein.
                                </p>
                            </div>
                            <!-- TODO: This is horrible. Can't we have it fill the rest of the viewport?-->
                            <div class="h-96" />
                            <div class="h-64" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div v-else>
                <span class="text-sm font-light text-center">Keine Veranstaltungen verfügbar.</span>
            </div>
        </div>
    </div>
    <div v-show="loading">
        <EventListEntrySkeleton v-for="i in 8" :key="i" />
    </div>
</template>

<script setup>
const props = defineProps({
    filtercat: {
	type: String,
	required: false
    }
})
const eventManager = useEventManager()
const records = ref(null)
const skipPast = ref(true)
const loading = ref(true)
const today = new Date().toLocaleDateString('de-DE', { weekday: 'short' });
const activeTab = ref(0)
const swiper = ref(null)

const categoryManager = useCategoryManager()
const categories = ref(null);

const locationManager = useLocationManager()
const locations = ref(null);

const teamManager = useTeamManager()
const teams = ref(null);

const filter = useEventFilters()
const settings = useUserSettings()

onMounted(async () => {
    records.value = await eventManager.getDayList()
    categories.value = await categoryManager.getList()
    locations.value = await locationManager.getList()
    teams.value = await teamManager.getList()
    let tab = settings.get("tab")
    if (tab !== undefined) {
        activeTab.value = tab
        swiper.value.slideTo(tab, 200, false)
    }
    if(props.filtercat !== undefined) {
	filter.showAllTeams()
	filter.showAllLocations()
	filter.showAllCategories()
	filter.toggleCategory(props.filtercat)
    }
    loading.value = false

})

function setTab(index) {
    settings.set("tab", index)
    activeTab.value = index
    console.debug(swiper.value)
    swiper.value.slideTo(index, 200, false)
}

function onSwipe(details) {
    activeTab.value = details.activeIndex
}

function initSwiper(sw) {
    swiper.value = sw
}

function isSameDate(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}


</script>
