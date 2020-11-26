import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }

}
