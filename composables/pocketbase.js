import PocketBase from 'pocketbase';


export const usePocketBase = () => {
  const config = useRuntimeConfig();
  const instances = useInstanceManager()
  console.warn("usePocketBase() is deprecated and will be removed in a future release, use useInstanceManager().getPocketBase() instead.")
  return instances.getPocketBase()
}