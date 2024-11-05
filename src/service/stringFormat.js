function getAcronymName (name){
    const partsName = name.split(" ");        
                     
    
    const option1 = partsName.length == 1 ? partsName[0].charAt(0).toUpperCase() : ""
                    
    const option2 = partsName.length == 2 || partsName.length == 3 ? partsName[0].charAt(0).toUpperCase()+partsName[1].charAt(0).toUpperCase() : ""
                    
    const option3 = partsName.length == 4 ? partsName[0].charAt(0).toUpperCase()+partsName[2].charAt(0).toUpperCase() :"" 
    
    return option1+option2+option3               
}

export default {getAcronymName}