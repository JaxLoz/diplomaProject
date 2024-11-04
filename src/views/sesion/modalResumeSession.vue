<template>
    <Dialog pt:pcCloseButton:root:onClick="console.log('ho')" modal :visible="showModalResumen" maximizable header="Detalles de la session #000" :style="{ width: '50rem' }" pt:root:class="w-full bg-gray-400" >
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, totam eum. Adipisci, error quisquam quibusdam architecto voluptatum vero, minus molestias corporis nam quae dignissimos dolorum ut, suscipit laudantium iusto! Maxime!</p>
    </Dialog>
</template>
<script setup>
import Dialog from 'primevue/dialog';
import { useSessionStore } from '@/stores/session'
import { computed } from 'vue';

const sessionStore = useSessionStore()

const showModalResumen = computed(() => sessionStore.getShowResumenModalSession()) 
const mensajito = () => {
    console.log('hola')
}

</script>