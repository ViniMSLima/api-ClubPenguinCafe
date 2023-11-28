using System;
using System.Collections.Generic;

namespace backCPC.Model;

public partial class Imagem
{
    public int Id { get; set; }

    public byte[] Foto { get; set; }

    public virtual ICollection<Produto> Produtos { get; } = new List<Produto>();

    public virtual ICollection<Usuario> Usuarios { get; } = new List<Usuario>();
}
