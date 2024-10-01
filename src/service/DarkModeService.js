function setDarMode(isDarkMode){
    localStorage.setItem('darkMode', isDarkMode)
    updateDarkMode(isDarkMode)
}

function updateDarkMode(isDarkMode){
    if(isDarkMode){
        document.documentElement.setAttribute('data-mode', 'dark')
    }else{
        document.documentElement.removeAttribute('data-mode')
    }
}

function checkDarkModeOnMounted(){
    const darkModeSaved = localStorage.getItem('darkMode')

    if(darkModeSaved !== null){
        const isDarkMode = JSON.parse(darkModeSaved)
        updateDarkMode(isDarkMode)
    }else{
        const sistemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        updateDarkMode(sistemDarkMode) 
    }
}

export default {setDarMode, updateDarkMode, checkDarkModeOnMounted}