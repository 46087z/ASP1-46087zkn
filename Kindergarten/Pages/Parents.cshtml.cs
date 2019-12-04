using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Kindergarten.Pages
{
    public class ParentsModel : PageModel
    {
        private readonly ILogger<ParentsModel> _logger;

        public ParentsModel(ILogger<ParentsModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}