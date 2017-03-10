using System;
using System.Collections.Generic;
using DataBaseModel.AllEntity;
using DataBaseModel.AllEntity.UserInfo;

namespace DataBaseModel.Concrete
{
    public class DbInitializer:System.Data.Entity.DropCreateDatabaseIfModelChanges<EcomerceDBContext>
    {
        protected override void Seed(EcomerceDBContext context)
        {
            var UserSummarys = new List<UserSummary>
            {
                new UserSummary { Active=true, CreatedOnUtc=DateTime.Now, Deleted=false, Email="12345678@qq.com",
                    EnyPassword ="BCAE288BAA88412DFA6A6E161C6B45BBC7802187", ID=Guid.NewGuid(), LastActivityDateUtc=DateTime.Now, LastLoginDateUtc=DateTime.Now,
                     PasswordSalt="sfede", PhoneNum="12345678910", UserName="Leo Cheng"}
            };

            UserSummarys.ForEach(s => context.UserSummarys.Add(s));

            context.SaveChanges();
        }
    }
}
