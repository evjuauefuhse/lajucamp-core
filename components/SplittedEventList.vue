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
                        <input type="checkbox" @click="showAllCategories()" :disabled="categoryFilter.length == 0" :checked="categoryFilter.length == 0" class="checkbox" />
                        <div class="flex flex-col" @click="showAllCategories()">
                            <h1 class="text-lg font-bold">alle anzeigen</h1>
                            <div class="flex gap-2 overflow-hidden text-ellipsis text-sm font-light">
                                alle Kategorien werden ausgewählt.
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row space-x-3" v-for="category in categories">
                        <input type="checkbox" @change="toggleCategory(category.id)" :checked="categoryFilter.includes(category.id)" class="checkbox" />
                        <div @click="toggleCategory(category.id)" class="flex flex-col">
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
                        <input type="checkbox" @click="showAllTeams()" :disabled="teamFilter.length == 0" :checked="teamFilter.length == 0" class="checkbox" />
                        <div class="flex flex-col" @click="showAllTeams()">
                            <h1 class="text-lg font-bold">alle anzeigen</h1>
                            <div class="flex gap-2 overflow-hidden text-ellipsis text-sm font-light">
                                alle Sprengel werden ausgewählt.
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row space-x-3" v-for="team in teams">
                        <input type="checkbox" @change="toggleTeam(team.id)" :checked="teamFilter.includes(team.id)" class="checkbox" />
                        <div @click="toggleTeam(team.id)" class="flex flex-col">
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
                        <input type="checkbox" @click="showAllLocations()" :disabled="locationFilter.length == 0" :checked="locationFilter.length == 0" class="checkbox" />
                        <div class="flex flex-col" @click="showAllLocations()">
                            <h1 class="text-lg font-bold">alle anzeigen</h1>
                            <div class="flex gap-2 overflow-hidden text-ellipsis text-sm font-light">
                                alle Orte werden ausgewählt.
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row space-x-3" v-for="location in locations">
                        <input type="checkbox" @change="toggleLocation(location.id)" :checked="locationFilter.includes(location.id)" class="checkbox" />
                        <div @click="toggleLocation(location.id)" class="flex flex-col">
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
            <div v-for="(item, index) in records" :class="'tab' + ((activeTab === index) ? ' tab-active' : '')" role="tab"
                :value="index" @click="setTab(index)">{{ item.day
                }}</div>
        </div>
        <div v-else class="skeleton h-8 w-28">

        </div>
        <button :disabled="loading" class="btn btn-ghost btn-sm" onclick="my_modal_1.showModal()">Filter</button>
    </div>
    <div v-show="!loading">
        <div v-if="records != null">
            <div class="card card-compact h-full" v-if="records.length > 0">
                <Swiper @swiper="initSwiper" class="w-full" @slideChange="onSwipe" :autoplay="{ delay: 4 }">
                    <SwiperSlide v-for="(item, index) in records" :key="index" :item="item" class="h-full">
                        <div class="collapse collapse-plus">
                            <input type="checkbox" />
                            <div class="collapse-title text-base font-light">
                                Vergangene Veranstaltungen
                            </div>
                            <div class="collapse-content">
                                <EventListEntry v-for="event in item.events.past" v-show="(isSameDate(new Date(event.start), new Date(event.end))) && (categoryFilter.length === 0 || categoryFilter.includes(event.expand.category.id)) && (locationFilter.length === 0 || locationFilter.includes(event.expand.location.id)) && (teamFilter.length === 0 || teamFilter.includes(event.team))" :key="event.id" :item="event" />
                            </div>
                        </div>
                        <EventListEntry v-if="item.events.scheduled.length > 0" v-for="event in item.events.scheduled" v-show="(isSameDate(new Date(event.start), new Date(event.end))) && (categoryFilter.length === 0 || categoryFilter.includes(event.expand.category.id)) && (locationFilter.length === 0 || locationFilter.includes(event.expand.location.id)) && (teamFilter.length === 0 || teamFilter.includes(event.team))"
                            :key="event.id" :item="event" />
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
const eventManager = useEventManager()
const records = ref(null)
const skipPast = ref(true)
const loading = ref(true)
const today = new Date().toLocaleDateString('de-DE', { weekday: 'short' });
const activeTab = ref(0)
const swiper = ref(null)

const categoryFilter = ref([])
const categoryManager = useCategoryManager()
const categories = ref(null);

const locationFilter = ref([])
const locationManager = useLocationManager()
const locations = ref(null);

const teamFilter = ref([])
const teamManager = useTeamManager()
const teams = ref(null);

onMounted(async () => {
    records.value = await eventManager.getDayList()
    categories.value = await categoryManager.getList()
    locations.value = await locationManager.getList()
    teams.value = await teamManager.getList()
    loading.value = false
})

function setTab(index) {
    activeTab.value = index
    console.log(swiper.value)
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

function showAllCategories() {
    if(categoryFilter.value.length > 0) {
        categoryFilter.value = []
    }
}

function toggleCategory(id) {
    if(categoryFilter.value.includes(id)) {
        categoryFilter.value = categoryFilter.value.filter(function(e) { return e !== id })
    } else {
        categoryFilter.value.push(id)
    }
}

function showAllLocations() {
    if(locationFilter.value.length > 0) {
        locationFilter.value = []
    }
}

function toggleLocation(id) {
    if(locationFilter.value.includes(id)) {
        locationFilter.value = locationFilter.value.filter(function(e) { return e !== id })
    } else {
        locationFilter.value.push(id)
    }
}

function showAllTeams() {
    if(teamFilter.value.length > 0) {
        teamFilter.value = []
    }
}

function toggleTeam(id) {
    if(teamFilter.value.includes(id)) {
        teamFilter.value = teamFilter.value.filter(function(e) { return e !== id })
    } else {
        teamFilter.value.push(id)
    }
}

</script>