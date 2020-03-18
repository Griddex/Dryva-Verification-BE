using DryvaDriverVerification.Models;
using DryvaDriverVerification.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;

namespace DryvaDriverVerification.Database
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        private readonly ManagedByService _managedByService;
        private readonly IOptionsSnapshot<ConnectionStrings> _connectionStrings;

        public DbSet<DriverData> Data { get; set; }

        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options,
            ManagedByService managedByService, IOptionsSnapshot<ConnectionStrings> connectionStrings)
            : base(options)
        {
            _managedByService = managedByService;
            _connectionStrings = connectionStrings;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                _connectionStrings.Value.Default,
                sqlServerOptionsAction: sqlOptions =>
                {
                    sqlOptions.CommandTimeout(60);
                    sqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 10,
                        maxRetryDelay: TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null);
                });
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder?.Entity<DriverData>().HasQueryFilter(
                    p => p.ManagedBy.ManagedByNumber == _managedByService.ManagedByNumber);

            modelBuilder?.Entity<ApplicationUser>(e =>
            {
                e.Property(p => p.Id).HasDefaultValueSql("newid()");
                e.HasOne(p => p.Name).WithOne().HasForeignKey<ApplicationUser>(k => k.NameFK);
                e.Property(p => p.CreatedOn).HasDefaultValueSql("GetUtcDate()").ValueGeneratedOnAdd();
                e.Property(p => p.ModifiedOn).HasDefaultValueSql("GetUtcDate()").ValueGeneratedOnAddOrUpdate();
            });

            modelBuilder.Entity<IdentityRole>(e =>
            {
                e.Property(p => p.Id).HasDefaultValueSql("newid()");
            });

            modelBuilder.Entity<DriverData>(e =>
            {
                e.HasKey(k => k.DriverDataId);
                e.Property(p => p.DriverDataId).HasDefaultValueSql("newid()");
                e.Property(p => p.CreatedOn).HasDefaultValueSql("GetUtcDate()").ValueGeneratedOnAdd();
                e.Property(p => p.ModifiedOn).HasDefaultValueSql("GetUtcDate()").ValueGeneratedOnAddOrUpdate();
                e.HasOne(p => p.Inspector).WithOne().HasForeignKey<DriverData>(k => k.InspectorFK);
                e.HasOne(p => p.Driver).WithOne().HasForeignKey<DriverData>(k => k.DriverFK);
                e.HasOne(p => p.NextOfKin).WithOne().HasForeignKey<DriverData>(k => k.NextOfKinFK);
                e.HasOne(p => p.Owner).WithOne().HasForeignKey<DriverData>(k => k.OwnerFK);
                e.HasOne(p => p.Vehicle).WithOne().HasForeignKey<DriverData>(k => k.VehicleFK);
                e.HasOne(p => p.EngineFluidLevels).WithOne().HasForeignKey<DriverData>(k => k.EngineFluidLevelsFK);
                e.HasOne(p => p.ExteriorChecks).WithOne().HasForeignKey<DriverData>(k => k.ExteriorChecksFK);
                e.HasOne(p => p.InteriorChecks).WithOne().HasForeignKey<DriverData>(k => k.InteriorChecksFK);
                e.HasOne(p => p.SafetyTechnical).WithOne().HasForeignKey<DriverData>(k => k.SafetyTechnicalFK);
                e.HasMany(p => p.Images).WithOne().HasForeignKey("ImageFK").OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Driver>(e =>
            {
                e.HasKey(k => k.DriverId);
                e.HasOne(p => p.Name).WithOne().HasForeignKey<Driver>(k => k.NameFK);
                e.HasOne(p => p.DriversHomeAddress).WithOne().HasForeignKey<Driver>(k => k.DriversHomeAddressFK)
                 .OnDelete(DeleteBehavior.Restrict);
                e.HasOne(p => p.DriversPermanentAddress).WithOne().HasForeignKey<Driver>(k => k.DriversPermanentAddressFK)
                 .OnDelete(DeleteBehavior.Restrict);
            });
            modelBuilder.Entity<Inspector>().HasKey(k => k.InspectorId);
            modelBuilder.Entity<NextOfKin>().HasKey(k => k.NextOfKinId);
            modelBuilder.Entity<Owner>().HasKey(k => k.OwnerId);
            modelBuilder.Entity<Vehicle>().HasKey(k => k.VehicleId);
            modelBuilder.Entity<EngineFluidLevels>().HasKey(k => k.EngineFluidLevelsId);
            modelBuilder.Entity<ExteriorChecks>().HasKey(k => k.ExteriorChecksId);
            modelBuilder.Entity<InteriorChecks>().HasKey(k => k.InteriorChecksId);
            modelBuilder.Entity<SafetyTechnical>().HasKey(k => k.SafetyTechnicalId);
            modelBuilder.Entity<Image>().HasKey(k => k.ImageId);
        }
    }
}