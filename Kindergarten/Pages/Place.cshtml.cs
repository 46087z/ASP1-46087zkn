using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Kindergarten.Pages
{
    public class PlaceModel : PageModel
    {
        private readonly ILogger<PlaceModel> _logger;

        public PlaceModel(ILogger<PlaceModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}