import { Injectable } from "@nestjs/common";

@Injectable()
export class RickSearchToolSimulatorServiceNew{
    simulate(){
        //open an inventory
        const inventory = new Inventory();
        const guitars : Instrument[] = [];
        const guitar_spec1 = new InstrumentSpecifications(InstrumentType.Guitar,"winterRose", Builder.Gibson,Type.Acoustic, Wood.Mahogony, Wood.Saal,6, null);
        const guitar_spec2 = new InstrumentSpecifications(InstrumentType.Guitar,"texasSweetness", Builder.Gibson,Type.Acoustic, Wood.Mahogony, Wood.Teak,6,null);
        const guitar_spec3 = new InstrumentSpecifications(InstrumentType.Guitar,"britishSuburbs", Builder.Hendrix,Type.Electric, Wood.Saal, Wood.Mahogony,6,null);


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
class InstrumentSpecifications{
    private propertiesForInstrumentTypes : Map<InstrumentType, string[]> = 
    new Map<InstrumentType,string[]>();
    
    constructor(
        public readonly instrumentType: InstrumentType,
        public readonly model : string | null,
        public readonly builder: Builder | null,
        public readonly type: Type | null,
        public readonly topWood : Wood | null,
        public readonly backWood : Wood | null,
        public readonly numStrings: Number | null,
        public readonly style: Style | null,
        
    ){
        this.propertiesForInstrumentTypes.set(InstrumentType.Guitar,["model","builder","type","topWood","backWood","numStrings"]);
        this.propertiesForInstrumentTypes.set(InstrumentType.Mandolin,["model","builder","type","topWood","backWood","style"]);
        this.propertiesForInstrumentTypes.set(InstrumentType.Bonjo,["model","builder","type","style","numStrings"]);
    }
    private getProperitesMappedToInstrumentType(instrumentType: InstrumentType): string[]{
        return this.propertiesForInstrumentTypes.get(instrumentType);
    }
    matches(otherInstrumentSpecs: InstrumentSpecifications): boolean {
        if(this.instrumentType !== otherInstrumentSpecs.instrumentType){
            return false;
        }
        const propsToCompare = this.getProperitesMappedToInstrumentType(this.instrumentType);
        for(let prop of propsToCompare){
            if(this[prop] !== otherInstrumentSpecs[prop]){
                return false;
            }
        }
        return true;
    }

}
enum InstrumentType{
    Guitar,
    Mandolin,
    Bonjo
}
enum Builder{
    Gibson,
    Jetson,
    Hendrix
}

enum Type{
    Acoustic,
    Electric
}

enum Wood{
    Mahogony,
    Saal,
    Teak
}
enum Style{
A,
F,
Resonator,
OpenBack
}