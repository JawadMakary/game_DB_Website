import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,OnDestroy {
  public sort: any;
  public games:Game[] = []
  constructor(private httpService:HttpService,
    private activatedRoute:ActivatedRoute,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params) => {
    if(params['game-search']){
      this.searchGames('metacrit',params['game-search'])
    }else{
      this.searchGames('metacrit')
    }

    });
  }

  searchGames(sort:string,search?:string):void{
    this.httpService.getGameList(sort,search).subscribe((data:any) => {
      this.games = data.results
      this.sort = sort
      console.log(this.games)

    }
    )



}
openGameDetails(id:string):void{
  this.router.navigate(['/details',id])
}

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  if(this.games){
    this.games = []
  }




}}