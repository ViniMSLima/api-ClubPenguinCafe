using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backCPC.Services;

using System;
using System.Collections.Generic;
using DTO;
using Model;
using Swashbuckle.AspNetCore.SwaggerGen;

public class PromoService : IProductService
{
    ClubPenguinDbContext ctx;
    public PromoService(ClubPenguinDbContext ctx)
    {
        this.ctx = ctx;
    }

    public async Task Create(ProductData data)
    {
        Promocao promo = new()
        {
            Nome = data.Nome,
            Preco = data.Preco,
            Descricao = data.Descricao,
            Quantidade = (int) data.Quantidade
        };

        this.ctx.Add(promo);
        await this.ctx.SaveChangesAsync();
    }
    
    public async Task<List<Produto>> Get()
        => await this.ctx.Produtos.ToListAsync();
   
    public async Task<Produto> GetByName(string name)
    {
        var query =
            from u in this.ctx.Produtos
            where u.Nome == name
            select u;
        
        return await query.FirstOrDefaultAsync();
    }

}
