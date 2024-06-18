import { useLocalStorage } from "@vueuse/core"

export const useSongManager = () => {
    const pb = usePocketBase()
    const storage = useLocalStorage("hackSongsStore", { updated: null, items: [] })

    function isTimeInRange() {
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
      
        // Check if the current time is within the range of 12:00 to 15:45
        if ((currentHours > 12 && currentHours < 15) ||
            (currentHours === 12 && currentMinutes >= 0) ||
            (currentHours === 15 && currentMinutes <= 45)) {
                console.log("It's update time! Updating.")
          return true;
        } else {
            console.log("Don't update - network could be busy. Damn.")
          return false;
        }
      }
      

    async function getInternalSongList() {
        const response = await pb.collection('songs_hackhack').getFullList({
            sort: 'number',
        });
        const data = { updated: new Date(), items: response }
        return data
    }

    async function update() {
        const data = await getInternalSongList()
        storage.value = data
        return data
    }

    async function getSongList() {
        let shouldUpdate = false
        if (isTimeInRange()) {
            shouldUpdate = true
        }
        if (shouldUpdate) {
            return await update()
        } else {
            if (storage.value.updated !== null) {
                return storage.value
            } else {
                return await update()
            }
        }
    }
    const SongManager = {
        getList: async () => {
            return (await getSongList()).items
        },
        getById: async (id) => {
            return (await getSongList()).items.find(obj => obj.id === id)
        },
        update: async () => {
            await update()
        },
        lastUpdated: () => {
            return storage.value.updated
        }

    }

    return SongManager


}