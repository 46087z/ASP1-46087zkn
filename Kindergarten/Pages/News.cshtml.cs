using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Kindergarten.Pages
{
    public class NewsModel : PageModel
    {
        private readonly ILogger<NewsModel> _logger;

        public NewsModel(ILogger<NewsModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}