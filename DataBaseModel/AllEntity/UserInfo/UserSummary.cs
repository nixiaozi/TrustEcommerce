using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseModel.AllEntity.UserInfo
{
    public class UserSummary
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid ID { get; set; }

        [StringLength(20, ErrorMessage = "用户名最多为20个字符")]
        public string UserName { get; set; }

        [StringLength(100, ErrorMessage = "密码hash值最多100个字符")]
        public string EnyPassword { get; set; }

        [MaxLength(5, ErrorMessage = "最多为5个字符")]
        public string PasswordSalt { get; set; }

        [StringLength(20, ErrorMessage = "电话号码最多为20个字符")]
        public string PhoneNum { get; set; }

        [StringLength(20, ErrorMessage = "电话号码最多为20个字符")]
        public string OldPhoneNum { get; set; }

        [StringLength(100, ErrorMessage = "邮箱地址最多为100个字符")]
        public string Email { get; set; }

        [StringLength(100, ErrorMessage = "邮箱地址最多为100个字符")]
        public string OldEmail { get; set; }

        public bool Active { get; set; }

        public bool Deleted { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime CreatedOnUtc { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? LastLoginDateUtc { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? LastActivityDateUtc { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? LastChangeIdentityInfoDateUtc { get; set; }

        [StringLength(10, ErrorMessage = "验证码最多为10个字符")]
        public string CurrentPaymentCode { get; set; }
    }
}
