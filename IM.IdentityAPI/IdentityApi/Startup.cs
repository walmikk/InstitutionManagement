using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityApi.Infrastructure;
using IdentityApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;

namespace IdentityApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<IdentityDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("IdentityConnection"));
            });

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins, config =>
                {
                    config.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            services.AddScoped<IIdentityManager, IdentityManager>();

            services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1", new Info
                {
                    Title = "Identity API",
                    Version = "1.0",
                    Contact = new Contact { Name = "Walmik and Vivek", Email = "vivek151189@gmail.com" },
                    Description = "This api gives the function for addinfg, query, updating and delete events"
                });
            });
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



            app.UseSwagger();
            app.UseSwaggerUI(option =>
            {

                option.RoutePrefix = "";
                option.SwaggerEndpoint("/swagger/v1/swagger.json", "Identity API");

            });

            app.UseCors(MyAllowSpecificOrigins);

            app.UseMvc();
        }

        /// <summary>
        /// Initialize database at first
        /// </summary>
        /// <param name="app"></param>
        private void InitializeDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {

                var database = serviceScope.ServiceProvider.GetService<IdentityDbContext>().Database;
                database.Migrate();
            }
        }
    }
}
