import { useLocalStorage } from "@vueuse/core"

export const useLostFoundManager = () => {
    const instances = useInstanceManager()
    const pb = instances.getPocketBase()
    const storage = useLocalStorage("lostandfoundStore_" + instances.instance().id, { updated: null, items: [] })

    async function getInternalLostFoundList() {
        const response = await pb.collection('lostandfound').getFullList();
        const data = { updated: new Date(), items: response }
        return data
    }

    async function update() {
        const data = await getInternalLostFoundList()
        storage.value = data
        return data
    }

    async function getLostFoundList() {
        let shouldUpdate = false
        if (await shouldUpdateCache(storage, 'lostandfound')) {
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
    const LostFoundManager = {
        getList: async () => {
            return (await getLostFoundList()).items
        },
        getById: async (id) => {
            return (await getLostFoundList()).items.find(obj => obj.id === id)
        },
        update: async () => {
            await update()
        },
        lastUpdated: () => {
            return storage.value.updated
        }

    }

    return LostFoundManager


}