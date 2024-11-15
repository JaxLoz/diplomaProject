<template>
    <nav aria-label="Page navigation example">
  <ul :class="styleList">  

    <li v-for="link in props.pages.links" :key="link.label">
      <a @click="selectPage(link.url)" :class="cleanLabelName(link.label) === 'Anterior' ? 'rounded-s-lg ' + styleBase : cleanLabelName(link.label) === 'Siguiente' ? 'rounded-e-lg ' + styleBase : props.pages.current_page == link.label ? styleBase +' '+ focusStyle : styleBase ">{{cleanLabelName(link.label)}}</a>
    </li>
  </ul>
</nav>

</template>
<script setup>

    const props = defineProps({
        pages: {type: Object, required: true, default: new Object()},
        size: {type: String, required: false, default: 'base'}
    })

    const emit = defineEmits(['changePage'])

    const styleBase = props.size == 'base' ? 'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer' : props.size == 'small' ? 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer' : '' ;
    const focusStyle = 'dark:focus:bg-gray-700 dark:focus:text-white focus:bg-blue-100 focus:text-blue-700';
    const styleList = props.size == 'base' ? 'inline-flex -space-x-px text-base h-10' : props.size == 'small' ? 'inline-flex -space-x-px text-sm' : '';
    
    const cleanLabelName = (label) => {
      console.log(label)  
      switch(label){
          case '&laquo; Previous':
            return 'Anterior'
          
            case 'Next &raquo;':
            return 'Siguiente'

            default:
              return label
        }
    }


    const selectPage = (urlPage) => {
      if (urlPage === null) return;
      const paramPage = urlPage.split('page=')[1];
      emit('changePage', paramPage)
    }
</script>