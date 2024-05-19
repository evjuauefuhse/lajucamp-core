<template>
    <div class="card card-compact bg-base-100 shadow-lg">
        <div class="card-body">
            <h2 class="card-title">Deine nächsten Events</h2>
            <div class="card-content">
                <FavoriteEventList limit="3" homepage />
            </div>
        </div>
    </div>
</template>