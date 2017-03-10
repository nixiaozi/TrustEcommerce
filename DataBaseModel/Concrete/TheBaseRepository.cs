using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using DataBaseModel.Abstract;
using DataBaseModel.AllEntity;

namespace DataBaseModel.Concrete
{
    public class TheBaseRepository<T>:IBaseRepository<T>
    {
        private EcomerceDBContext db = new EcomerceDBContext();

        public IEnumerable<T> GetData(string query)
        {
            try
            {
                var r = db.Database.SqlQuery<T>(query);
                //_currentCount = r.Count();
                return r;
            }
            catch (Exception e)
            {
                // _currentCount = null;
                throw e;
            }
        }

        public int GetReturnCount(string query)
        {
            try
            {
                return db.Database.SqlQuery<GetCount>(query).FirstOrDefault().RowCounts;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public int GetNowIdentityID(string query)
        {
            try
            {
                return db.Database.SqlQuery<GetNowIdentityID>(query).FirstOrDefault().NowIdentityID;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool UpdateDataWithTrans(string query, SqlTransaction sqlTxn, SqlConnection con)
        {
            using (var context = new EcomerceDBContext(con, contextOwnsConnection: false))
            {

                context.Database.UseTransaction(sqlTxn);
                context.Database.ExecuteSqlCommand(query);
                return true;
            }
        }

    }
}
