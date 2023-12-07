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
[Route("cupom")]
public class CupomController : ControllerBase
{
    [HttpPost("register")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Create(
        [FromBody]CupomData cupom,
        [FromServices]ICupomService service)
    {
        var errors = new List<string>();
        if (cupom is null)
            errors.Add("É necessário informar um Nome.");

        if (errors.Count > 0)
            return BadRequest(errors);

        await service.Create(cupom);
        return Ok();
    }

    [HttpGet()]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Get(
        [FromServices]ICupomService service)
    {
        var a = await service.Get();
        var errors = new List<string>();
        if (errors.Count > 0)
            return BadRequest(errors);

        return Ok(a);
    }

    [HttpPost("getdesconto")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetByCode(
        [FromServices]ICupomService service, [FromBody]CupomData cupom)
    {
        var a = await service.GetByCodigo(cupom);
        if(a == null)
            return Ok(0);

        var desconto = a.Desconto;
        var errors = new List<string>();
        if (errors.Count > 0)
            return BadRequest(errors);

        return Ok(desconto);
    }

    [HttpDelete]
    [EnableCors("DefaultPolicy")]
    public IActionResult DeleteUser()
    {
        throw new NotImplementedException();
    }

}