import { type } from "os";

export default
    function getAllPropertiesForInstrumentType(instrumentType: InstrumentType): Map<string,PropertyAttributes> {
    const properties = [
        {
            key: "model",
            type: "string",
            possibleValues: null,
            instrumentTypes: [InstrumentType.Guitar, InstrumentType.Mandolin, InstrumentType.Bonjo]
        },
        {
            key: "builder",
            type: "enum",
            possibleValues: getAllPossibleValuesOfAnEnumType(Builder),
            instrumentTypes: [InstrumentType.Guitar, InstrumentType.Mandolin, InstrumentType.Bonjo]
        },
        {
            key: "type",
            type: "enum",
            possibleValues: getAllPossibleValuesOfAnEnumType(Type),
            instrumentTypes: [InstrumentType.Guitar, InstrumentType.Mandolin, InstrumentType.Bonjo]
        },
        {
            key: "topWood",
            type: "enum",
            possibleValues: getAllPossibleValuesOfAnEnumType(Wood),
            instrumentTypes: [InstrumentType.Guitar, InstrumentType.Mandolin]
        },
        {
            key: "backWood",
            type: "enum",
            possibleValues: getAllPossibleValuesOfAnEnumType(Wood),
            instrumentTypes: [InstrumentType.Guitar, InstrumentType.Mandolin]
        },
        {
            key: "numStrings",
            type: "enum",
            possibleValues: getAllPossibleValuesOfAnEnumType(NumStrings),
            instrumentTypes: [InstrumentType.Guitar, InstrumentType.Bonjo]
        },
        {
            key: "style",
            type: "enum",
            possibleValues: getAllPossibleValuesOfAnEnumType(Style),
            instrumentTypes: [InstrumentType.Mandolin, InstrumentType.Bonjo]
        }

    ]
    const selectedProperties =  properties.filter(p => p.instrumentTypes.some(i => i === instrumentType));
    const propertyNameMappedToAttributes : Map<string, PropertyAttributes> = 
    new Map<string, PropertyAttributes>();
    for(let {key,...others} of selectedProperties){
        propertyNameMappedToAttributes.set(key,{...others} as PropertyAttributes);
    }
    return propertyNameMappedToAttributes
}
export type PropertyAttributes = {
    type: string,
    possibleValues : string[],
    instrumentTypes: InstrumentType[]
}

// this.propertiesForInstrumentTypes.set(InstrumentType.Guitar,["model","builder","type","topWood","backWood","numStrings"]);
// this.propertiesForInstrumentTypes.set(InstrumentType.Mandolin,["model","builder","type","topWood","backWood","style"]);
// this.propertiesForInstrumentTypes.set(InstrumentType.Bonjo,["model","builder","type","style","numStrings"]);

export enum InstrumentType {
    Guitar,
    Mandolin,
    Bonjo
}
export enum Builder {
    Gibson,
    Collings,
    Martin,
    Fender,
    Jetson,
    Hendrix,
}

export enum Type {
    Acoustic,
    Electric
}

export enum Wood {
    Mahogony,
    IndianRoseWood,
    Spruce,
    Adirondack,
    Alder,
    Maple
}
export enum Style {
    A,
    F,
    G,
    Resonator,
    OpenBack
}
export enum NumStrings{
    six,
    twelve,
    eight
}

export type myEnumType = InstrumentType | Builder| Type | Wood | Style | NumStrings;

export function getAllPossibleValuesOfAnEnumType(enumType: Enum): string[]{
    const keys = Object.keys(enumType);
    const halfLength = keys.length/2;
    const possibleValues = keys.slice(-halfLength,undefined);
    return possibleValues;
}

export interface Enum{
    [id: number]: string
}