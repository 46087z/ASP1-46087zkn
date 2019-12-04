using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Kindergarten.Pages
{
    public class ForgotModel : PageModel
    {
        private readonly ILogger<ForgotModel> _logger;

        public ForgotModel(ILogger<ForgotModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}