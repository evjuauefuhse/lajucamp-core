import PocketBase from 'pocketbase';


export const usePocketBase = () => {
  const config = useRuntimeConfig();
  const pb = new PocketBase(config.public.pocketbaseUrl);

  return pb
}