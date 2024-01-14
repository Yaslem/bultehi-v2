export function getUniqueStates(states) {
    let newStates = [];
    states.forEach(x => {
        if (!newStates.some(y => JSON.stringify(y.name.ar) === JSON.stringify(x.name.ar))) {
            newStates.push(x)
        }
    })
    return newStates
}

export function getUniqueTypes(types) {
    let newTypes = [];
    types.forEach(x => {
        if (!newTypes.some(y => JSON.stringify(y.name.fr) === JSON.stringify(x.name.fr))) {
            newTypes.push(x)
        }
    })
    return newTypes
}

export function getUniqueEstablishments(establishments) {
    let newEstablishments = [];
    establishments.forEach(x => {
        if (!newEstablishments.some(y => JSON.stringify(y.name.ar) === JSON.stringify(x.name.ar))) {
            newEstablishments.push(x)
        }
    })
    return newEstablishments
}

export function getUniqueCounties(counties) {
    let newCounties = [];
    counties.forEach(x => {
        if (!newCounties.some(y => JSON.stringify(y.name.ar) === JSON.stringify(x.name.ar))) {
            newCounties.push(x)
        }
    })
    return newCounties
}

export function getUniqueSchools(schools) {
    let newSchools = [];
    schools.forEach(x => {
        if (!newSchools.some(y => JSON.stringify(y.name.ar) === JSON.stringify(x.name.ar))) {
            newSchools.push(x)
        }
    })
    return newSchools
}