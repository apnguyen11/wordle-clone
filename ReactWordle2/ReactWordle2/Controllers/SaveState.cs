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
    public class SaveState : Controller
    {
        [HttpPost]
        public IActionResult Post(JObject payload)
        {

            string jsonObj = payload.ToString(Newtonsoft.Json.Formatting.None);

            dynamic userObj = JObject.Parse(jsonObj);

            string connectionString = @"Server=(LocalDb)\WordleDBDemo;Database=WordleDB;User Id=Test;Password=Password123!;";
            string query = "SELECT * From gameStates WHERE userId = '" + userObj.userId + "' and date = '" + userObj.date + "'";
            SqlDataAdapter sda = new SqlDataAdapter(query, connectionString);
            DataTable dtbl = new DataTable();
            sda.Fill(dtbl);
            if (dtbl.Rows.Count == 1)
            {
                return Ok("Sorry you can only play once!");
            }
            else
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string registerQuery = "INSERT INTO gameStates (guesses, score, date, userId) VALUES (@guesses, @score, @date, @userId)";

                    using (SqlCommand command = new SqlCommand(registerQuery, connection))
                    {
                        command.Parameters.Add("@guesses", SqlDbType.NChar).Value = userObj.guesses;
                        command.Parameters.Add("@score", SqlDbType.NChar).Value = userObj.score;
                        command.Parameters.Add("@date", SqlDbType.NChar).Value = userObj.date;
                        command.Parameters.Add("@userId", SqlDbType.NChar).Value = userObj.userId;
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

            public string? guesses { get; set; }
            public string? score { get; set; }
            public string? date { get; set; }
            public string? userId { get; set; }
        }
    }
}
