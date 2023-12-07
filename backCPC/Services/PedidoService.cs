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
using Microsoft.EntityFrameworkCore.Storage;
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

    private async Task<Pedido> getOrder(int order_id)
    {
        var orders = 
            from order in this.ctx.Pedidos
            where order.Id == order_id
            select order;

        return await orders.FirstOrDefaultAsync();
    }

    public async Task<List<CozinhaData>> Get()
    {
        var query1 =
            from ped in this.ctx.Pedidos
            join prodPed in this.ctx.ProdutosPedidos
                on ped.Id equals prodPed.PedidoId
            join prod in this.ctx.Produtos
                on prodPed.ProdutoId equals prod.Id
            select new
            {
                OrderId = ped.Id,
                ProdName = prod.Nome,
                Quantidade = prodPed.Quantidade,
                Pronto = ped.Pronto,
                Entregue = ped.Entregue
            };

        var a = await query1.ToListAsync();

        var orders = 
            from peds in a
            group peds by peds.OrderId into grouped
            select new {
                OrderId = grouped.Key
            };

        var c = orders.ToList();

        List<CozinhaData> list = new();

        foreach (var item in c)
        {
            var query2 = 
                from member in a
                where member.OrderId == item.OrderId
                select new {
                    Nome = member.ProdName,
                    Quantidade = member.Quantidade,
                    Pronto = member.Pronto,
                    Entregue = member.Entregue
                };

            var b = query2.ToList();

            string[] Nomes = b.Select(x=>x.Nome).ToArray();
            int[] qtds = b.Select(x=>x.Quantidade).ToArray();

            CozinhaData kd = new()
            {
                OrderId = item.OrderId,
                Produto = Nomes,
                Quantidade = qtds,
                Pronto = b[0].Pronto,
                Entregue = b[0].Entregue
            };
            list.Add(kd);
        }
        return list;
    }

    public async Task Finalizar(int pedido_id)
    {
        var pedido = await getOrder(pedido_id) ?? throw new Exception ("Pedido nao existe");
        pedido.Pronto = !pedido.Pronto;

        this.ctx.Update(pedido);
        await this.ctx.SaveChangesAsync();
    }

    public async Task Entregar(int pedido_id)
    {
        var pedido = await getOrder(pedido_id) ?? throw new Exception ("Pedido nao existe");
        pedido.Entregue = !pedido.Entregue;

        this.ctx.Update(pedido);
        await this.ctx.SaveChangesAsync();
    }

    public async Task<string[]> GetGrafico1x()
    {
        var query = from pedido in this.ctx.Pedidos
            join produtosPedidos in this.ctx.ProdutosPedidos on pedido.Id equals produtosPedidos.PedidoId
            join produto in this.ctx.Produtos on produtosPedidos.ProdutoId equals produto.Id into produtosGroup
            from produto in produtosGroup.DefaultIfEmpty()
            group produtosPedidos by new { produto.Nome } into produtoGroup
            select new 
            {
                Data1 = produtoGroup.Key.Nome,
                Data2 = produtoGroup.Sum(x => x.Quantidade)
            };

        var a = query.ToList();

        string[] produtos = a.Select(x=>x.Data1).ToArray();

        return produtos;
    }

    public async Task<int[]> GetGrafico1y()
    {
        var query = from pedido in this.ctx.Pedidos
            join produtosPedidos in this.ctx.ProdutosPedidos on pedido.Id equals produtosPedidos.PedidoId
            join produto in this.ctx.Produtos on produtosPedidos.ProdutoId equals produto.Id into produtosGroup
            from produto in produtosGroup.DefaultIfEmpty()
            group produtosPedidos by new { produto.Nome } into produtoGroup
            select new 
            {
                Data1 = produtoGroup.Key.Nome,
                Data2 = produtoGroup.Sum(x => x.Quantidade)
            };

        var a = query.ToList();

        int[] quantidades = a.Select(x=>x.Data2).ToArray();

        return quantidades;
    }

    public async Task<int[]> GetGrafico2x()
    {
        var query = 
            from pedido in this.ctx.Pedidos
            select pedido.Id; 

        var a = query.ToArray();

        return a;
    }

    public async Task<double[]> GetGrafico2y()
{
    var query = 
        from pedido in this.ctx.Pedidos
        select pedido.Preco; 
            
    var a = query.ToArray();

    var b = a.Select(x => x.Value).ToArray();

    return b;
}

}
