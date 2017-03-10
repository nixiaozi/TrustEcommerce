
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Common;
using DataBaseModel.AllEntity;
using DataBaseModel.AllEntity.UserInfo;


namespace DataBaseModel.Concrete
{
    public class EcomerceDBContext:DbContext
    {
        public DbSet<UserSummary> UserSummarys { get; set; }


        public EcomerceDBContext()
            : base()
        {

        }

        public EcomerceDBContext(DbConnection existingConnection, bool contextOwnsConnection)
            : base(existingConnection, contextOwnsConnection)
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

        }


    }
}
