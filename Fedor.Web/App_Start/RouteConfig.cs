﻿using System.Web.Mvc;
using System.Web.Routing;
using Fedor.Infrastructure;

namespace Fedor.Web
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
            if (RouteTable.Routes[DefaultRouteNames.Default] != null)
            {
                return;
            }

			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			routes.MapRoute(
				name: "Default",
				url: "{controller}/{action}/{id}",
				defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
			);
		}
	}
}