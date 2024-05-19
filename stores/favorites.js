import { useLocalStorage } from "@vueuse/core"


export const useFavorites = defineStore('favoritesStore', () => {
    const favorites = useLocalStorage("favoritesStore", [])

    function add(id) {
        favorites.value.push(id)
    }

    function del(id) {
        favorites.value.splice(favorites.value.indexOf(id), 1)
    }

    function isFavorite(id) {
        return favorites.value.includes(id)
    }

    function toggleFavorite(id) {
        if(isFavorite(id)) {
            del(id)
        } else {
            add(id)
        }
    }

    return { add, del, isFavorite, toggleFavorite }
  })