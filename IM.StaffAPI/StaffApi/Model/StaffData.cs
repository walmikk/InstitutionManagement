using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StaffApi.Model
{
    public class StaffData: BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Required]
        public string First_Name { get; set; }

        [Required]

        public string Last_Name { get; set; }
        [DataType(DataType.EmailAddress)]
        [Required]
        public string Email { get; set; }

        [Required]
        public string phone { get; set; }

        [Required]
        public string Department { get; set; }
    }
}
