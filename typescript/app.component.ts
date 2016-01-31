import {Component, OnInit} from 'angular2/core';

import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';

import {Message} from './message';
import {MessageDetailComponent} from './message-detail.component';
import {RSA} from './rsa';
import {RSADetailComponent} from './rsa-detail.component';

@Component({
  selector: 'my-app',
  templateUrl: '../html/app.html',
  styleUrls: ['../css/app.css'],
  directives: [
      MessageDetailComponent, 
      RSADetailComponent
      ],
  providers: [HeroService]
})

export class AppComponent implements OnInit {
  public title:string = 'Tour of Heroes';
  public heroes: Hero[];
  public selectedHero: Hero;
  
  public message: Message;
  public rsa: RSA;
  
  
  constructor(private _heroService: HeroService) { }
  
  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  
  ngOnInit() {
    this.getHeroes();
    this.rsa = new RSA();
    this.message = new Message(this.rsa);

  }
  
  onSelect(hero: Hero) { this.selectedHero = hero; }
}
