import { useLocalStorage } from "@vueuse/core"


export const useUserSettings = defineStore('userSettingsStore', () => {
    const settings = useLocalStorage("userSettingsStore", {})
    const tempSettings = ref({})

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

    function setTemp(key, value) {
        tempSettings.value[key] = value
    }

    function delTemp(key) {
        if(Object.hasOwn(tempSettings.value, key)) {
            delete tempSettings.value[key]
        }
    }

    function getTemp(key) {
        if(Object.hasOwn(tempSettings.value, key)) {
            return tempSettings.value[key]
        } else {
            return undefined
        }
    }



    return { set, del, get, setTemp, delTemp, getTemp }
  })