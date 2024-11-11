function extractDate(date) {
    if (!date) return 'Fecha no válida'; // Manejamos valores vacíos
    try {
        return new Date(date).toISOString().split('T')[0];
    } catch (error) {
        console.error('Error al formatear la fecha:', error);
        return 'Fecha inválida';
    }
}

function extractHour(hora) {
    const localHour = new Date(hora).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota', hour12: true});
    return localHour
}



function getHourFromString (stringHour){
    const [hour, minute] = stringHour.split(':');
    const date = new Date();
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));

    console.log(date.getTime());
}




export default { extractDate, extractHour, getHourFromString };
