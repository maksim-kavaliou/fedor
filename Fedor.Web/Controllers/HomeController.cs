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

        [ChildActionOnly]
        public PartialViewResult Main()
        {
            return PartialView();
        }

        [ChildActionOnly]
        public PartialViewResult Gallery()
        {
            return PartialView();
        }
    }
}
