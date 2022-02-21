export function setUnion(setA, setB) {
    let _union = new Set(setA)
    for (const elem of setB) {
        _union.add(elem)
    }
    return _union
}

export function setDifference(setA, setB) {
    let _difference = new Set(setA)
    for (const elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

export function setIntersection(setA, setB) {
    let _intersection = new Set()
    for (const elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

// stringsToCharactersSet takes a list of strings and returns the set of all
// characters in those strings.
export function stringsToCharactersSet(guesses) {
    let resultSet = new Set();
    for (const guess of guesses) {
        resultSet = setUnion(resultSet, new Set(guess))
    }
    return resultSet
}

// export {setUnion, setDifference, stringsToCharactersSet};