using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.Data.SqlClient;
using System.Text.Json;
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

            //string connectionString = @"Server=(LocalDb)\WordleDBDemo;Database=WordleDB;User Id=Test;Password=Test123;";

            //using (SqlConnection conn = new SqlConnection(connectionString))
            //{
            //    conn.Open();
            //    using (SqlCommand cmd = new SqlCommand())
            //    {
            //        cmd.Connection = conn;
            //        cmd.CommandText = "SELECT * From users";

            //        SqlDataReader dr = cmd.ExecuteReader();

            //        while (dr.Read())
            //        {
            //            string name = dr["userName"].ToString();
            //            string password = dr["password"].ToString();
            //            firstName = name;
            //            Console.WriteLine(name + " " + password);
            //        }
            //        dr.Close();
            //    }
            //}

            string jsonObj = JsonSerializer.Serialize(payload);

            var user = JObject.Parse(jsonObj);

            return Ok(user);
        }

        class UserObj
        {
           
            public string? userName { get; set; }
            public string? password { get; set; }
        }

    }
}
