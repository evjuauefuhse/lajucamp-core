<template>
	<button class="badge badge-info gap-2 badge-outline badge-md whitespace-nowrap" @click="openDialog()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
              clip-rule="evenodd"
            />
          </svg>

		  {{ props.name }}
        </button>
<dialog id="map" class="modal modal-bottom">
        <div v-drag="onDrag" class="modal-box bg-base-200">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
	    <h3 class="text-xl font-bold mb-3">{{ props.name }}</h3>
        <figure v-if="mapimage !== ''"><img class="rounded-xl" :src="mapimage" alt="Image" /></figure>
 
        </div>
    </dialog>
</template>

<script setup>
import { defineProps } from 'vue';
const pb = useInstanceManager().getPocketBase()
const locations = useLocationManager()
const props = defineProps(["name", "id"])
const mapimage = ref("")

function onDrag(state) {
    if (state.dragging === true && (state.up === true || state.down === true) && state.distance > 50) {
        closeDialog()
    }
}

async function openDialog() {
const data = await locations.getById(props.id)
if (data.mapimage !== "") {
	mapimage.value = pb.files.getUrl(data, data.mapimage)
	map.showModal()
}
}
function closeDialog() {
	map.close()
}
</script>
