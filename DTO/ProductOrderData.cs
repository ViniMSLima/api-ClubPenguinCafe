using System;

namespace DTO;

public class ProductOrderData
{
    public int OrderId { get; set; }
    public string Nome { get; set; }
    public double Preco { get; set; }
    public string Descricao  { get; set; }
    public double Quantidade { get; set; }
}