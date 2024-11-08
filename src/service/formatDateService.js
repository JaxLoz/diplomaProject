function extractDate(date) {
    if (!date) return 'Fecha no válida'; // Manejamos valores vacíos
    try {
        return new Date(date).toISOString().split('T')[0];
    } catch (error) {
        console.error('Error al formatear la fecha:', error);
        return 'Fecha inválida';
    }
}

function extractHour(infDate) {
    const originalDate = new Date(infDate);
    return originalDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}
function extractHour24(hora) {
    if (!hora || typeof hora !== 'string') {
        console.error('Hora no válida:', hora);
        return 'Hora no válida';
    }
    
    // Extrae la parte de la hora (hh:mm) del formato ISO 8601
    const timeParts = hora.split('T')[1]; // Esto tomará la parte después de 'T' (hora:minutos:segundos)
    
    if (!timeParts) {
        console.error('Formato de hora incorrecto:', hora);
        return 'Formato incorrecto';
    }

    // Devuelve solo la hora y los minutos (hh:mm)
    return timeParts.substring(0, 5); // Esto toma solo los primeros 5 caracteres (hh:mm)
}






export default { extractDate, extractHour,extractHour24 };
