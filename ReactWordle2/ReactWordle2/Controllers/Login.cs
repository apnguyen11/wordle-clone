using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.Data.SqlClient;
using System.Text.Json;
using System.Data;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace ReactWordle2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Login : ControllerBase
    {
        [HttpGet]

        public IActionResult Get()
        {
            return Ok("hello login");
        }


        [HttpPost]

        public IActionResult Post(JObject payload)
        {
            string jsonObj = payload.ToString(Newtonsoft.Json.Formatting.None);

            dynamic userObj = JObject.Parse(jsonObj);

            string connectionString = @"Server=(LocalDb)\WordleDBDemo;Database=WordleDB;User Id=Test;Password=Test123;";
            string query = "SELECT * From users WHERE userName = '" + userObj.userName + "' and password = '" + userObj.password + "'";
            SqlDataAdapter sda = new SqlDataAdapter(query, connectionString);
            DataTable dtbl = new DataTable();
            sda.Fill(dtbl);
            if(dtbl.Rows.Count == 1)
            {
                return Ok(userObj.userName);
            } else
            {
                return Ok("Password is wrong and username is wrong");
            }
  
        }

        class UserObj
        {
           
            public string? userName { get; set; }
            public string? password { get; set; }
        }

    }
}
