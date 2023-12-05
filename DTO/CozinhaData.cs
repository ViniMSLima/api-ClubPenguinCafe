using System;

namespace DTO;

public class CozinhaData
{
    public int OrderId { get; set; }
    public string[] Produto { get; set; }
    public int[] Quantidade  { get; set; }
}