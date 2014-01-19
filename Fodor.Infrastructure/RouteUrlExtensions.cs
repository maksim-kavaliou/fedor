using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;

namespace Fedor.Infrastructure
{
    public static class RouteUrlExtensions
    {
        public static string Route(this UrlHelper urlHelper, string action, string controller, RouteValueDictionary values = null)
        {
            return urlHelper.Route(DefaultRouteNames.Default, action, controller, values);
        }

        public static string Route(this UrlHelper urlHelper, string route, string action, string controller, RouteValueDictionary values = null)
        {
            // earlier there was the explicit Merge call, but the current version of ASP.Net seems to do it automatically
            var routes = values ?? new RouteValueDictionary();

            // ignore null values
            foreach (var r in routes.Where(r => r.Value == null).ToList())
            {
                routes.Remove(r.Key);
            }

            routes[RouteKeys.Controller] = controller;
            routes[RouteKeys.Action] = action;

            var url = urlHelper.RouteUrl(route, routes);

            if (url == null)
            {
                throw new Exception(string.Format("Can not generate the route for the action {0} and controller {1}.", action, controller));
            }

            return url;
        }

        public static string NoCacheRoute(this UrlHelper urlHelper, string route, string action, string controller, RouteValueDictionary values = null)
        {
            var version = new Random().Next();

            if (values == null)
            {
                values = new RouteValueDictionary();
            }

            values.Add(string.Format("version{0}", version), version);

            return urlHelper.Route(route, action, controller, values);
        }

        public static string ToAbsolute(this UrlHelper urlHelper, string relativeUrl)
        {
            string absoluteAction = string.Format("{0}{1}", urlHelper.RequestContext.HttpContext.Request.Url.GetLeftPart(UriPartial.Authority), relativeUrl);

            return absoluteAction;
        }
    }
}
