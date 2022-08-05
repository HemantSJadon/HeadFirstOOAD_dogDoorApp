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
            possibleValues: [Builder[Builder.Gibson], Builder[Builder.Jetson], Builder[Builder.Hendrix]],
            instrumentTypes: [InstrumentType.Guitar, InstrumentType.Mandolin, InstrumentType.Bonjo]
        },
        {
            key: "type",
            type: "enum",
            possibleValues: [Type[Type.Acoustic], Type[Type.Electric]],
            instrumentTypes: [InstrumentType.Guitar, InstrumentType.Mandolin, InstrumentType.Bonjo]
        },
        {
            key: "topWood",
            type: "enum",
            possibleValues: [Wood[Wood.Mahogony],Wood[Wood.Saal],Wood[Wood.Teak]],
            instrumentTypes: [InstrumentType.Guitar, InstrumentType.Mandolin]
        },
        {
            key: "backWood",
            type: "enum",
            possibleValues: [Wood[Wood.Mahogony],Wood[Wood.Saal],Wood[Wood.Teak]],
            instrumentTypes: [InstrumentType.Guitar, InstrumentType.Mandolin]
        },
        {
            key: "numStrings",
            type: "enum",
            possibleValues: [NumStrings[NumStrings.six],NumStrings[NumStrings.eight],NumStrings[NumStrings.twelve]],
            instrumentTypes: [InstrumentType.Guitar, InstrumentType.Bonjo]
        },
        {
            key: "style",
            type: "enum",
            possibleValues: [Style[Style.A],Style[Style.F],Style[Style.OpenBack],Style[Style.Resonator]],
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
    Jetson,
    Hendrix
}

export enum Type {
    Acoustic,
    Electric

}

export enum Wood {
    Mahogony,
    Saal,
    Teak
}
export enum Style {
    A,
    F,
    Resonator,
    OpenBack
}
export enum NumStrings{
    six,
    twelve,
    eight
}