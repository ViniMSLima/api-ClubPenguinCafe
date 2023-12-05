using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backCPC.Controllers;

using DTO;
using Model;
using backCPC.Services;
using System.Security.Cryptography;
using Trevisharp.Security.Jwt;
using System.ComponentModel;

[ApiController]
[Route("pedido")]
public class PedidoController : ControllerBase
{
    [HttpPost("register")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Create(
        [FromBody] TipoEspecial[] carrinho,
        [FromServices]IPedidoService service)
    {
        var errors = new List<string>();

        if (errors.Count > 0)
            return BadRequest(errors);

        var id = await service.Create(carrinho[0].Total);

        foreach(TipoEspecial p in carrinho)
        {
            await service.CreateProdutoPedido(p, id);
        }

        return Ok();
    }

    [HttpGet("")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Get(
        [FromServices]IPedidoService service)
    {
        var a = await service.Get();
        var errors = new List<string>();
        if (errors.Count > 0)
            return BadRequest(errors);

        return Ok(a);
    }

    [HttpDelete]
    [EnableCors("DefaultPolicy")]
    public IActionResult DeleteUser()
    {
        throw new NotImplementedException();
    }
}
