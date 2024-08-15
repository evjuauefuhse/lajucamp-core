<template>
  <table v-if="props.data !== null && props.data.length > 0" class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>Name</th>
        <th v-if="pb.authStore.model.manageAllEvents">Sprengel</th>
        <th>Grund</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, index) in props.data" :key="index" class="hover">
        <td>
          <div class="flex items-center gap-3">
            <div>
              <div class="font-bold">{{ task.event.name }}</div>
            </div>
          </div>
        </td>
        <td v-if="pb.authStore.model.manageAllEvents">
          <div v-if="task.event.team !== null">
            <TeamNote :team="task.event.team" />
          </div>
        </td>
        <td>
          <div class="flex items-center gap-3">
            <div>
              <div >{{ task.reason }}</div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <th>Name</th>
      <th v-if="pb.authStore.model.manageAllEvents">Sprengel</th>
      <th>Grund</th>
    </tfoot>
  </table>
  <AdminNoDataHero
    v-else
    message="Alles im grünen Bereich! Bei keinen Veranstaltungen besteht Handlungsbedarf."
  />
</template>
<script setup>
const props = defineProps(["data"]);
const pb = useInstanceManager().getPocketBase()
</script>
