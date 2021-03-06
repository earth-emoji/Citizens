using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Citizens.Data
{
    public class Entity : IEntity
    {
        [BindNever]
        [ScaffoldColumn(false)]
        public long Id { get; set; }

        [BindNever]
        [ScaffoldColumn(false)]
        public DateTime Created { get; set; }

        [BindNever]
        [ScaffoldColumn(false)]
        public DateTime Updated { get; set; }
    }
}