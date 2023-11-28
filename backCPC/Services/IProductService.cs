using System.Threading.Tasks;

namespace backCPC.Services;

using DTO;
using Model;

public interface IProductService
{
    Task Create(ProductData product);
    Task<Produto> GetByName(string Nome);
}