function extractDate(date) {
    console.log(date);
    if (!date) return 'Fecha no válida'; // Manejamos valores vacíos
    try {
        console.log(new Date(date).toLocaleDateString('es-CO', { timeZone: 'America/Bogota', day: '2-digit', month: '2-digit', year: 'numeric' }));
        return new Date(date).toLocaleDateString('es-CO', { timeZone: 'America/Bogota', day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch (error) {
        console.error('Error al formatear la fecha:', error);
        return 'Fecha inválida';
    }
}

function extractHour(hora) {
    const localHour = new Date(hora).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota', hour12: false});
    return localHour
}


function getHourFromString (stringHour){
    const [hour, minute] = stringHour.split(':');
    const date = new Date();
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));

    console.log(date.getTime());
}

function getCurrentHour () {
    const currentHour = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota', hour12: false});
    return currentHour
}


export default { extractDate, extractHour, getHourFromString, getCurrentHour };
