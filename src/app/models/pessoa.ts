import { NumberSymbol } from "@angular/common";

export interface Pessoa {
    id: number;
    nome: string;
    sexo: number;
    email: string;
    dataNascimento: string;
    naturalidade: string;
    nacionalidade: string;
    cpf: string;
    dataCriacao: Date;
}
