import { Injectable } from "@nestjs/common";

@Injectable()
export class RickGuitarSearchSimulator{
    simulate(){
        //open an inventory
        const inventory = new Inventory();
        const guitars : Guitar[] = [];
        const guitar_spec1 = new GuitarSpecification("winterRose", Builder.Gibson,Type.Acoustic, Wood.Mahogony, Wood.Saal,6);
        const guitar_spec2 = new GuitarSpecification("texasSweetness", Builder.Gibson,Type.Acoustic, Wood.Mahogony, Wood.Teak,6);
        const guitar_spec3 = new GuitarSpecification("britishSuburbs", Builder.Hendrix,Type.Electric, Wood.Saal, Wood.Mahogony,6);


        guitars.push(new Guitar("1a_gt",10000,guitar_spec1));
        guitars.push(new Guitar("36d_gt",15000,guitar_spec2));
        guitars.push(new Guitar("49yx_gt",15000,guitar_spec2));
        guitars.push(new Guitar("41z_gt",30000,guitar_spec3));
        guitars.push(new Guitar("8mu_gt",30000,guitar_spec3));
        guitars.push(new Guitar("34s_gt",30000,guitar_spec3));
        guitars.push(new Guitar("21xx_gt",10000,guitar_spec1));

        guitars.forEach((g) => {
            inventory.addAInstrument(g);
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
        console.log(`search guitars for following specs:
        ${JSON.stringify(guitar_spec3)}`);
        inventory.searchGuitars(guitar_spec3);



    }
}

class Inventory{
    private _inventory : Instrument[] = [];
    public addAInstrument(instrument: Instrument){
        this._inventory.push(instrument);
    }
    public getInstrument(serialNumber: string) : (Instrument | undefined){
        
        const instrument =  this._inventory.find(i =>  i.serialNumber === serialNumber);
        console.log(`instrument is ${instrument.serialNumber}`);
        return instrument;
    }
    public searchGuitars(serachGuitarSpecs : GuitarSpecification): (Guitar[] | undefined){
        const shouldBeAGuitar = (i) => i.specs.isGuitarSpec();
        const guitarSpecShouldMatch = (i,serachGuitarSpecs:GuitarSpecification) =>
        (i.specs as GuitarSpecification).matches(serachGuitarSpecs);
        const guitars = this._inventory.filter((i) => shouldBeAGuitar(i) && guitarSpecShouldMatch(i,serachGuitarSpecs));
        console.log('following guitars are matched for the given specs:');
        guitars.forEach(g => console.log(g.serialNumber));
        return guitars;
    }
    public searchMandolins(searchMandolinSpecs : MandolinSpecification): (Mandolin[] | undefined) {
        const mandolins = this._inventory.filter((i) => {
            i.specs.isMandolinSpec() && (i.specs as MandolinSpecification).matches(searchMandolinSpecs);
        });
        return mandolins;
    }
}


abstract class Instrument{
    
    constructor(
        protected readonly _serialNumber: string,
        protected _price: Number,  
        protected readonly _specs : InstrumentSpecification
    ){}
    public get price() {
        return this._price;
    }
    public set price(price: Number){
        if(price <= 0){
            throw new Error('Price should be a positive number greater than 0');
        }
        this._price = price;
    }
    public get serialNumber(){
        return this._serialNumber;
    }
    public get specs() : InstrumentSpecification{
        return this._specs
    }
}
abstract class InstrumentSpecification {
    constructor(
        protected readonly _model : string,
        protected readonly _builder: Builder,
        protected readonly _type: Type,
        protected readonly _topWood : Wood,
        protected readonly _backWood : Wood
    ){}
    public get model(){
        return this._model;
    }
    public get type(){
        return this._type;
    }
    public get builder(){
        return this._builder;
    }
    public get topWood(){
        return this._topWood;
    }
    public get backWood(){
        return this._backWood;
    }
    public matches(otherInstrumentSpecs : InstrumentSpecification) : boolean {
        if(this.model === otherInstrumentSpecs.model && 
        this.builder === otherInstrumentSpecs.builder &&
        this.type === otherInstrumentSpecs.type &&
        this.topWood === otherInstrumentSpecs.topWood && 
        this.backWood === otherInstrumentSpecs.backWood){
            return true;
        }
        return false;
    };
    public isGuitarSpec(): this is GuitarSpecification{
        return this instanceof GuitarSpecification;
    }
    public isMandolinSpec(): this is MandolinSpecification{
        return this instanceof MandolinSpecification;
    }
}
class GuitarSpecification extends InstrumentSpecification{
    constructor(
        model: string, builder: Builder, type: Type, topWood: Wood, backWood: Wood,
        private readonly _numStrings : Number
    ){
        super(model, builder, type, topWood, backWood)
    }
    public get numStrings(){
        return this._numStrings;
    }
    public override matches(otherInstrumentSpecs: InstrumentSpecification): boolean {
        if(!super.matches(otherInstrumentSpecs)){
            return false;
        }
        let otherNumStrings;
        try {
            const {numStrings} = otherInstrumentSpecs as GuitarSpecification;
            otherNumStrings = numStrings;
        } catch (error) {
            return false;
        }
        if(this.numStrings !== otherNumStrings){
            return false;
        }
        return true;
    }
}
class MandolinSpecification extends InstrumentSpecification{
    constructor(
        model: string, builder: Builder, type: Type, topWood: Wood, backWood: Wood,
        private readonly _style : string
    ){
        super(model, builder, type, topWood, backWood)
    }
    public get style(){
        return this._style;
    }
    public override matches(otherInstrumentSpecs: InstrumentSpecification): boolean {
        if(!super.matches(otherInstrumentSpecs)){
            return false;
        }
        let otherStyle;
        try {
            const {style } = otherInstrumentSpecs as MandolinSpecification;
            otherStyle = style;
        } catch (error) {
            return false;
        }
        
        if(this.style !== otherStyle){
            return false;
        }
        return true;
    }
}
class Guitar extends Instrument{
    constructor(
        serialNumber: string,
        price: Number,
        specification: GuitarSpecification
    ){
        super(serialNumber,price, specification)
    }
}
class Mandolin extends Instrument{
    constructor(
        serialNumber: string,
        price: Number,
        specification: GuitarSpecification
    ){
        super(serialNumber, price,specification)
    }
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
