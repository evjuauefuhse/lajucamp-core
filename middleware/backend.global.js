export default defineNuxtRouteMiddleware((to, from) => {
    if (to.name !== "misc-settings-instances-add") {
        const instances = useInstanceManager()
        console.debug(instances.isReady())
        if (process.client && instances.shouldDoInitialSetup()) {
            console.debug("Loading initial setup")
            return navigateTo("/misc/settings/instances/add")
        }
    }
})
