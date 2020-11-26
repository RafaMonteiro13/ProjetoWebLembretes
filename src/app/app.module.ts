import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { LembreteInserirComponent } from './lembrete/lembrete-inserir/lembrete-inserir.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { LembreteListaComponent } from './lembrete/lembrete-lista/lembrete-lista.component';
import { HttpClientModule } from '@angular/common/http';

// Imports angular material
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LembreteService } from './lembrete/lembrete.service';
import { AppRoutingModule } from './app-routing.model';
import { FirebaseService } from './services/firebase.service';


@NgModule({
  declarations: [
    AppComponent,
    LembreteInserirComponent,
    CabecalhoComponent,
    LembreteListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBEHWwY8ROZYwKdJGGv3Ff1_mfBwMhEvuw",
      authDomain: "fir-angular-auth-642ae.firebaseapp.com",
      databaseURL: "https://fir-angular-auth-642ae.firebaseio.com",
      projectId: "fir-angular-auth-642ae",
      storageBucket: "fir-angular-auth-642ae.appspot.com",
      messagingSenderId: "1028129472874",
      appId: "1:1028129472874:web:6defcf7ec2ee5e3dc9e513"
    })
  ],
  providers: [LembreteService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
