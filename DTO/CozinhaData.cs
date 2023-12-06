using System;

namespace DTO;

public class CozinhaData
{
    public int OrderId { get; set; }
    public string[] Produto { get; set; }
    public int[] Quantidade  { get; set; }
    public bool Pronto { get; set; }
    public bool Entregue { get; set; }
}