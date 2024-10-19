function extractDate (infDate){
    const originalDate = new Date(infDate)
    return originalDate.toISOString().split('T')[0]
}

function extractHour (infDate){
    const originalDate = new Date(infDate)
    return originalDate.toISOString().split('T')[1].slice(3,8)
}

export default{extractDate, extractHour}