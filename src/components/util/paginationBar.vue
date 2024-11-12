<template>
    <nav aria-label="Page navigation example">
  <ul class="inline-flex -space-x-px text-base h-10">  

    <li v-for="link in props.links" :key="link.label">
      <a href="#" :class="cleanLabelName(link.label) === 'anterior' ? 'rounded-s-lg ' + styleBase : cleanLabelName(link.label) === 'siguiente' ? 'rounded-e-lg ' + styleBase : styleBase">{{cleanLabelName(link.label)}}</a>
    </li>
  </ul>
</nav>
</template>
<script setup>


    const props = defineProps({
        links: {type: Array, required: true, default: new Array()}
    })

    const cleanLabelName = (label) => {
        switch(label){
          case '&laquo; Previous':
            return 'anterior'
          
            case 'Next &raquo;':
            return 'siguiente'

            default:
              return label
        }
    }

    const styleBase = 'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
  
</script>