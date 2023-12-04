using System;
using System.Collections.Generic;

namespace backCPC.Model;

public partial class Promocao
{
    public int Id { get; set; }

    public int? ProdutoId { get; set; }

    public double Preco { get; set; }

    public string Descricao { get; set; }

    public string Nome { get; set; }

    public int Quantidade { get; set; }

    public virtual Produto Produto { get; set; }
}
