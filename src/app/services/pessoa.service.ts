import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  url = 'http://localhost:8080/pessoa';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }
  
  // Obtem todos as Pessoas
  getPessoas(): Observable<Pessoa[]> {
    
    return this.httpClient.get<Pessoa[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem uma pessoa pelo id
  getPessoaById(id: number): Observable<Pessoa> {
    return this.httpClient.get<Pessoa>(this.url + '/buscar-por-id/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva uma pessoa
  salvarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.httpClient.post<Pessoa>(this.url + '/inserir-novo', JSON.stringify(pessoa))
      .pipe(
        // retry(1),
        catchError(this.handleError)
      )
  }

  // utualiza uma pessoa
  updatePessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.httpClient.put<Pessoa>(this.url + '/alterar/' + pessoa.id, JSON.stringify(pessoa))
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta uma pessoa
  deletarPessoa(car: Pessoa) {
    return this.httpClient.delete<Pessoa>(this.url + '/remover/id/' + car.id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    let errorRetorno = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.error}`;
      errorRetorno = error.error;
    }
    console.log(errorMessage);
    alert(errorRetorno);
    return throwError(errorMessage);
  };
}
