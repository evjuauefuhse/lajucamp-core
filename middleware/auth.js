export default defineNuxtRouteMiddleware(async (to, from) => {
    const pb = useInstanceManager().getPocketBase()
    if (pb.authStore.isValid === false) {
        return navigateTo({
            path: "/admin/login",
            query: {
                redirect: to.fullPath
            }
        })
    } else {
        const settings = useSettingsManager()
        const oobe = await settings.getValue('oobe_complete')
        if (!oobe) {
            if (to.path !== '/admin/oobe') {
                return navigateTo({
                    path: "/admin/oobe",
                    query: {
                        redirect: to.fullPath
                    }
                })
            }
        }
    }


})