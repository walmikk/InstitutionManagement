﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityApi.Model
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]

        public string LastName { get; set; }

        [DataType(DataType.EmailAddress)]
        [Required]
        [Key]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; }

        public string ContactNo { get; set; }

        [StringLength(100)]
        public string Address { get; set; }

        public DateTime DateOfBirth { get; set; }
    }
}
