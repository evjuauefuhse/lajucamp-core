import { useLocalStorage } from "@vueuse/core"
import PocketBase from 'pocketbase';


export const useInstanceManager = () => {
    const storage = useLocalStorage("instancesStore", { updated: null, items: [] })
    const instance = useLocalStorage("selectedInstance", { selected: null })

    async function update_instance_meta(id) {
	instance = storage.value.items.find(item => item.id === id) || null
    }
    const instanceManager = {
        addInstance: async (url) => {
            const pb = new PocketBase(url)
            const app = (await pb.collection('metadata').getFirstListItem('key="app"')).value
            const instance_id = (await pb.collection('metadata').getFirstListItem('key="instance"')).value.id
            const eventmode = (await pb.collection('metadata').getFirstListItem('key="events"')).value.mode
            if(!storage.value.items.some(item => item.id === instance_id)) {
		let icon = null
		if("icon" in app) {
		    icon = app.icon
		}
                storage.value.items.push({
                    name: app.name,
                    team: app.team,
                    id: instance_id,
                    url: url,
                    eventmode: eventmode,
		    icon: icon
                })
            } else {
                console.warn("Trying to add already existing instance, skipping...")
            }
            storage.value.updated = new Date()
            return instance_id
        },
        instance: () => { return instance.value.selected },
        setInstance: (id) => {
            console.debug(storage.value.items)
            instance.value.selected = storage.value.items.find(item => item.id === id) || null;
            (new PocketBase(instance.value.selected.url)).authStore.clear()
            console.debug(instance.value)
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
            console.debug(instance.value.selected)
            if (instance.value.selected === null || storage.value.items.length === 0) {
                return true
            } return false
        },
        isReady: () => {
            if (instance.value !== undefined && storage.value !== undefined) {
                console.debug("instance", instance.value)
                return true
            }
            return false
        }


    }

    return instanceManager
}
