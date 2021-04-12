import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { PessoaService } from '../services/pessoa.service';
import { Pessoa } from '../models/pessoa';
import { NgForm, FormsModule } from '@angular/forms';
import { formatDate, DatePipe  } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pessoa = {} as Pessoa;
  pessoas: Pessoa[] | undefined;

  constructor(private pessoaService: PessoaService, public datepipe: DatePipe) {  }

  ngOnInit() {
    this.getPessoas();
  }

  // defini se um pessoaro será criado ou atualizado
  savePessoa(form: NgForm) {
    this.pessoa.dataNascimento = this.datepipe.transform(this.pessoa.dataNascimento, 'yyyy/MM/dd') || '';
    console.log(this.pessoa);
    if (this.pessoa.id !== undefined) {
      this.pessoaService.updatePessoa(this.pessoa).subscribe(() => {
        this.cleanForm(form);
        alert(`Alterado com Sucesso!`);
      });
    } else {
      this.pessoaService.salvarPessoa(this.pessoa).subscribe(() => {
        this.cleanForm(form);
        alert(`Salvo com Sucesso!`);
      });
    }
  }

  // Chama o serviço para obtém todos os pessoaros
  getPessoas() {
    this.pessoaService.getPessoas().subscribe((pessoas: Pessoa[]) => {
      console.log(pessoas);
      this.pessoas = pessoas;
    });
  }

  // deleta um pessoaro
  deletarPessoa(pessoa: Pessoa) {
    this.pessoaService.deletarPessoa(pessoa).subscribe(() => {
      alert(`${pessoa.nome} foi Excluída!`);
      this.getPessoas();
    });
  }

  // copia a pessoa para ser editado.
  editarPessoa(pessoa: Pessoa) {
    const format = 'yyyy-MM-dd';
    const locale = 'en-BR';
    this.pessoa.id = pessoa.id;
    this.pessoa.nome = pessoa.nome;
    this.pessoa.sexo = pessoa.sexo;
    console.log(pessoa.sexo);
    this.pessoa.email = pessoa.email;
    this.pessoa.dataNascimento = formatDate(pessoa.dataNascimento, format,locale);
    // this.pessoa.dataNascimento = pessoa.dataNascimento;
    this.pessoa.naturalidade = pessoa.naturalidade;
    this.pessoa.cpf = pessoa.cpf;
    this.pessoa.nacionalidade = pessoa.nacionalidade;

  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getPessoas();
    form.resetForm();
    this.pessoa = {} as Pessoa;
  }

}