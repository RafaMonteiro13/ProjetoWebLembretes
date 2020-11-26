import { Injectable } from '@angular/core';
import { Lembrete } from './lembrete.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class LembreteService {

  private lembretes: Lembrete[] = [];
  private listaLembretesAtualizada = new Subject<Lembrete[]>();

  constructor(private HttpClient: HttpClient, private router: Router) {

  }

  getLembretes(): void {
    this.HttpClient.get<{mensagem: string, lembretes: any}>('http://localhost:3000/api/lembretes'
    )
      .pipe(map((dados) => {
        return dados.lembretes.map(lembr => {
          return {
            id: lembr._id,
            dataCadastro: lembr.dataCadastro,
            dataEntrega: lembr.dataEntrega,
            atividade: lembr.atividade
          }
        })
      }))
      .subscribe((lembretes) => {
          this.lembretes = lembretes;
          this.listaLembretesAtualizada.next([...this.lembretes])
        })
      }


  getListaDeLembretesAtualizadaObservable(){
    return this.listaLembretesAtualizada.asObservable();
  }

  adicionarLembrete(dataCadastro: string, dataEntrega: string, atividade: string) {
    const lembrete: Lembrete = {
      id: null,
      dataCadastro: dataCadastro,
      dataEntrega: dataEntrega,
      atividade: atividade
    }
    this.HttpClient.post<{mensagem: string, id: string}> ('http://localhost:3000/api/lembretes',
    lembrete).subscribe(
      (dados) => {
        lembrete.id = dados.id;
        this.lembretes.push(lembrete);
        this.listaLembretesAtualizada.next([...this.lembretes]);
        this.router.navigate(['/']);
      }
    )
  }

  removerLembrete(id: string): void {
    this.HttpClient.delete(`http://localhost:3000/api/lembretes/${id}`).subscribe(() => {
      this.lembretes = this.lembretes.filter((lem) => {
        return lem.id !== id
      });
      this.listaLembretesAtualizada.next([...this.lembretes]);
    });
  }

  atualizarLembrete(id: string, dataCadastro: string, dataEntrega: string, atividade: string) {
    const lembrete: Lembrete = {id, dataCadastro, dataEntrega, atividade};
    let lembreteData: Lembrete | FormData;
    if(typeof(atividade) === "object"){
      lembreteData = new FormData();
      lembreteData.append("id",id);
      lembreteData.append("dataCadastro", dataCadastro);
      lembreteData.append("dataEntrega", dataEntrega);
      lembreteData.append("atividade", atividade);
    } 
    else{
      lembreteData = {
        id:id,
        dataCadastro:dataCadastro,
        dataEntrega:dataEntrega,
        atividade: atividade
      }
    }

    this.HttpClient.put(`http://localhost:3000/api/lembretes/${id}`, lembreteData)
    .subscribe((res => {
      const copia = [...this.lembretes];
      const indice = copia.findIndex(lem => lem.id === lembrete.id);
      const lembrete: Lembrete = {
        id:id,
        dataCadastro:dataCadastro,
        dataEntrega:dataEntrega,
        atividade: atividade
      }
      copia[indice] = lembrete;
      this.lembretes = copia;
      this.listaLembretesAtualizada.next([...this.lembretes]);
      this.router.navigate(['/'])
    }));
  }

  getLembrete(idLembrete: string) {
    //return {...this.lembretes.find((lem) => lem.id === idLembrete)};
    return this.HttpClient.get<{
      _id: string, dataCadastro: string, dataEntrega: string, atividade: string}>
    ('http://localhost:3000/api/lembretes/${idLembrete}');
  }
}
