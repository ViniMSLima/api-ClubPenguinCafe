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
    Task<int[]> GetGrafico2x();
    Task<double[]> GetGrafico2y();
    Task<GraficoData> GetGrafico1();
    Task<GraficoData> GetGrafico2();
}