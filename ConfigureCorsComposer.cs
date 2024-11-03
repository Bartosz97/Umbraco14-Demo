using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Web.Common.ApplicationBuilder;

namespace Umbraco14;

public class ConfigureCorsComposer: IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        var corsSettings = builder.Config.GetSection("Cors").Get<CorsSettings>();
        var clientOrigins = new List<string>();

        if (corsSettings != null && !string.IsNullOrEmpty(corsSettings.ClientOrigins))
        {
            clientOrigins = corsSettings.ClientOrigins.Split(';').ToList();
        }
        
        builder.Services.AddCors(opt =>
            opt.AddPolicy("AllowClient", options => options
                .WithOrigins(clientOrigins.ToArray())
                .AllowAnyHeader()
                .WithMethods("GET", "POST")
            )
        );

        builder.Services.Configure<UmbracoPipelineOptions>(options => options.AddFilter(new CorsAllowAllPipelineFilter()));
    }
    
    private class CorsAllowAllPipelineFilter : UmbracoPipelineFilter
    {
        public CorsAllowAllPipelineFilter()
            : base(nameof(CorsAllowAllPipelineFilter)) =>
            PostRouting = app => app.UseCors("AllowClient");
    }
}