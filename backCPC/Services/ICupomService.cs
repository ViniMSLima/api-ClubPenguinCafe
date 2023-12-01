using System.Threading.Tasks;

namespace backCPC.Services;

using System.Collections.Generic;
using DTO;
using Model;

public interface ICupomService
{
    Task Create(CupomData cupom);
    Task<Cupom> GetByCodigo(CupomData cupom);
    Task<List<Cupom>> Get();
}