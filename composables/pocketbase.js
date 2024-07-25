import PocketBase from 'pocketbase';


export const usePocketBase = () => {
  const config = useRuntimeConfig();
  console.warn("usePocketBase() is deprecated and will be removed in a future release, use useInstanceManager().getPocketBase() instead.")
  return useInstanceManager().getPocketBase()
}