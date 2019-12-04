using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Kindergarten.Pages
{
    public class ReceptionModel : PageModel
    {
        private readonly ILogger<ReceptionModel> _logger;

        public ReceptionModel(ILogger<ReceptionModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}