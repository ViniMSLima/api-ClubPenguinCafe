using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backCPC.Services;

using System.Collections.Generic;
using DTO;
using Model;

public class PromoService : IPromoService
{
    ClubPenguinDbContext ctx;
    public PromoService(ClubPenguinDbContext ctx)
    {
        this.ctx = ctx;
    }

    public async Task Create(PromoData data)
    {
        Promocao promo = new()
        {
            Nome = data.Nome,
            Preco = data.Preco,
            Descricao = data.Descricao,
            Quantidade = 1,
            ProdutoId = data.ProdutoId
        };

        this.ctx.Add(promo);
        await this.ctx.SaveChangesAsync();
    }

    public Task<Promocao> GetByName(string Nome)
    {
        throw new System.NotImplementedException();
    }

    public async Task<List<PromoProdData>> Get() 
    {
        var query =
            from prod in this.ctx.Produtos
            join promo in this.ctx.Promocaos
            on prod.Id equals promo.ProdutoId
            select new PromoProdData
            {
                ProdutoId = prod.Id,
                Nome =  prod.Nome,
                Descricao = promo.Descricao,
                Preco = promo.Preco
            };
        
        return await query.ToListAsync();
    }
}
