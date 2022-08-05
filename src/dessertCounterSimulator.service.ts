import { Injectable } from "@nestjs/common";


@Injectable()
export class DessertCounterSimulatorService{
    public simulate(){
        //open a dessert counter
        const dessertCounter = new DessertCounter();

        //Order A cone
        console.log('ordering a cone dessert...')
        const desertType = DessertType.Cone;
        
        const dessertAddOns = new DessertAddOns();
         //add vanilla ice cream
        console.log('add vanilla icecream...');
        dessertAddOns.putADessertAddOn(new IceCream(IceCreamFlovour.Vanila));
         //add mint chocolate ice cream
         console.log('add mint chocolate chip icecream...');
        dessertAddOns.putADessertAddOn(new IceCream(IceCreamFlovour.MintChocolateChip));
         //add caramel syrup
        console.log('add caramel syrup...');
        dessertAddOns.putADessertAddOn(new Syrup(SyrupType.Caramel,'this is caramel syrup',["sugar","caramel flavour"]));
         //add nuts as toppings
        console.log('add nuts topping...');
        dessertAddOns.putADessertAddOn(new Topping(ToppingType.Nuts,'these are nuts'));
        //serve
        console.log('serve...')
        const dessert = dessertCounter.getDessert(desertType,dessertAddOns);
        console.log(`dessert type is ${dessert.type}`);
        //put a hot fudge syrup on the same dessert
        console.log('oh, need one more add on...');
        console.log('add hot fudge syrup...')
        dessertCounter.putAddOn(dessert, new Syrup(SyrupType.HotFudge,'this is hot fudge',["sugar","chocolate"]));

        const totalPrice = dessertCounter.getPrice(dessert);
        console.log(`your total order price is ${totalPrice}. Enjoy!`);
   }
}
export enum DessertType{
    Cone,
    Sundae
}

export function getDessertBasePriceList(): Map<string, Number>{
    const dessertBasePrice : Map<string,Number> =
    new Map<string,Number>();
    dessertBasePrice.set(DessertType[DessertType.Cone] as string,30);
    dessertBasePrice.set(DessertType[DessertType.Sundae] as string,20);
    return dessertBasePrice;
}
export function getDessertBasePrice(dessertType:string){
    return getDessertBasePriceList().get(dessertType);
}

export class DessertCounter{
    getDessert(type: DessertType, addOns: DessertAddOns) : Dessert{
        const dessert = new Dessert(type, addOns);
        return dessert.serve();
    }
    putAddOn(dessert: Dessert, addOn: DessertAddOn): Dessert{
        dessert.addOns.putADessertAddOn(addOn);
        return dessert.serve();
    }
    getPrice(dessert: Dessert): Number{
        return dessert.price;
    }
}

export class Dessert{
    constructor(
        private readonly _type: DessertType,
        private _addOns: DessertAddOns
    ){}
    public serve(){
        console.log(`here is your ${this.type}`);
        console.log(JSON.stringify(this._addOns));
        return this;
    }
    public get addOns(): DessertAddOns{
        return this._addOns;
    }
    public get type(): string{
        return DessertType[this._type];
    }
    public get price(): Number{
        let totalPrice =  getDessertBasePrice(this.type) as number;
        totalPrice += this._addOns.getTotalPrice() as number;
        return totalPrice;
    }
}


export enum IceCreamFlovour{
    Vanila,
    Chocolate,
    PepperMint,
    MintChocolateChip
}
export enum ToppingType{
    WhippedCream,
    Nuts,
    Cherries
}
export enum SyrupType{
    HotFudge,
    Caramel
}


//getting the price of individual add ons

export function getDessertAddonPriceList(): Map<string, Number>{
    const dessertAddOnPrice : Map<string,Number> = 
    new Map<string,Number>();
    //adding ice cream flavour prices
    dessertAddOnPrice.set(IceCreamFlovour[IceCreamFlovour.Vanila],25);
    dessertAddOnPrice.set(IceCreamFlovour[IceCreamFlovour.Chocolate],35);
    dessertAddOnPrice.set(IceCreamFlovour[IceCreamFlovour.MintChocolateChip],45);
    dessertAddOnPrice.set(IceCreamFlovour[IceCreamFlovour.PepperMint],30);
    //adding toppings prices
    dessertAddOnPrice.set(ToppingType[ToppingType.Cherries],15);
    dessertAddOnPrice.set(ToppingType[ToppingType.Nuts],25);
    dessertAddOnPrice.set(ToppingType[ToppingType.WhippedCream],10);
    //adding syrup prices
    dessertAddOnPrice.set(SyrupType[SyrupType.Caramel],20);
    dessertAddOnPrice.set(SyrupType[SyrupType.HotFudge],30);
    return dessertAddOnPrice;
}
export function getDessertAddOnPrice(addOn: string){
    return getDessertAddonPriceList().get(addOn);
}


// all types of dessert add ons
export abstract class DessertAddOn{
    public abstract get price(): Number;
    public isIceCream() : this is IceCream{
        return this instanceof IceCream;
    }
    public isTopping() : this is Topping{
        return this instanceof Topping;
    }
    public isSyrup() : this is Syrup{
        return this instanceof Syrup;
    }
}
   


export class IceCream extends DessertAddOn{
    constructor(
        private readonly _taste: IceCreamFlovour
    ){
        super()
    }
    public get taste(): string{
        return IceCreamFlovour[this._taste];
    }
    public get price(): Number {
        return getDessertAddOnPrice(this.taste);
    }
}



export interface Idescribable{
    description: string;
}
export class Topping extends DessertAddOn implements Idescribable{
    constructor(
        private readonly _type: ToppingType,
        private readonly _descrition: string
    ){
        super()
    }
    public get description(): string{
        return this._descrition;
    }
    public get type() : string{
        return ToppingType[this._type];
    }
    public get price(): Number {
        return getDessertAddOnPrice(this.type);
    }
}

export class Syrup extends DessertAddOn implements Idescribable{
    constructor(
        private readonly _type: SyrupType,
        private readonly _descrition: string,
        private readonly _ingredients : string[]
    ){
        super()
    }
    public get description(): string{
        return this._descrition;
    }
    public get type() : string{
        return SyrupType[this._type];
    }
    public get ingredients(): string[]{
        return this._ingredients;
    }
    public get price(): Number {
        return getDessertAddOnPrice(this.type);
    }
}


//combination of add ons in a dessert
export class DessertAddOns{
    private _iceCreams: IceCream[] = [];
    private _syrups: Syrup[] = [];
    private _toppings: Topping[] = [];

    public get iceCreams(): IceCream[]{
        return this._iceCreams;
    }
    public get syrups(): Syrup[]{
        return this._syrups;
    }
    public get toppings(): Topping[]{
        return this._toppings;
    }
    public putADessertAddOn(addOn: DessertAddOn){
        if(addOn.isIceCream()){
            this.addIceCream(addOn as IceCream);
            return;
        }
        if(addOn.isSyrup()){
            this.addSyrup(addOn as Syrup);
            return;
        }
        else {
            this.addTopping(addOn as Topping)
        }
        return;
    }
    public getTotalPrice(): Number{
        let totalPrice = 0;
        this._iceCreams.forEach(i => totalPrice += (i.price as number));
        this._syrups.forEach(i => totalPrice += (i.price as number));
        this._toppings.forEach(i => totalPrice += (i.price as number));
        return totalPrice;
    }
    private addIceCream(iceCream : IceCream) {
        this._iceCreams.push(iceCream);
    }
    private addSyrup(syrup : Syrup) {
        this._syrups.push(syrup);
    }
    private addTopping(topping : Topping) {
        this._toppings.push(topping);
    }
    
    
}

