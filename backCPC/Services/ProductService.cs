using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backCPC.Services;

using System.Collections.Generic;
using DTO;
using Model;

public class ProductService : IProductService
{
    ClubPenguinCafeDbContext ctx;
    ISecurityService security;
    public ProductService(ClubPenguinCafeDbContext ctx, ISecurityService security)
    {
        this.ctx = ctx;
        this.security = security;
    }

    public async Task Create(ProductData data)
    {
        Produto produto = new Produto();

        produto.Nome = data.Nome;
        produto.Preco = data.Preco;
        produto.Descricao = data.Descricao;

        this.ctx.Add(produto);
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
