import { useLocalStorage } from "@vueuse/core"

export const useLocationManager = () => {
    const pb = usePocketBase()
    const storage = useLocalStorage("locationStore", { updated: null, items: [] })

    async function getInternalLocationList() {
        const response = await pb.collection('locations').getFullList();
        const data = { updated: new Date(), items: response }
        return data
    }

    async function update() {
        const data = await getInternalLocationList()
        storage.value = data
        return data
    }

    async function getLocationList() {
        let shouldUpdate = false
        if (await shouldUpdateCache(storage, 'locations')) {
            shouldUpdate = true
        }
        if (shouldUpdate) {
            return await update()
        } else {
            if (storage.value.updated !== null) {
                return storage.value
            } else {
                throw "User is offline and no data is downloaded"
            }
        }
    }
    const LocationManager = {
        getList: async () => {
            return (await getLocationList()).items
        },
        getById: async (id) => {
            return (await getLocationList()).items.find(obj => obj.id === id)
        },
        update: async () => {
            await update()
        },
        lastUpdated: () => {
            return storage.value.updated
        }

    }

    return LocationManager


}