using System;
using System.Collections.Generic;

namespace backCPC.Model;

public partial class Cupom
{
    public int Id { get; set; }

    public string Codigo { get; set; }

    public double Desconto { get; set; }
}
