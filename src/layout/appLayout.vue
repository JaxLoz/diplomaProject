<template>
    <div id="app-layout">
        <navBar />
        <main>
            <router-view />
        </main>
    </div>
</template>
<script setup>
import navBar from '@/components/navBar.vue'
</script>