export const useEventFilters = defineStore('eventFilterStore', () => {
    const categoryFilter = ref([])
    const locationFilter = ref([])
    const teamFilter = ref([])

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


    return { categoryFilter, locationFilter, teamFilter, showAllCategories, toggleCategory, showAllLocations, toggleLocation, showAllTeams, toggleTeam }
  })