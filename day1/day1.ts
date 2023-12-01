import { readFileSync } from "fs";

const NumberString =  [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
]
const readData = () => {
    const file = readFileSync('./data.txt', 'utf-8');
    const splittedFile = file.split(/\r?\n/);
    console.log(sumAllCalculatedValue(splittedFile));
}

const getDigitsFromString = (value: string): number[] => {
    const digits : number[] = [];
    for(let i=0; i< value.length; i++ ) {
        const parseValue = parseInt(value[i]);
        if(!isNaN(parseValue)) {
            digits.push(parseValue);
        }
    }
    return digits;
}

const calculateValue = (value: string): number => {
    const digits = getDigitsFromString(findDigitByNameAndReplace(value));
    const combineDigit = `${digits[0]}${digits[digits.length - 1]}`
    return parseInt(combineDigit);
}

const sumAllCalculatedValue = (values: string[] ) => {
    let result = 0;
    values.forEach(value => {
        result = result + calculateValue(value);
    });

    return result;
}

const sort = (valueWithIndex: ValueWithIndex[]) => {
    return valueWithIndex.sort((a, b)  =>{ 
        return a.index - b.index ;
      });
}

interface ValueWithIndex { index: number; value: string; indexInList: number }

const findDigitByNameAndReplace = (value: string) => {
    let newValue = value;
    let valueWithIndex: ValueWithIndex[] = [];
    NumberString.forEach((n, i) => {
        const findIndex = value.indexOf(n);
        if(findIndex >=0){
            valueWithIndex.push({index: findIndex, value: n, indexInList: i}); 
        }
    });

    const sortValues = sort(valueWithIndex)

    sortValues.forEach((v, i) => {
        newValue = newValue.split(v.value).join(v.indexInList.toString() + v.value);
    })

    return newValue;
}

readData();