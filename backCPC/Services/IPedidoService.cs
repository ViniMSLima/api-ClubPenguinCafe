using System.Threading.Tasks;

namespace backCPC.Services;

using System.Collections.Generic;
using DTO;
using Model;

public interface IPedidoService
{
    Task<int> Create(double Total);
    Task<List<CozinhaData>> Get();
    Task CreateProdutoPedido(TipoEspecial produto, int pedidoId);
}