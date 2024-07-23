export default defineNuxtRouteMiddleware((to, from) => {
    if (to.name !== "misc-settings-instances-add") {
        const instances = useInstanceManager()
        console.log(instances.isReady())
        if (process.client && instances.shouldDoInitialSetup()) {
            console.log("Loading initial setup")
            return navigateTo("/misc/settings/instances/add")
        }
    }
})
