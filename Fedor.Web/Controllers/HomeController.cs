using System.Web.Mvc;

namespace Fedor.Web.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }

        [ChildActionOnly]
        public PartialViewResult About()
        {
            return PartialView();
        }

        [ChildActionOnly]
        public PartialViewResult Contacts()
        {
            return PartialView();
        }

        public ViewResult Gallery()
        {
            return View();
        }
    }
}
