<template>
  <AdminLayoutHeader
    title="Seitenverwaltung"
    subtitle='Hier kannst du die Seiten verwalten, die in der App unter "Mehr" angezeigt werden.'
    :path="[
      { name: 'Home', path: '/admin', active: false },
      { name: 'Seiten', path: '/admin/pages', active: true },
    ]"
  >
    <div class="btn btn-primary" @click="openCreateDialog()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
        />
      </svg>
      Neue Seite
    </div>
  </AdminLayoutHeader>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box w-11/12 max-w-7xl">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="closeDialog()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
          />
        </svg>
      </button>
      <h3 v-if="action === 0" class="font-bold text-lg">Seite erstellen</h3>
      <h3 v-if="action === 1" class="font-bold text-lg">Seite bearbeiten</h3>
      <div class="py-4">
        <div class="flex flex-col space-y-3">
          <div>
            <div class="label">
              <span class="label-text">Name der Seite</span>
            </div>
            <input
              type="text"
              v-model="name"
              placeholder="Beispieltitel"
              class="input input-bordered w-full"
              :disabled="submitting"
            />
          </div>
          <div>
            <div class="label">
              <div class="flex flex-row justify-between">
                <div class="flex flex-row space-x-2">
                  <span class="label-text">Priorität</span>
                  <div>
                    <div
                      class="tooltip tooltip-right"
                      data-tip="Wenn mehrere Seiten existieren, wird die mit der höheren Priorität weiter oben angezeigt."
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-row">
              <div class="w-full">
                <input
                  type="range"
                  min="0"
                  max="100"
                  class="range range-secondary"
                  step="1"
                  v-model="order"
                />
                <div class="w-full flex justify-between text-xs px-2">
                  <span>Niedrig</span>
                  <span>Hoch</span>
                </div>
              </div>
              <div>
                <input
                  type="number"
                  class="input w-24 ml-3 input-bordered"
                  v-model="order"
                />
              </div>
            </div>
          </div>
          <div>
            <div class="label w-full">
              <div class="w-full flex flex-row justify-between">
                <div class="flex flex-row space-x-2">
                  <span class="label-text">Icon als SVG Code</span>
                  <div>
                    <div
                      class="tooltip tooltip-right"
                      data-tip="Icons müssen als SVG Code eingegeben werden. Rechts klicken, um ein Icon auszuwählen."
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <a target="_blank" href="https://heroicons.com/" class="btn btn-xs"
                  >Zur Icon-Bibliothek</a
                >
              </div>
            </div>
            <textarea
              class="textarea textarea-bordered w-full"
              placeholder="<svg ... />"
              v-model="icon"
            ></textarea>
          </div>
          <div>
            <div class="label">
              <span class="label-text">Sichtbarkeit</span>
            </div>
            <select v-model="key" class="select select-bordered w-full">
              <option :value="-1">Öffentlich</option>
              <option v-for="key in keys" :value="key.id">
                Berechtigungsschlüssel erforderlich: {{ key.name }}
              </option>
            </select>
          </div>
          <label class="label cursor-pointer">
            <span class="label-text">Seite als Link verwenden</span>
            <input
              type="checkbox"
              class="toggle"
              v-model="islink"
              :disabled="submitting"
            />
          </label>
          <div v-if="!islink">
            <div class="w-full z-8 min-w-50%">
              <div class="label">
                <span class="label-text">Seiteninhalt</span>
              </div>
              <ClientOnly fallback-tag="div" fallback="Bitte warten, der Editor lädt...">
                <ckeditor
                  class="z-8 h-full pt-3"
                  :editor="$ckeditor.customEditor"
                  v-model="content"
                  :config="editorconfig"
                />
              </ClientOnly>
            </div>
          </div>
          <div v-else>
            <AdminHighPermissionWarning
              reason="Bitte stelle sicher, dass die verlinkte Seite vertrauenswürdig ist und prüfe die verlinkten Inhalte."
            >
            </AdminHighPermissionWarning>
            <div class="label">
              <span class="label-text">Zu verlinkende URL</span>
            </div>
            <input v-model="url" class="input input-bordered w-full" />
          </div>
        </div>
      </div>
      <div class="modal-action">
        <button class="btn pr-3" :disabled="submitting" @click="closeDialog()">
          Abbrechen
        </button>
        <button
          @click="save()"
          :disabled="submitting || name === null || name === ''|| icon === null || icon === '' || (islink && (url === null || url === '') || (!islink && (content === null || content === '')) || !(icon.includes('svg')))"
          class="btn btn-primary"
        >
          <div v-if="submitting">
            <span v-if="submitting" class="loading loading-spinner loading-xs"></span>
            Übertragen...
          </div>
          <div v-else>Speichern</div>
        </button>
      </div>
    </div>
  </dialog>
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="closeDeleteDialog()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
          />
        </svg>
      </button>
      <h3 class="font-bold text-lg">Diese Seite wirklich löschen?</h3>
      <div class="py-4">
        Dieser Vorgang kann nicht rückgängig gemacht werden.
      </div>
      <div class="modal-action">
        <button class="btn pr-3" @click="closeDeleteDialog()">Abbrechen</button>
        <button :disabled="submitting" class="btn btn-error" @click="confirmDelete()">
          <div v-if="submitting">
            <span class="loading loading-spinner loading-xs"></span>
            Übertragen...
          </div>
          <div v-else>Löschen</div>
        </button>
      </div>
    </div>
  </dialog>
  <div class="pl-3">
    <div class="overflow-x-auto">
     <AdminPageList @edit="edit" @delete="deleteDialog" :data="records" />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const action = ref(-1);

const name = ref("");
const content = ref("");
const url = ref("");
const order = ref(50);
const key = ref(-1);
const icon = ref(null);

const pb = useInstanceManager().getPocketBase();

const keys = await pb.collection("keys").getFullList({
  sort: "name",
});
const records = ref([]);
records.value = await pb.collection("pages").getFullList({
  sort: "order", expand: "featureKey"
});

const editorconfig = {};
const submitting = ref(false);
const islink = ref(false);

let selectedId

function openCreateDialog() {
  action.value = 0;
  my_modal_1.showModal();
}

function debug() {
  console.log(assemblePage());
}

function assemblePage() {
  return {
    order: order.value,
    name: name.value,
    content: content.value,
    icon: icon.value,
    needsFeatureKey: key.value !== -1,
    redirectUrl: islink.value ? url.value : "",
    featureKey: key.value !== -1 ? key.value : "",
  };
}

function reset() {
  name.value = "";
  content.value = "";
  (url.value = ""), (order.value = 50);
  key.value = -1;
  icon.value = "";
  action.value = -1;
}

function closeDialog() {
  my_modal_1.close();
  reset();
}

async function save() {
  submitting.value = true
  if (action.value === 0) {
    // create new
    const record = await pb.collection("pages").create(assemblePage());
  }
  if (action.value === 1) {
    const record = await pb.collection('pages').update(selectedId, assemblePage());
  }
  await updateList();
  closeDialog();
  submitting.value = false
}

async function updateList() {
  records.value = await pb.collection("pages").getFullList({
    sort: "order", expand: "featureKey"
  });
}

function edit(page) {
  selectedId = page.id
  action.value = 1
  name.value = page.name
  content.value = page.content
  order.value = page.order
  key.value = (page.featureKey === "" && page.needsFeatureKey) ? -1 : page.featureKey
  icon.value = page.icon
  url.value = page.redirectUrl
  islink.value = page.url !== ""
  my_modal_1.showModal();

}

function deleteDialog(index) {
  my_modal_2.showModal();
  selectedId = records.value[index].id;
}

function closeDeleteDialog() {
  my_modal_2.close()
}

async function confirmDelete() {
  submitting.value = true;
    await pb.collection("pages").delete(selectedId);
    await updateList();
    closeDeleteDialog();
  submitting.value = false;
}
</script>
