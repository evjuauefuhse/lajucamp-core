import CKEditor from "@ckeditor/ckeditor5-vue";
import Editor from 'ckeditor5-custom-build/build/ckeditor';


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(CKEditor);
  return {
    provide: {
      ckeditor: {
         customEditor: Editor,
      },
    },
  };
});