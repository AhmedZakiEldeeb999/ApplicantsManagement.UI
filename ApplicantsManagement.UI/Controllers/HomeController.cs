using ApplicantsManagement.UI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace ApplicantsManagement.UI.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home  
        public ActionResult Index()
        {
            return View();
        }
        public async System.Threading.Tasks.Task<JsonResult> List()
        {
            List<ApplicantOutput> model = new List<ApplicantOutput>();
            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            using (var client = new HttpClient(clientHandler))
            {
                string Baseurl = ConfigurationManager.AppSettings["APIBaseurl"].ToString();
                client.BaseAddress = new Uri(Baseurl);
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage Res = await client.GetAsync("applicant/ListApplicants");
                if (Res.IsSuccessStatusCode)
                {
                    var response = Res.Content.ReadAsStringAsync().Result;
                    var result = JsonConvert.DeserializeObject<List<ApplicantOutput>>(response);
                    model = result;
                }
            }
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        public async System.Threading.Tasks.Task<JsonResult> Add(AddApplicantInput applicant)
        {
            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            using (var client = new HttpClient(clientHandler))
            {
                string Baseurl = ConfigurationManager.AppSettings["APIBaseurl"].ToString();
                client.BaseAddress = new Uri(Baseurl);
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                StringContent content = new StringContent(JsonConvert.SerializeObject(applicant), Encoding.UTF8, "application/json");
                HttpResponseMessage Res = await client.PostAsync("applicant/AddApplicant", content);
                client.Dispose();
            }
            return Json(applicant, JsonRequestBehavior.AllowGet);
        }
        public async System.Threading.Tasks.Task<JsonResult> Update(UpdateApplicantInput applicant)
        {
            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            using (var client = new HttpClient(clientHandler))
            {
                string Baseurl = ConfigurationManager.AppSettings["APIBaseurl"].ToString();
                client.BaseAddress = new Uri(Baseurl);
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                StringContent content = new StringContent(JsonConvert.SerializeObject(applicant), Encoding.UTF8, "application/json");
                HttpResponseMessage Res = await client.PutAsync("applicant/UpdateApplicant", content);
                client.Dispose();
            }
            return Json(applicant, JsonRequestBehavior.AllowGet);
        }
        public async System.Threading.Tasks.Task<JsonResult> GetbyID(int ID)
        {
            ApplicantOutput model = new ApplicantOutput();
            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            using (var client = new HttpClient(clientHandler))
            {
                string Baseurl = ConfigurationManager.AppSettings["APIBaseurl"].ToString();
                client.BaseAddress = new Uri(Baseurl);
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage Res = await client.GetAsync(string.Format("applicant/GetApplicant?applicantId={0}", ID));
                if (Res.IsSuccessStatusCode)
                {
                    var response = Res.Content.ReadAsStringAsync().Result;
                    var result = JsonConvert.DeserializeObject<ApplicantOutput>(response);
                    model = result;
                }
            }
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public async System.Threading.Tasks.Task<JsonResult> Delete(int ID)
        {
            //  ApplicantOutput model = new ApplicantOutput();
            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            using (var client = new HttpClient(clientHandler))
            {
                string Baseurl = ConfigurationManager.AppSettings["APIBaseurl"].ToString();
                client.BaseAddress = new Uri(Baseurl);
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage Res = await client.DeleteAsync(string.Format("applicant/DeleteApplicant?applicantId={0}", ID));
                if (Res.IsSuccessStatusCode)
                {
                    var response = Res.Content.ReadAsStringAsync().Result;
                }
            }
            return Json(JsonRequestBehavior.AllowGet);
        }
    }
}