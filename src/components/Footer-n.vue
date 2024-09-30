<template>
  <div id="app" class="flex flex-col min-h-3"> <!-- Asegúrate de que el contenedor principal use Flexbox -->
    <div class="flex-grow"> <!-- Este div puede contener tu contenido principal -->
      <!-- Aquí va tu contenido principal -->
    </div>
    <footer class="bg-gray-800 text-white shadow m-0">
      <div class="w-full max-w-screen-xl mx-auto p-10 md:py-10">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap">Flowbite</span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" class="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr class="my-5 border-gray-700" />
        <span class="block text-sm text-gray-400 sm:text-center">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>
<style>



</style>
