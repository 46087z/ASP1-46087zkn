using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Kindergarten.Pages
{
    public class FriendsModel : PageModel
    {
        private readonly ILogger<FriendsModel> _logger;

        public FriendsModel(ILogger<FriendsModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}