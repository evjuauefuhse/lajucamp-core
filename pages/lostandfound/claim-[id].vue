<template>
    <CardLikeContainer>
        <h1 class="text-3xl pb-3">Fundstück anfordern</h1>
        Lass uns dein Fundstück zu dir zurückkehren lassen. Bitte fülle dieses Formular aus, damit dein Gegenstand zu
        dir zurückfindet.
        <div v-if="error" role="alert" class="alert alert-error my-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>

            <div>
              Einige Eingaben sind ungültig. Bitte überprüfe deine Angaben.
            </div>
          </div>
        <div v-if="item !== null" class="flex flex-col space-y-1">
            <div>
                <div class="label">
                    <span class="label-text">Fundstück</span>
                </div>
                <input type="text" disabled class="input input-bordered w-full" :placeholder="item.name" />
            </div>
            <div>
                <div class="label">
                    <span class="label-text">Dein voller Name</span>
                </div>
                <input type="text" class="input input-bordered w-full" placeholder="Max Mustermann" v-model="name"/>
            </div>
            <div>
                <div class="label">
                    <span class="label-text">Mailadresse</span>
                </div>
                <input type="text" class="input input-bordered w-full" placeholder="someone@example.com" v-model="mail" />
            </div>
            <div>
                <div class="label">
                    <span class="label-text">Telefonnummer</span>
                </div>
                <input type="text" class="input input-bordered w-full" placeholder="+49123456789" v-model="phone" />
            </div>
            <div>
                <div class="label">
                    <span class="label-text">Straße und Hausnummer</span>
                </div>
                <div class="flex flex-row space-x-2">
                    <input type="text" class="input input-bordered w-full" placeholder="Musterstraße" v-model="street" />
                    <input type="number" class="input input-bordered w-20" placeholder="42" v-model="housenumber" />
                </div>
            </div>
            <div>
                <div class="label">
                    <span class="label-text">Postleitzahl</span>
                </div>
                    <input type="number" class="input input-bordered w-full" placeholder="30161" v-model="zipcode" />
            </div>
            <div>
                <div class="label">
                    <span class="label-text">Ort</span>
                </div>
                    <input type="text" class="input input-bordered w-full" placeholder="Hannover" v-model="city" />
            </div>
            <div>
                <div class="label">
                    <span class="label-text">Zu welchem Sprengel oder Verband gehörst du?</span>
                </div>
                <select class="select select-bordered w-full" v-model="team" >
                    <option :value="undefined" disabled selected>Wähle einen Sprengel</option>
                    <option v-for="team in teams" :value="team.id">{{ team.name }}</option>
                  </select>
            </div>
            <div class="flex flex-row justify-end py-3">
                <button @click="submit" class="btn btn-primary">Absenden</button>
            </div>
        </div>
    </CardLikeContainer>
</template>

<script setup>
const route = useRoute()
const itemManager = useLostFoundManager()
const item = ref(null)
const teamManager = useTeamManager()
const teams = await teamManager.getList()

const name = ref()
const mail = ref()
const phone = ref()
const street = ref()
const housenumber = ref()
const zipcode = ref()
const city = ref()
const team = ref()

const pb = usePocketBase()

const error = ref(false)
onMounted(async () => {
    item.value = await itemManager.getById(route.params.id)
})

function isValidEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
}

function assembleRequest() {
    const data = {
        "item": item.value.id,
        "name": name.value,
        "mail": mail.value,
        "phone": phone.value,
        "city": city.value,
        "street": street.value,
        "zipcode": zipcode.value,
        "housenumber": housenumber.value,
        "team": team.value,
        "state": "open"
    };
    return data
}

async function submit() {
    if(name.value === "" || name.value === undefined || mail.value === "" || mail.value === undefined || !isValidEmail(mail.value) || phone.value === "" || phone.value === undefined || city.value === "" || city.value === undefined || street.value === "" || street.value === undefined || zipcode.value === undefined || zipcode.value < 1 || housenumber.value < 1 || zipcode.value === undefined || housenumber.value === undefined || team.value === undefined) {
        error.value = true
        scroll(0,0)
    } else {
        const record = await pb.collection('lostandfound_entries').create(assembleRequest());
        navigateTo("/lostandfound/success")
    }
}

</script>