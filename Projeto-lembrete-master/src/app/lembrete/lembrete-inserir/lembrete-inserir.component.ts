import { formatNumber } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { from } from 'rxjs';
import { Lembrete } from '../lembrete.model';
import { LembreteService } from '../lembrete.service';

@Component({
  selector:'app-lembrete-inserir',
  templateUrl: './lembrete-inserir.component.html',
  styleUrls: ['./lembrete-inserir.component.css'],
})

export class LembreteInserirComponent implements OnInit{

  private modo: string = "criar";
  private idLembrete: string;
  public lembrete: Lembrete;
  public estaCarregando: boolean = false;
  public form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      dataCadastro: new FormControl(null,{validators:
      [Validators.required,Validators.minLength(3)]}),
      
    })





    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLembrete")) {
        this.modo = "editar";
        this.idLembrete = paramMap.get("idLembrete");
        this.estaCarregando = true;
        this.lembreteService.getLembrete(this.idLembrete).subscribe(dadosLem => {
          this.estaCarregando = false;
          this.lembrete = {
            id: dadosLem._id,
            dataCadastro: dadosLem.dataCadastro,
            dataEntrega: dadosLem.dataEntrega,
            atividade: dadosLem.atividade
          };
          this.form.setValue({
            dataCadastro: this.lembrete.dataCadastro,
            dataEntrega: this.lembrete.dataEntrega,
            atividade: this.lembrete.atividade
          })

          console.log(this.form);
        });
      }
      else {
        this.modo = "criar";
        this.idLembrete = null;
      }
    });
  }

  constructor(public lembreteService: LembreteService, public route: ActivatedRoute){}

  onSalvarLembrete() {

    if(this.form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if(this.modo === "criar") {
      this.lembreteService.adicionarLembrete(
        this.form.value.dataCadastro,
        this.form.value.dataEntrega,
        this.form.value.atividade
      )
    }
    else {
      this.lembreteService.atualizarLembrete(
        this.idLembrete,
        this.form.value.dataCadastro,
        this.form.value.dataEntrega,
        this.form.value.atividades
      )
    }

    this.form.reset();
  }
}
