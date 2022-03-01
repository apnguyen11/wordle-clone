using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace ReactWordle
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string connectionString = @"Server=(LocalDb)\WordleDBDemo;Database=WordleDB;User Id=Test;Password=Test123;";

            using(SqlConnection conn = new SqlConnection(connectionString))
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

                        Console.WriteLine(name + " " + password);
                    }
                    dr.Close();
                }
            }
            Console.ReadKey();
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
