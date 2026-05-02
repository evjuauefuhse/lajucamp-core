import CKEditor from "@ckeditor/ckeditor5-vue";


export default defineNuxtPlugin(async (nuxtApp) => {
  const { default: Editor } = await import('ckeditor5-custom-build/build/ckeditor');
  nuxtApp.vueApp.use(CKEditor);
  return {
    provide: {
      ckeditor: {
         customEditor: Editor,
      },
    },
  };
});