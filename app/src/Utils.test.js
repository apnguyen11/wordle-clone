import {stringsToCharactersSet, setDifference, setIntersection} from './Utils';

it('converts a list of strings to a set of characters', () => {
    expect(stringsToCharactersSet([''])).toEqual(new Set([]))
    expect(stringsToCharactersSet(['abc'])).toEqual(new Set(['a', 'b', 'c']))
    expect(stringsToCharactersSet(['abc', ''])).toEqual(new Set(['a', 'b', 'c']))
    expect(stringsToCharactersSet(['abc', 'bcd'])).toEqual(new Set(['a', 'b', 'c', 'd']))
});

it('returns the difference of set A - set B', () => {
    expect(setDifference(new Set('abc'), new Set('a'))).toEqual(new Set('bc'))
});

it ('returns the intersection of set A and set B', () => {
    expect(setIntersection(new Set(''), new Set('abc'))).toEqual(new Set(''))
    expect(setIntersection(new Set('abc'), new Set('def'))).toEqual(new Set(''))
    expect(setIntersection(new Set('abc'), new Set('abc'))).toEqual(new Set('abc'))
    expect(setIntersection(new Set('abc'), new Set('bcd'))).toEqual(new Set('bc')) 
});