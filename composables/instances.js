import { useLocalStorage } from "@vueuse/core"
import PocketBase from 'pocketbase';


export const useInstanceManager = () => {
    const storage = useLocalStorage("instancesStore", { updated: null, items: [] })
    const instance = useLocalStorage("selectedInstance", { selected: null })

    const instanceManager = {
        addInstance: async (url) => {
            const pb = new PocketBase(url)
            const app = (await pb.collection('metadata').getFirstListItem('key="app"')).value
            const instance_id = (await pb.collection('metadata').getFirstListItem('key="instance"')).value.id
            storage.value.items.push({
                name: app.name,
                team: app.team,
                id: instance_id,
                url: url
            })
            storage.value.updated = new Date()
            return instance_id
        },
        instance: () => { return instance.value.selected },
        setInstance: (id) => {
            console.log(storage.value.items)
            instance.value.selected = storage.value.items.find(item => item.id === id) || null;
            console.log(instance.value)
        },
        getList: () => {
            return storage.value.items
        },
        getPocketBase: () => {
            if (instance.value.selected === undefined || instance.value.selected === null) {
                console.error("UNSET!")
                return undefined
            } else {
                return new PocketBase(instance.value.selected.url);
            }
        },
        shouldDoInitialSetup: () => {
            console.log(instance.value.selected)
            if (instance.value.selected === null || storage.value.items.length === 0) {
                return true
            } return false
        },
        isReady: () => {
            if (instance.value !== undefined && storage.value !== undefined) {
                console.log("instance", instance.value)
                return true
            }
            return false
        }


    }

    return instanceManager
}