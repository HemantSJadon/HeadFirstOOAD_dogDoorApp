import { Injectable } from "@nestjs/common";
import getAllPropertiesForInstrumentType, { Builder, InstrumentType, PropertyAttributes } from "./instrumentProperties";

@Injectable()
export class RickSearchToolSimulatorServiceNew{
    simulate(){
        //open an inventory
        const inventory = new Inventory();
        const guitars : Instrument[] = [];
        
        const guitar_spec1 = new InstrumentSpecifications(InstrumentType.Guitar);
        //InstrumentType.Guitar,"winterRose", Builder.Gibson,Type.Acoustic, Wood.Mahogony, Wood.Saal,6, null
        const guitar_spec2 = new InstrumentSpecifications(InstrumentType.Guitar);
        // InstrumentType.Guitar,"texasSweetness", Builder.Gibson,Type.Acoustic, Wood.Mahogony, Wood.Teak,6,null
        const guitar_spec3 = new InstrumentSpecifications(InstrumentType.Guitar);
        //"britishSuburbs", Builder.Hendrix,Type.Electric, Wood.Saal, Wood.Mahogony,6,null
        const propertiesForGuitar = getAllPropertiesForInstrumentType(InstrumentType.Guitar);
        for(let [key,value] of propertiesForGuitar){
            // const values = value as PropertyAttributes;
            switch (key) {
                case "model":
                    guitar_spec1.properties.set(key,"winterRose");
                    guitar_spec2.properties.set(key,"texasSweetness");
                    guitar_spec3.properties.set(key,"britishSuburbs");
                    break;
                case "builder":
                    guitar_spec1.properties.set(key,value.possibleValues[0]);
                    guitar_spec2.properties.set(key,value.possibleValues[1]);
                    guitar_spec1.properties.set(key,value.possibleValues[2]);
                case "type":
                    guitar_spec1.properties.set(key,value.possibleValues[0]);
                    guitar_spec2.properties.set(key,value.possibleValues[0]);
                    guitar_spec1.properties.set(key,value.possibleValues[1]);
                case "topWood":
                    guitar_spec1.properties.set(key,value.possibleValues[0]);
                    guitar_spec2.properties.set(key,value.possibleValues[0]);
                    guitar_spec1.properties.set(key,value.possibleValues[1]);
                case "backWood":
                    guitar_spec1.properties.set(key,value.possibleValues[1]);
                    guitar_spec2.properties.set(key,value.possibleValues[2]);
                    guitar_spec1.properties.set(key,value.possibleValues[0]);
                case "numStrings":
                    guitar_spec1.properties.set(key,value.possibleValues[0]);
                    guitar_spec2.properties.set(key,value.possibleValues[0]);
                    guitar_spec1.properties.set(key,value.possibleValues[0]);
                default:
                    break;
            }
        }

        guitars.push(new Instrument("36d_gt",15000,guitar_spec2));
        guitars.push(new Instrument("1a_gt",10000,guitar_spec1));
        guitars.push(new Instrument("49yx_gt",15000,guitar_spec2));
        guitars.push(new Instrument("41z_gt",30000,guitar_spec3));
        guitars.push(new Instrument("8mu_gt",30000,guitar_spec3));
        guitars.push(new Instrument("34s_gt",30000,guitar_spec3));
        guitars.push(new Instrument("21xx_gt",10000,guitar_spec1));

        guitars.forEach((g) => {
            inventory.addInstrument(g);
        })


        console.log('here are all the guitars in inventory with their serial nums:');
        guitars.forEach((g) => {
            console.log(`serialNum:${g.serialNumber} price:${g.price}`);
        })

        //simulate the get
        const serialNum = '49yx_gt';
        console.log(`getting the guitar with serial number: ${serialNum}:`);
        console.log(JSON.stringify(inventory.getInstrument(serialNum)));


        //simulates the search
        console.log(`search instrument for following specs:
        ${JSON.stringify(guitar_spec3)}`);
        inventory.search(guitar_spec3);
    }
}


class Inventory{
    private _instruments : Instrument[] = [];
    addInstrument(instrument: Instrument){
        this._instruments.push(instrument);
    }
    getInstrument(serialNumber: string): Instrument | null{
        const instrument =  this._instruments.find(i => i.serialNumber === serialNumber);
        if(!instrument){
            return null;
        }
        return instrument;
    }
    search(specsToMatch: InstrumentSpecifications): Instrument[] {
        const instruments = this._instruments.filter(i => i.specs.matches(specsToMatch));
        if(!instruments){
            return [];
        }
        console.log('here are the matching instruments')
        instruments.forEach(i => console.log(`serialNum: ${i.serialNumber} price:${i.price}`));
        return instruments;
    }
}

class Instrument{
    constructor(
        public readonly serialNumber: string,
        private _price: Number,
        public readonly specs: InstrumentSpecifications
    ){}
    public get price(): Number{
        return this._price;
    }
    public set price(newPrice: Number){
        this._price = newPrice;
    }
}

export type PropertyType = string | Number;

class InstrumentSpecifications{
    // private propertiesForInstrumentTypes : Map<InstrumentType, string[]> = 
    // new Map<InstrumentType,string[]>();
    private _properties : Map<string, PropertyType>;
    
    constructor(
        public readonly instrumentType: InstrumentType,
        // public readonly model : string | null,
        // public readonly builder: Builder | null,
        // public readonly type: Type | null,
        // public readonly topWood : Wood | null,
        // public readonly backWood : Wood | null,
        // public readonly numStrings: Number | null,
        // public readonly style: Style | null,
        properties?: Map<string, PropertyType> | null
        
    ){
        this._properties = properties === null  ? new Map<string,PropertyType> : properties;
        // this.propertiesForInstrumentTypes.set(InstrumentType.Guitar,["model","builder","type","topWood","backWood","numStrings"]);
        // this.propertiesForInstrumentTypes.set(InstrumentType.Mandolin,["model","builder","type","topWood","backWood","style"]);
        // this.propertiesForInstrumentTypes.set(InstrumentType.Bonjo,["model","builder","type","style","numStrings"]);
    }
    public get properties(): Map<string, PropertyType>{
        return this._properties;
    }
    public getValueForProperty(propertyName: string) : PropertyType {
        const value = this._properties.get(propertyName);
        return value;
    }
    // private getProperitesMappedToInstrumentType(instrumentType: InstrumentType): string[]{
    //     return this.propertiesForInstrumentTypes.get(instrumentType);
    // }
    // matches(otherInstrumentSpecs: InstrumentSpecifications): boolean {
    //     if(this.instrumentType !== otherInstrumentSpecs.instrumentType){
    //         return false;
    //     }
    //     const propsToCompare = this.getProperitesMappedToInstrumentType(this.instrumentType);
    //     for(let prop of propsToCompare){
    //         if(this[prop] !== otherInstrumentSpecs[prop]){
    //             return false;
    //         }
    //     }
    //     return true;
    // }
    matches(otherInstrumentSpecs: InstrumentSpecifications): boolean {
        const otherProperties = otherInstrumentSpecs.properties;
        for(let [key,value] of otherProperties){
            if(this.getValueForProperty(key) !== value){
                return false;
            }
        }
        return true;
    }

}


