function extractDate (infDate){
    const originalDate = new Date(infDate)
    return originalDate.toISOString().split('T')[0]
}

function extractHour(infDate) {
    const originalDate = new Date(infDate);
    return originalDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}


export default{extractDate, extractHour}