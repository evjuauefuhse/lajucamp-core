import { useLocalStorage } from "@vueuse/core"


export const useUserSettings = defineStore('userSettingsStore', () => {
    const settings = useLocalStorage("userSettingsStore", {})

    function set(key, value) {
        settings.value[key] = value
    }

    function del(key) {
        if(Object.hasOwn(settings.value, key)) {
            delete settings.value[key]
        }
    }

    function get(key) {
        if(Object.hasOwn(settings.value, key)) {
            return settings.value[key]
        } else {
            return undefined
        }
    }



    return { set, del, get }
  })