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
[Route("order")]
public class OrderController : ControllerBase
{
    [HttpPost("register")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Create(
        [FromServices]IOrderService service)
    {
        var errors = new List<string>();

        if (errors.Count > 0)
            return BadRequest(errors);

        await service.Create();
        return Ok();
    }

    [HttpGet("")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Get(
        [FromServices]IOrderService service)
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
