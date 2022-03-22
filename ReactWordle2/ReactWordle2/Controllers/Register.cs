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
    public class Register : Controller
    {
        [HttpPost]
        public IActionResult Post(JObject payload)
        {
          
            string jsonObj = payload.ToString(Newtonsoft.Json.Formatting.None);

            dynamic userObj = JObject.Parse(jsonObj);

            string connectionString = @"Server=(LocalDb)\WordleDBDemo;Database=WordleDB;User Id=Test;Password=Test123;";
            string query = "SELECT * From users WHERE userName = '" + userObj.userName + "'";
            SqlDataAdapter sda = new SqlDataAdapter(query, connectionString);
            DataTable dtbl = new DataTable();
            sda.Fill(dtbl);
            if (dtbl.Rows.Count == 1)
            {
                return Ok("Sorry that user already exists!!");
            }
            else
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string registerQuery = "INSERT INTO users (userName, password) VALUES (@userName, @password)";

                    using (SqlCommand command = new SqlCommand(registerQuery, connection))
                    {
                        command.Parameters.Add("@userName", SqlDbType.NChar).Value = userObj.userName;
                        command.Parameters.Add("@password", SqlDbType.NChar).Value = userObj.password;
                        connection.Open();
                        int result = command.ExecuteNonQuery();

                        // Check Error
                        if (result < 0)
                            Console.WriteLine("Error inserting data into Database!");
                    }
                }



                
    
                return Ok("You can register this user");
            }


        }

        class UserObj
        {

            public string? userName { get; set; }
            public string? password { get; set; }
        }
    }
}
