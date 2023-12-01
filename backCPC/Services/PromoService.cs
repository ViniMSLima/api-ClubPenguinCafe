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
            Quantidade = data.Quantidade,
            ProdutoId = data.ProdutoId
        };

        this.ctx.Add(promo);
        await this.ctx.SaveChangesAsync();
    }


    public async Task<List<Promocao>> Get()
        => await this.ctx.Promocaos.ToListAsync();
   
    public async Task<Promocao> GetByName(string name)
    {
        var query =
            from u in this.ctx.Promocaos
            where u.Nome == name
            select u;
        
        return await query.FirstOrDefaultAsync();
    }
}
