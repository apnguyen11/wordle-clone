using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace ReactWordle2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        public static string firstName;
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
  
            string connectionString = @"Server=(LocalDb)\WordleDBDemo;Database=WordleDB;User Id=Test;Password=Test123;";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = "SELECT * From users";

                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        string name = dr["userName"].ToString();
                        string password = dr["password"].ToString();
                        firstName = name;
                        Console.WriteLine(name + " " + password);
                    }
                    dr.Close();
                }
            }
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {

                Date = DateTime.Now.AddDays(index),
               
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = firstName
                /*Summary = Summaries[Random.Shared.Next(Summaries.Length)]*/
            })
            .ToArray();
        }
    }
}