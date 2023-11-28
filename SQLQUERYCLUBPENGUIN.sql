use master
go

if exists(select * from sys.databases where name = 'ClubPenguinDB')
	drop database ClubPenguinDB
go

create database ClubPenguinDB
go

use ClubPenguinDB
go

create table Imagem(
	ID int identity primary key,
	Foto varbinary(MAX) not null
);
go

create table Usuario(
	ID int identity primary key,
	Nome varchar(80) not null,
	Senha varchar(MAX) not null,
	Salt varchar(200) not null,
	ImagemID int references Imagem(ID),
	IsAdm bit not null 
);
go

create table Produto(
	ID int identity primary key,
	ImagemID int references Imagem(ID) not null,
	Nome varchar(40),
	Preco float,
	Descricao varchar(MAX)
);
go

create table Pedido(
	ID int identity primary key,
);
go

create table ProdutosPedidos(
	ID int identity primary key,
	ProdutoID int references Produto(ID),
	PedidoID int references Pedido(ID)
);
go

create table Promocao(
	ID int identity primary key,
	ProdutoID int references Produto(ID)
);
go
