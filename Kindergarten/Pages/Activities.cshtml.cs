using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Kindergarten.Pages
{
    public class ActivitiesModel : PageModel
    {
        private readonly ILogger<ActivitiesModel> _logger;

        public ActivitiesModel(ILogger<ActivitiesModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}