using System.Collections.Generic;
using System.Data.SqlClient;


namespace DataBaseModel.Abstract
{
    public interface IBaseRepository<T>
    {
        IEnumerable<T> GetData(string query);

        int GetReturnCount(string query);

        int GetNowIdentityID(string query);

        bool UpdateDataWithTrans(string query, SqlTransaction sqlTxn, SqlConnection con);
    }   
}
