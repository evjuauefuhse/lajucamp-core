<template>
    <CardLikeContainer>
        <h1 class="text-3xl pb-3">Liederbuch</h1>
        <div role="alert" class="alert alert-warning mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>
        
            <span
              > Du siehst eine vereinfachte Version des Liederbuches, um Ressourcen zu schonen. Optional kannst du zum vollständigen Liederbuch wechseln. Beachte, dass nur die vereinfachte Version bei schlechter Internetverbindung funktioniert.
            </span>
            <div>
                <RouterLink to="/music" class="btn btn-sm btn-primary">Zum erweiterten Liederbuch</RouterLink>
              </div>
          </div>
        <MusicListFallback />
    </CardLikeContainer>
</template>