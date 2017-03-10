using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataBaseModel.Abstract;
using DataBaseModel.AllEntity.UserInfo;
using DataBaseModel.Concrete;

namespace WebUI.Controllers
{
    public class DefaultController : Controller
    {
        // GET: Default
        public ActionResult Index()
        {
            EcomerceDBContext db = new EcomerceDBContext();
            var the= db.UserSummarys.ToList();

            

            return View(the);
        }
    }
}