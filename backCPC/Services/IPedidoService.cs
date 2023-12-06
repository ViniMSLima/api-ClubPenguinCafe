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
    Task Finalizar(int pedido_id);
    Task Entregar(int pedido_id);
    Task<string[]> GetGrafico1x();
    Task<int[]> GetGrafico1y();
    Task<string[]> GetGrafico2x();
    Task<string[]> GetGrafico2y();
}