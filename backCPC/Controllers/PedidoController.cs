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
        [FromServices] IPedidoService service)
    {
        var errors = new List<string>();

        if (errors.Count > 0)
            return BadRequest(errors);

        var id = await service.Create(carrinho[0].Total);

        foreach (TipoEspecial p in carrinho)
        {
            await service.CreateProdutoPedido(p, id);
        }

        return Ok();
    }

    [HttpGet("")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Get(
        [FromServices] IPedidoService service)
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

    [HttpPost("pronto")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetPronto(
        [FromServices] IPedidoService service,
        [FromBody] int pedido_id)
    {
        await service.Finalizar(pedido_id);
        var errors = new List<string>();
        if (errors.Count > 0)
            return BadRequest(errors);

        return Ok();
    }

    [HttpPost("entregue")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetEntregue(
        [FromServices] IPedidoService service,
        [FromBody] int pedido_id)
    {
        await service.Entregar(pedido_id);
        var errors = new List<string>();
        if (errors.Count > 0)
            return BadRequest(errors);

        return Ok();
    }

    [HttpGet("grafico2x")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetGrafico2x(
       [FromServices] IPedidoService service)
    {
        var a = await service.GetGrafico2x();
        var errors = new List<string>();
        if (errors.Count > 0)
            return BadRequest(errors);

        return Ok(a);
    }

    [HttpGet("grafico2y")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetGrafico2y(
        [FromServices] IPedidoService service)
    {
        var a = await service.GetGrafico2y();
        var errors = new List<string>();
        if (errors.Count > 0)
            return BadRequest(errors);

        return Ok(a);
    }

    [HttpGet("grafico1")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetGrafico1(
        [FromServices] IPedidoService service)
    {
        var a = await service.GetGrafico1();
        var errors = new List<string>();
        if (errors.Count > 0)
            return BadRequest(errors);

        return Ok(a);
    }

    [HttpGet("grafico2")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetGrafico2(
            [FromServices] IPedidoService service)
    {
        var a = await service.GetGrafico2();
        var errors = new List<string>();
        if (errors.Count > 0)
            return BadRequest(errors);

        return Ok(a);
    }

}
