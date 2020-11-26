import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Lembrete } from '../lembrete.model';
import { LembreteService } from '../lembrete.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-lembrete-lista',
  templateUrl: './lembrete-lista.component.html',
  styleUrls: ['./lembrete-lista.component.css']
})
export class LembreteListaComponent implements OnInit, OnDestroy {

  lembretes: Lembrete[] = []
  private lembretesSubscription: Subscription;
  public estaCarregando = false;

  constructor(public lembreteService: LembreteService) { }

  ngOnInit(): void {
    this.estaCarregando = true;
    this.lembreteService.getLembretes();
    this.lembretesSubscription = this.lembreteService
    .getListaDeLembretesAtualizadaObservable()
    .subscribe((lembretes: Lembrete[]) => {
      this.estaCarregando = false;
      this.lembretes = lembretes;
    })
  }

  ngOnDestroy(): void {
    this.lembretesSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.lembreteService.removerLembrete(id);
  }
}
