import { Component, OnInit } from '@angular/core';
import { MenuTypeEnum } from 'src/app/shared/emuns/menu-type.enum';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.ondeEstou = MenuTypeEnum.RELATORIO_DESPESA;
  }

}
