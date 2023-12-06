using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backCPC.Services;

using System;
using System.Collections.Generic;
using DTO;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.Identity.Client;
using Model;
using Swashbuckle.AspNetCore.SwaggerGen;

public class PedidoService : IPedidoService
{
    ClubPenguinDbContext ctx;
    ISecurityService security;

    public string[] produtos;
    public int[] qtds;
    public int[] ids;

    public PedidoService(ClubPenguinDbContext ctx, ISecurityService security)
    {
        this.ctx = ctx;
        this.security = security;
    }

    public async Task<int> Create(double Total)
    {
        Pedido pedido = new()
        {
            Pronto = false,
            Entregue = false,
            Preco = Total
        };

        this.ctx.Add(pedido);
        await this.ctx.SaveChangesAsync();

        var lista = this.ctx.Pedidos.ToList();
        int id = lista[^1].Id;
        return id;
    }

    public async Task CreateProdutoPedido(TipoEspecial produto, int idPedido)
    {
        ProdutosPedido produtoPedido = new()
        {
            ProdutoId = produto.Id,
            PedidoId = idPedido,
            Quantidade = produto.Quantidade
        };

        this.ctx.Add(produtoPedido);
        await this.ctx.SaveChangesAsync();
    }

    public async Task<List<CozinhaData>> Get()
    {
        var query1 =
            from produtosPedidos in this.ctx.ProdutosPedidos
            join prod in this.ctx.Produtos
                on produtosPedidos.ProdutoId equals prod.Id into ppj
            from pp in ppj.DefaultIfEmpty()
            group produtosPedidos by produtosPedidos.PedidoId into grouped
            select new {
                OrderId = grouped.Key,
            };

        var query777777 =
            from ped in this.ctx.Pedidos
            join prodPed in this.ctx.ProdutosPedidos
                on ped.Id equals prodPed.PedidoId
            join prod in this.ctx.Produtos
                on prodPed.ProdutoId equals prod.Id
            select new
            {
                OrderId = ped.Id,
                ProdName = prod.Nome,
                Quantidade = prodPed.Quantidade
            };

        var a = await query777777.ToListAsync();

        var orders = 
            from peds in a
            group peds by peds.OrderId into grouped
            select new {
                OrderId = grouped.Key
            };

        var c = orders.ToList();


        System.Console.WriteLine(a[0].OrderId);

        List<CozinhaData> list = new();

        foreach (var item in c)
        {
            var query = 
                from member in a
                where member.OrderId == item.OrderId
                select new {
                    Nome = member.ProdName,
                    Quantidade = member.Quantidade
                };

            var b = query.ToList();
            string[] Nomes = b.Select(x=>x.Nome).ToArray();
            int[] qtds = b.Select(x=>x.Quantidade).ToArray();

            CozinhaData kd = new()
            {
                OrderId = item.OrderId,
                Produto = Nomes,
                Quantidade = qtds
            };
            list.Add(kd);
        }
        return list;
    }
}
