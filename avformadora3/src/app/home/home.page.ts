import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  studentName = 'Seu Nome';
  studentPhoto = 'link_para_a_foto_do_aluno';
  studentCode = '123456';

  constructor() {}
}
