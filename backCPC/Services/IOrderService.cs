using System.Threading.Tasks;

namespace backCPC.Services;

using System.Collections.Generic;
using DTO;
using Model;

public interface IOrderService
{
    Task Create();
    Task<Pedido> GetById(int id);
    Task<List<Pedido>> Get();
}