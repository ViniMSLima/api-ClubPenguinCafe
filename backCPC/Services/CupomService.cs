using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backCPC.Services;

using System;
using System.Collections.Generic;
using DTO;
using Model;
using Swashbuckle.AspNetCore.SwaggerGen;

public class CupomService : ICupomService
{
    ClubPenguinDbContext ctx;
    public CupomService(ClubPenguinDbContext ctx)
    {
        this.ctx = ctx;
    }

    public async Task Create(CupomData data)
    {
        Cupom cupom = new()
        {
            Codigo = data.Codigo,
            Desconto = data.Desconto
        };

        this.ctx.Add(cupom);
        await this.ctx.SaveChangesAsync();
    }

    public async Task<List<Cupom>> Get()
    => await this.ctx.Cupoms.ToListAsync();

    public async Task<Cupom> GetByCodigo(string Codigo)
    {
        var query =
            from u in this.ctx.Cupoms
            where u.Codigo == Codigo
            select u;
        
        return await query.FirstOrDefaultAsync();
    }
}
