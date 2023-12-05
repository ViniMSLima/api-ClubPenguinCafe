using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backCPC.Services;

using System;
using System.Collections.Generic;
using DTO;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.Identity.Client;
using Model;
using Swashbuckle.AspNetCore.SwaggerGen;

public class PedidoService : IPedidoService
{
    ClubPenguinDbContext ctx;
    ISecurityService security;

    public string[] produtos;
    public int[] qtds;

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

        List<CozinhaData> pedidosCozinha = new();

        var query =
            from ped in ctx.Pedidos
            join prodPed in ctx.ProdutosPedidos
            on ped.Id equals prodPed.PedidoId
            join prod in ctx.Produtos
            on prodPed.ProdutoId equals prod.Id
            select new
            {
                PedidoId = ped.Id,
                ProdutoNome = prod.Nome,
                Quantidade = prodPed.Quantidade
            };
        
        var kk = await query.ToListAsync();
        var Nomes = kk.Select(x => x.ProdutoNome).ToArray();
        var Quantidade = kk.Select(x => x.Quantidade).ToArray();

        //testar lista de ids e for juntando todos q forem iguais

        // CozinhaData c = new()
        // {
        //     OrderId = pedido.Id,
        //     Produto = this.produtos,
        //     Quantidade = this.qtds
        // };
        // pedidosCozinha.Add(c);


        return pedidosCozinha;
    }

    public async Task<Pedido> GetById(int id)
    {
        var query =
            from u in this.ctx.Pedidos
            where u.Id == id
            select u;

        return await query.FirstOrDefaultAsync();
    }

}
