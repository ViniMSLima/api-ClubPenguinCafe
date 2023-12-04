using System.Threading.Tasks;

namespace backCPC.Services;

using System.Collections.Generic;
using DTO;
using Model;

public interface IPromoService
{
    Task Create(PromoData promo);
    Task<Promocao> GetByName(string Nome);
    Task<List<PromoProdData>> Get();
}