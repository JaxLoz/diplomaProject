<template>
  <div class="flex flex-col min-h-screen overflow-x-hidden">
    <navBar class="w-full print:hidden" />
    <div class="flex flex-1 overflow-hidden">
      <Side_bar/>
      <main class="flex-1 overflow-y-hidden p-4 dark:bg-gray-900 bg-white">
        <div class="max-w-full">
          <router-view />
        </div>
      </main>
    </div>
    <FooterN class="w-full" />
  </div>
</template>

<script setup>
import navBar from '@/components/util/navBar.vue'
import Side_bar from '@/components/util/side_bar.vue'
import FooterN from '@/components/util/Footer-n.vue'
import { onMounted } from 'vue';
import router from '@/router';

onMounted(() =>{
  if(sessionStorage.getItem('tk') == null){
    router.push({name: "login"})
  }
})

</script>