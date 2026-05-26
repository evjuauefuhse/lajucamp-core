<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <div class="bg-base-100 w-11/12 h-5/6 flex flex-col justify-between shadow-lg rounded-md">
            <div class="h-5/6 flex">
                <div class="hero">
                    <div v-show="step === 0" class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="h-4"></div>
                                <h1
                                    class="font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] w-[115%] text-start">
                                    <span class="contrast-150">
                                        Willkommen bei der
                                    </span><br /><span class="inline-grid"><span
                                            class="pointer-events-none col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text blur-xl [transform:translate3d(0,0,0)] [-webkit-text-fill-color:transparent] before:content-[attr(data-text)] [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]"
                                            aria-hidden="true" data-text="KJD Burgdorf"></span><span
                                            class="pb-3 relative col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&amp;::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]">Evangelischen
                                            Jugend</span></span><span class="contrast-150">.</span>
                                </h1>
                                <p class="py-4 font-light md:text-lg xl:text-2xl">Lass uns deinen Server einrichten.</p>
                            </div>
                        </div>
                    </div>
                    <div v-show="step === 1" class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="hero-content flex-col lg:flex-row">
                                    <div>
                                        <div>
                                            <div class="flex flex-row justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" class="size-48 stroke-orange-300">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                                                </svg>



                                            </div>
                                            <div class="h-4"></div>
                                            <h1
                                                class="font-title text-center text-[clamp(2rem,6vw,2.5rem)] font-black leading-[1.1] w-[115%] text-start">
                                                <span class="contrast-150">
                                                    Worum geht's denn?
                                                </span>
                                            </h1>
                                            <p class="py-4 font-light md:text-lg xl:text-2xl">Bitte gib die
                                                Serveradresse ein, um mit dem Setup zu beginnen.</p>
                                            <div>
                                                <div class="label">
                                                    <span class="label-text">Serveradresse</span>
                                                </div>
                                                <input type="text" class="input input-lg input-bordered w-full"
                                                    v-model="pbUrl" @change="errormessage = ''" />
                                                <div role="alert" class="alert alert-error mt-5"
                                                    v-show="errormessage !== ''">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                    </svg>

                                                    <span>{{ errormessage }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div v-show="step === 2" class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="hero-content flex-col lg:flex-row">
                                    <div>
                                        <div>
                                            <div class="flex flex-row justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                    class="w-48 h-48 fill-red-500">
                                                    <path fill-rule="evenodd"
                                                        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                                                        clip-rule="evenodd" />
                                                </svg>


                                            </div>
                                            <div class="h-4"></div>
                                            <h1
                                                class="font-title text-center text-[clamp(2rem,6vw,2.5rem)] font-black leading-[1.1] w-[115%] text-start">
                                                <span class="contrast-150">
                                                    Melde dich mit deinen Pocketbase Zugangsdaten an.
                                                </span>
                                            </h1>
                                            <p class="py-4 font-light md:text-lg xl:text-2xl">Diese wurden bei der
                                                Installation des Backends festgelegt.</p>
                                            <div>
                                                <div class="label">
                                                    <span class="label-text">Mailadresse</span>
                                                </div>
                                                <input type="text" class="input input-lg input-bordered w-full"
                                                    v-model="pbAdminMail" @change="errormessage = ''" />
                                                <div class="label">
                                                    <span class="label-text">Passwort</span>
                                                </div>
                                                <input type="password" class="input input-lg input-bordered w-full"
                                                    v-model="pbAdminPassword" @change="errormessage = ''" />
                                                <div role="alert" class="alert alert-error mt-5"
                                                    v-show="errormessage !== ''">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                    </svg>

                                                    <span>{{ errormessage }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div v-show="step === 3" class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="hero-content flex-col lg:flex-row">
                                    <div>
                                        <div>
                                            <div class="flex flex-row justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" class="size-48 stroke-secondary">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                                                </svg>



                                            </div>
                                            <div class="h-4"></div>
                                            <h1
                                                class="font-title text-center text-[clamp(2rem,6vw,2.5rem)] font-black leading-[1.1] w-[115%] text-start">
                                                <span class="contrast-150">
                                                    Los geht's mit den Basics.
                                                </span>
                                            </h1>
                                            <p class="py-4 font-light md:text-lg xl:text-2xl">Wie soll deine App heißen?
                                            </p>
                                            <div>
                                                <div class="label">
                                                    <span class="label-text">Appname</span>
                                                </div>
                                                <input type="text" class="input input-lg input-bordered w-full"
                                                    v-model="appName" @change="errormessage = ''" />
                                                <div class="label">
                                                    <span class="label-text">Sprengel / Institution</span>
                                                </div>
                                                <input type="text" class="input input-lg input-bordered w-full"
                                                    v-model="teamName" @change="errormessage = ''" />
						<div class="label">
                                                    <span class="label-text">App Symbol</span>
                                                </div>
                                                <input type="text" class="input input-lg input-bordered w-full"
                                                    v-model="appIcon" @change="errormessage = ''" />

                                                <label class="label cursor-pointer">
                                                    <span class="label-text">Veranstaltungsmodus</span>
                                                    <input v-model="eventmode" type="checkbox" class="toggle"
                                                        checked="checked" />
                                                </label>
                                                {{ eventmode }}
                                                <div role="alert" class="alert alert-error mt-5"
                                                    v-show="errormessage !== ''">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                    </svg>


                                                    <span>{{ errormessage }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="step === 4" class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="hero-content flex-col lg:flex-row">
                                    <div>
                                        <div>
                                            <div class="flex flex-row justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                    class="w-48 h-48 fill-red-500">
                                                    <path fill-rule="evenodd"
                                                        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                                                        clip-rule="evenodd" />
                                                </svg>


                                            </div>
                                            <div class="h-4"></div>
                                            <h1
                                                class="font-title text-center text-[clamp(2rem,6vw,2.5rem)] font-black leading-[1.1] w-[115%] text-start">
                                                <span class="contrast-150">
                                                    Lass uns dich kennenlernen.
                                                </span>
                                            </h1>
                                            <p class="py-4 font-light md:text-lg xl:text-2xl">Diese
                                                Informationen werden für den Admin-Benutzer verwendet.</p>
                                            <div>
                                                <div class="label">
                                                    <span class="label-text">Voller Name</span>
                                                </div>
                                                <input type="text" class="input input-lg input-bordered w-full"
                                                    v-model="userFullName" @change="errormessage = ''" />
                                                <div class="label">
                                                    <span class="label-text">Benutzername</span>
                                                </div>
                                                <input type="text" class="input input-lg input-bordered w-full"
                                                    v-model="username" @change="errormessage = ''" />
                                                <div class="label">
                                                    <span class="label-text">Passwort</span>
                                                </div>
                                                <input type="password" class="input input-lg input-bordered w-full"
                                                    v-model="userPassword" @change="errormessage = ''" />
                                                <div class="label">
                                                    <span class="label-text">Passwort bestätigen</span>
                                                </div>
                                                <input type="password" class="input input-lg input-bordered w-full"
                                                    v-model="userPasswordConfirm" @change="errormessage = ''" />
                                                <div role="alert" class="alert alert-error mt-5"
                                                    v-show="errormessage !== ''">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                    </svg>

                                                    <span>{{ errormessage }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="step === 5" class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div>
                                    <div class="h-4"></div>
                                    <h1
                                        class="font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] w-[115%] text-start">
                                        <span class="contrast-150">
                                            Geschafft.
                                        </span>
                                    </h1>
                                    <p class="py-4 font-light md:text-lg xl:text-2xl">Weiter geht's im Admin-Bereich.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-5">
                <div
                    class="inline-flex w-full flex-col items-stretch justify-right gap-2 px-4 md:flex-row xl:justify-end xl:px-0">
                    <div v-if="!submitting" @click="nextStep()"
                        class="btn btn-neutral md:btn-lg md:btn-wide group px-12">
                        <span>Weiter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor"
                            class="mt-0.5 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </div>
                    <div v-else disabled class="btn btn-neutral md:btn-lg md:btn-wide group px-12">
                        <span class="loading loading-spinner"></span>
                        <span>Laden...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import PocketBase from 'pocketbase';
import { v4 as uuidv4 } from 'uuid';

definePageMeta({
    layout: "blank",
});

const step = ref(0)

// const pb = new PocketBase(config.public.pocketbaseUrl);

const submitting = ref(false)
const errormessage = ref("")

// Step 1
const pbUrl = ref()
let pb = null

// Step 2
const pbAdminMail = ref()
const pbAdminPassword = ref()
let authData = null

// Step 3
const appName = ref()
const teamName = ref()
const appIcon = ref()
const eventmode = ref(false)

// Step 4
const username = ref()
const userPassword = ref()
const userPasswordConfirm = ref()
const userFullName = ref()


async function nextStep() {
    errormessage.value = ""
    if (step.value === 0) {
        step.value++
    } else if (step.value === 1) {
        // Check if entry is a valid url
        // use https in prod!!! TODO
        const regex = /^(https:\/\/)[^\s/$.?#].[^\s]*$/i;
        if (!regex.test(pbUrl.value)) {
            errormessage.value = "Die eingegebene URL ist ungültig."
        } else {
            pb = new PocketBase(pbUrl.value)
            try {
                await pb.collection('metadata').getFullList()
            } catch (e) {
                errormessage.value = "Dies ist keine gültige Pocketbase Instanz."
                return
            }
            try {
                const record = await pb.collection('metadata').getFirstListItem('key="setup"');
            } catch (e) {
                step.value++
                return
            }
            errormessage.value = "Das Setup auf dieser Instanz ist bereits abgeschlossen."
        }
    } else if (step.value === 2) {
        try {
            authData = await pb.admins.authWithPassword(pbAdminMail.value, pbAdminPassword.value);
        } catch (e) {
            errormessage.value = "Anmeldung fehlgeschlagen"
            return
        }
        step.value++
    } else if (step.value === 3) {
        if (appName.value === "" || appName.value === undefined || teamName.value === "" || teamName.value === undefined || appIcon.value === "" || appIcon.value === undefined) {
            errormessage.value = "Bitte gib einen gültigen App-Namen ein."
        } else {
            step.value++
        }
    } else if (step.value === 4) {
        if (username.value === undefined || userFullName.value === undefined || userPassword.value === undefined || userPasswordConfirm.value === undefined) {
            errormessage.value = "Alle Felder müssen ausgefüllt werden."
            return
        }
        if (userPassword.value !== userPasswordConfirm.value) {
            errormessage.value = "Die Passwörter stimmen nicht überein."
            return
        }
        submitting.value = true
        const team = await pb.collection('teams').create({ "name": "Administration" });
        const userData = {
            username: username.value,
            name: userFullName.value,
            email: pbAdminMail.value,
            team: team.id,
            manageAllEvents: true,
            manageCategories: true,
            manageLocations: true,
            manageSongs: true,
            manageWelcome: true,
            managePosts: true,
            manageTeams: true,
            manageUsers: true,
            manageKeys: true,
            managePages: true,
            superadmin: false,
            emailVisibility: false,
            password: userPassword.value,
            passwordConfirm: userPassword.value,
        };
        const user = await pb.collection('users').create(userData);
        await pb.collection('metadata').create({ "key": "setup", "value": { "completed": true } });
        await pb.collection('metadata').create({ "key": "app", "value": { "name": appName.value, "team": teamName.value, "icon": appIcon.value } });
        await pb.collection('user_settings').create({ "user": user.id, "setting": "oobe_password_set", "content": { "success": true } })
        await pb.collection('metadata').create({ "key": "instance", "value": { "id": uuidv4() } });
        if (eventmode.value) {
            await pb.collection('metadata').create({ "key": "events", "value": { "mode": "event" } });
        } else {
            await pb.collection('metadata').create({ "key": "events", "value": { "mode": "calendar" } });
        }
        submitting.value = false
        step.value++
    } else if (step.value === 5) {
        pb.authStore.clear();
        await navigateTo("/admin")
    }
}
</script>
