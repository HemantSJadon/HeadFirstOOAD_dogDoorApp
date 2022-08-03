import { Injectable } from '@nestjs/common';
import { throws } from 'assert';

@Injectable()
export class DogDoorSimulatorService {
  getHello(): string {
    return 'Hello World!';
  }

  async simulate(){
    const door: DogDoor = new DogDoor();
    door.addAllowedBark(new Bark('rowlf'));
    door.addAllowedBark(new Bark('rooowlf'));
    door.addAllowedBark(new Bark('rawlf'));
    door.addAllowedBark(new Bark('woof'));
    const recogniser : BarkRecogniser = new BarkRecogniser(door);

    //simulate the hardware hearing a bark
    console.log('bruce starts barking...');
    recogniser.recognise(new Bark('rowlf'));
    console.log('bruce has gone outside');

    await sleep(10000);

    console.log('bruce is all done...');
    const isDoorOpen = door.isOpen;
    if(!isDoorOpen){
      console.log('but he is stuck outside...');

      //simulate the hardware hearing a bark > not bruce
      const smallDogBark : Bark = new Bark('yip');
      console.log('A small street dog is barking ...');
      recogniser.recognise(smallDogBark);

      await sleep(5000);

      //simulate the hardware hearing a bark again from bruce
      console.log('bruce starts barking again...');
      recogniser.recognise(new Bark('rooowlf'));
      console.log('bruce is back inside');

    }
    


  }
}

export async function sleep(ms : number){
  return new Promise((rs,rj) => {
    setTimeout(rs,ms);
  })
}
@Injectable()
export class DogDoor{
  private _isOpen: boolean = false;
  private allowedBarks : Bark[] = [];

  public addAllowedBark(bark: Bark){
    return this.allowedBarks.push(bark);
  }
  public getAllowedBarks() : Bark[]{
    return this.allowedBarks;
  }
  public get isOpen(): boolean{
    return this._isOpen;
  }
  public open(){
    this._isOpen = true;
    console.log('the dog door is open...');
    setTimeout(() => {
      this.close();
    }, 5000);
  }
  public close(){
    this._isOpen = false;
    console.log('the dog door is closed...');
  }

}

@Injectable()
export class Bark{
  constructor(
    public readonly sound:string
  ){}
  public equals(otherBark: Bark): boolean{
    return this.sound.toLowerCase() === otherBark.sound.toLowerCase();
  }

}

export class Remote{

}

@Injectable()
export class BarkRecogniser{
  constructor(
    private readonly door: DogDoor
  ){}

  public recognise(bark: Bark): boolean {
    console.log('bark recogniser is listening to the bark...');
    const allowedBarks = this.door.getAllowedBarks();
    for(let allowedBark of allowedBarks){
      if(allowedBark.equals(bark)){
        console.log('bark recognised ...');
        this.door.open();
        return true;
      }
    }
    console.log('bark not recognised ...');
    return false;
  }

}