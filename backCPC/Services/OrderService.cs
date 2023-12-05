using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backCPC.Services;

using System;
using System.Collections.Generic;
using DTO;
using Model;
using Swashbuckle.AspNetCore.SwaggerGen;

public class OrderService : IOrderService
{
    ClubPenguinDbContext ctx;
    ISecurityService security;
    public OrderService(ClubPenguinDbContext ctx, ISecurityService security)
    {
        this.ctx = ctx;
        this.security = security;
    }

    public async Task Create()
    {
        Pedido pedido = new()
        {
            Pronto = false,
            Entregue = false
        };

        this.ctx.Add(pedido);
        await this.ctx.SaveChangesAsync();

        // var a = this.ctx.Pedidos.CountAsync();
    }

    


    public async Task<List<Pedido>> Get()
        => await this.ctx.Pedidos.ToListAsync();
   
    public async Task<Pedido> GetById(int id)
    {
        var query =
            from u in this.ctx.Pedidos
            where u.Id == id
            select u;
        
        return await query.FirstOrDefaultAsync();
    }

}
