function extractDate (infDate){
    const originalDate = new Date(infDate)
    return originalDate.toISOString().split('T')[0]
}

export default{extractDate}