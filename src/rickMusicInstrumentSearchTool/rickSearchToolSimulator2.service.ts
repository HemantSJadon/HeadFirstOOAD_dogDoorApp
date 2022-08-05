import { ConsoleLogger, Injectable } from "@nestjs/common";
import getAllPropertiesForInstrumentType, { Builder, InstrumentType, PropertyAttributes } from "./instrumentProperties";

@Injectable()
export class RickSearchToolSimulatorServiceNew{
    simulate(){
        //open an inventory
        const inventory = new Inventory();

        //1. Add Guitar to Inventory
        const guitars : Instrument[] = [];
        
        const guitar_spec1 = new InstrumentSpecifications(InstrumentType.Guitar);
        //InstrumentType.Guitar,"winterRose", Builder.Gibson,Type.Acoustic, Wood.Mahogony, Wood.Saal,6, null
        const guitar_spec2 = new InstrumentSpecifications(InstrumentType.Guitar);
        // InstrumentType.Guitar,"texasSweetness", Builder.Gibson,Type.Acoustic, Wood.Mahogony, Wood.Teak,6,null
        const guitar_spec3 = new InstrumentSpecifications(InstrumentType.Guitar);
        //"britishSuburbs", Builder.Hendrix,Type.Electric, Wood.Saal, Wood.Mahogony,6,null
        const guitar_spec4 = new InstrumentSpecifications(InstrumentType.Guitar);
        const guitar_spec5 = new InstrumentSpecifications(InstrumentType.Guitar);
        const guitar_spec6 = new InstrumentSpecifications(InstrumentType.Guitar);
        const propertiesForGuitar = getAllPropertiesForInstrumentType(InstrumentType.Guitar);
        for(let [key,value] of propertiesForGuitar){
            // const values = value as PropertyAttributes;
            switch (key) {
                case "model":
                    guitar_spec1.properties.set(key,"CJ");
                    guitar_spec2.properties.set(key,"D-18");
                    guitar_spec3.properties.set(key,"stratocastor");
                    guitar_spec4.properties.set(key,"stratocastor");
                    guitar_spec5.properties.set(key,"SG'61 Reissue");
                    guitar_spec6.properties.set(key,"Les Paul");
                    break;
                case "builder":
                    guitar_spec1.properties.set(key,value.possibleValues[1]);
                    guitar_spec2.properties.set(key,value.possibleValues[2]);
                    guitar_spec3.properties.set(key,value.possibleValues[3]);
                    guitar_spec4.properties.set(key,value.possibleValues[3]);
                    guitar_spec5.properties.set(key,value.possibleValues[0]);
                    guitar_spec6.properties.set(key,value.possibleValues[0]);
                    break;
                case "type":
                    guitar_spec1.properties.set(key,value.possibleValues[0]);
                    guitar_spec2.properties.set(key,value.possibleValues[0]);
                    guitar_spec3.properties.set(key,value.possibleValues[1]);
                    guitar_spec4.properties.set(key,value.possibleValues[1]);
                    guitar_spec5.properties.set(key,value.possibleValues[1]);
                    guitar_spec6.properties.set(key,value.possibleValues[1]);
                    break;
                case "topWood":
                    guitar_spec1.properties.set(key,value.possibleValues[2]);
                    guitar_spec2.properties.set(key,value.possibleValues[3]);
                    guitar_spec3.properties.set(key,value.possibleValues[4]);
                    guitar_spec4.properties.set(key,value.possibleValues[4]);
                    guitar_spec5.properties.set(key,value.possibleValues[0]);
                    guitar_spec6.properties.set(key,value.possibleValues[5]);
                    break;
                case "backWood":
                    guitar_spec1.properties.set(key,value.possibleValues[1]);
                    guitar_spec2.properties.set(key,value.possibleValues[0]);
                    guitar_spec3.properties.set(key,value.possibleValues[4]);
                    guitar_spec4.properties.set(key,value.possibleValues[4]);
                    guitar_spec5.properties.set(key,value.possibleValues[0]);
                    guitar_spec6.properties.set(key,value.possibleValues[5]);
                    break;
                case "numStrings":
                    guitar_spec1.properties.set(key,value.possibleValues[0]);
                    guitar_spec2.properties.set(key,value.possibleValues[0]);
                    guitar_spec3.properties.set(key,value.possibleValues[0]);
                    guitar_spec4.properties.set(key,value.possibleValues[0]);
                    guitar_spec5.properties.set(key,value.possibleValues[0]);
                    guitar_spec6.properties.set(key,value.possibleValues[0]);
                    break;
                default:
                    break;
            }
        }

        guitars.push(new Instrument("11277",3999.95,guitar_spec1));
        guitars.push(new Instrument("122784",5495.95,guitar_spec2));
        guitars.push(new Instrument("V95693",1499.95,guitar_spec3));
        guitars.push(new Instrument("V9512",1549.95,guitar_spec4));
        guitars.push(new Instrument("82765501",1890.95,guitar_spec5));
        guitars.push(new Instrument("70108276",2295.95,guitar_spec6));
        guitars.push(new Instrument("21xx_gt",1090.99,guitar_spec1));
        guitars.push(new Instrument("112U7",3999.95,guitar_spec1));
        guitars.push(new Instrument("12B284",5495.95,guitar_spec2));
        guitars.push(new Instrument("49yx_gt",1500.65,guitar_spec3));
        guitars.push(new Instrument("41z_gt",3099.95,guitar_spec6));
        guitars.push(new Instrument("8mu_gt",3000,guitar_spec4));
        guitars.push(new Instrument("34s_gt",2199.95,guitar_spec6));

        guitars.forEach((g) => {
            inventory.addInstrument(g);
        });

        //2. Add Mondlins
        const mandolins : Instrument[] = [];
        const mandolin_spec1 = new InstrumentSpecifications(InstrumentType.Mandolin);

        const propertiesForMandolin = getAllPropertiesForInstrumentType(InstrumentType.Mandolin);
        for(let [key,value] of propertiesForMandolin){
            // const values = value as PropertyAttributes;
            switch (key) {
                case "model":
                    mandolin_spec1.properties.set(key,"F5");
                    break;
                case "builder":
                    mandolin_spec1.properties.set(key,value.possibleValues[0]);
                    break;
                case "type":
                    mandolin_spec1.properties.set(key,value.possibleValues[0]);
                    break;
                case "topWood":
                    mandolin_spec1.properties.set(key,value.possibleValues[5]);
                    break;
                case "backWood":
                    mandolin_spec1.properties.set(key,value.possibleValues[5]);
                    break;
                case "style":
                    mandolin_spec1.properties.set(key,value.possibleValues[2]);
                    break;
                default:
                    break;
            }
        }

        mandolins.push(new Instrument("9019920",5495.99,mandolin_spec1));
        mandolins.forEach((g) => {
            inventory.addInstrument(g);
        });

        // console.log('here are all the guitars in inventory with their serial nums:');
        // guitars.forEach((g) => {
        //     console.log(`serialNum:${g.serialNumber} price:${g.price}`);
        // })

        //simulate the get
        // const serialNum = 'V9512';
        // console.log(`getting the guitar with serial number: ${serialNum}:`);
        // console.log(JSON.stringify(inventory.getInstrument(serialNum)));
        // console.log('\n');


        //simulates the search
        // const guitarSpecs = [guitar_spec1,guitar_spec2,guitar_spec3,guitar_spec4,guitar_spec5,guitar_spec6];
        // guitarSpecs.forEach(g => {
        //     console.log(`search instrument for following specs:
        //     instrumentType: ${InstrumentType[g.instrumentType]} properties: ${JSON.stringify(g.properties)}`);
        //     console.log(`found ${inventory.search(g).length} guitars.`);
        //     console.log("\n");
        // })
        const specsToSearch = new InstrumentSpecifications(null);
        specsToSearch.properties.set('topWood','Maple');
        // specsToSearch.properties.set('type','Acoustic');
        console.log(`search for the following specs
        ${{...specsToSearch.properties}}`);
        console.log(`found ${inventory.search(specsToSearch).length} instruments.`);
        
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
        instruments.forEach(i => console.log(`instrumentType: ${InstrumentType[ i.specs.instrumentType]} serialNum: ${i.serialNumber} price:${i.price}`));
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
        public readonly instrumentType: InstrumentType | null,
        // public readonly model : string | null,
        // public readonly builder: Builder | null,
        // public readonly type: Type | null,
        // public readonly topWood : Wood | null,
        // public readonly backWood : Wood | null,
        // public readonly numStrings: Number | null,
        // public readonly style: Style | null,
        properties?: Map<string, PropertyType> | null
        
    ){
        this._properties = (properties === null || properties === undefined) ? new Map<string,PropertyType> : properties;
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


