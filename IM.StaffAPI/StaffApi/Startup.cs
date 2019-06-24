using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using StaffApi.Infrastructure;
using StaffApi.Model;
using StaffApi.Repositories;
using Swashbuckle.AspNetCore.Swagger;

namespace StaffApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<StaffDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("SqlConnection"));
            });
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(config => {
                    config.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });

            services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1", new Info
                {
                    Title = "Staff Management API",
                    Version = "1.0",
                    Contact = new Contact { Name = "Walmik & Vivek", Email = "vivek151189@gmail.com" },
                    Description = "This api gives the function for addinfg, query, updating and delete staff"
                });
            });

            services.AddScoped<IStaffRepository<StaffData>, StaffRepository<StaffData>>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            InitializeDatabase(app);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors();
            app.UseSwagger();
            app.UseSwaggerUI(option => {

                option.SwaggerEndpoint("/swagger/v1/swagger.json", "Staff management API");
                option.RoutePrefix = "";
            });
            app.UseMvc();
        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {

                var database = serviceScope.ServiceProvider.GetService<StaffDbContext>().Database;
                database.Migrate();
            }
        }
    }
}
