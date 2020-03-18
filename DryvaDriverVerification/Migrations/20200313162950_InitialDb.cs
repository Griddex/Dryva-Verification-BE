using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace DryvaDriverVerification.Migrations
{
    public partial class InitialDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    AddressId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DriversAddressLine1 = table.Column<string>(nullable: true),
                    DriversAddressLine2 = table.Column<string>(nullable: true),
                    DriversPostalCode = table.Column<string>(nullable: true),
                    DriversCountry = table.Column<string>(nullable: true),
                    DriversState = table.Column<string>(nullable: true),
                    DriversCity = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.AddressId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EngineFluidLevels",
                columns: table => new
                {
                    EngineFluidLevelsId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FuelGaugeWorking = table.Column<bool>(nullable: false),
                    OilLevelPressureGaugeWorking = table.Column<bool>(nullable: false),
                    TransmissionFluidLevel = table.Column<bool>(nullable: false),
                    PowerSteeringFluidLevel = table.Column<bool>(nullable: false),
                    BrakeFluidLevel = table.Column<bool>(nullable: false),
                    BatteryCharge = table.Column<bool>(nullable: false),
                    WindshieldWiperFluid = table.Column<bool>(nullable: false),
                    RadiatorFluidLevel = table.Column<bool>(nullable: false),
                    FluidsLeakingUnderBus = table.Column<bool>(nullable: false),
                    EngineWarningLights = table.Column<bool>(nullable: false),
                    OtherEngineFluidLevels = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EngineFluidLevels", x => x.EngineFluidLevelsId);
                });

            migrationBuilder.CreateTable(
                name: "ExteriorChecks",
                columns: table => new
                {
                    ExteriorChecksId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    HeadlightsHiLow = table.Column<bool>(nullable: false),
                    FoglampsHazardlamps = table.Column<bool>(nullable: false),
                    WindshieldCondition = table.Column<bool>(nullable: false),
                    DirectionalSignalsFrontrear = table.Column<bool>(nullable: false),
                    TaillightsRunninglights = table.Column<bool>(nullable: false),
                    BrakelightsBackUpLights = table.Column<bool>(nullable: false),
                    TireconditionAirpressure = table.Column<bool>(nullable: false),
                    LugnutsTight = table.Column<bool>(nullable: false),
                    WindowscanWindfreely = table.Column<bool>(nullable: false),
                    LuggageStoragedoorsEnginecompartmentPanels = table.Column<bool>(nullable: false),
                    ExteriorClean = table.Column<bool>(nullable: false),
                    BodyconditionScratchesDingsDents = table.Column<bool>(nullable: false),
                    OtherExteriorChecks = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExteriorChecks", x => x.ExteriorChecksId);
                });

            migrationBuilder.CreateTable(
                name: "IdentityRole",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false, defaultValueSql: "newid()"),
                    Name = table.Column<string>(nullable: true),
                    NormalizedName = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityRole", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Inspector",
                columns: table => new
                {
                    InspectorId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameOfSupervisor = table.Column<string>(nullable: false),
                    NameOfInspector = table.Column<string>(nullable: false),
                    PlaceOfInspection = table.Column<string>(nullable: false),
                    DateOfInspection = table.Column<DateTime>(nullable: false),
                    VehiclePlateNumber = table.Column<string>(nullable: false),
                    InspectionPassed = table.Column<string>(nullable: false),
                    InspectorsGeneralRemarks = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inspector", x => x.InspectorId);
                });

            migrationBuilder.CreateTable(
                name: "InteriorChecks",
                columns: table => new
                {
                    InteriorChecksId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Mirrors = table.Column<bool>(nullable: false),
                    WindshieldWipers = table.Column<bool>(nullable: false),
                    Horn = table.Column<bool>(nullable: false),
                    ParkingBrake = table.Column<bool>(nullable: false),
                    Fans = table.Column<bool>(nullable: false),
                    AirConditioning = table.Column<bool>(nullable: false),
                    RadioEquipmentCellphone = table.Column<bool>(nullable: false),
                    CantheDoorsbeOpenedFreely = table.Column<bool>(nullable: false),
                    InteriorLights = table.Column<bool>(nullable: false),
                    DriverSeatBelts = table.Column<bool>(nullable: false),
                    PassengerSeats = table.Column<bool>(nullable: false),
                    FireExtinguisher = table.Column<bool>(nullable: false),
                    OtherEmergencyGear = table.Column<bool>(nullable: false),
                    DestinationSignbox = table.Column<bool>(nullable: false),
                    WindowsCleanandcanWindFreely = table.Column<bool>(nullable: false),
                    InteriorClean = table.Column<bool>(nullable: false),
                    WastebinAvailableOrEmptied = table.Column<bool>(nullable: false),
                    OtherInteriorChecks = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InteriorChecks", x => x.InteriorChecksId);
                });

            migrationBuilder.CreateTable(
                name: "ManagedBy",
                columns: table => new
                {
                    ManagedById = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ManagedByNumber = table.Column<string>(nullable: false),
                    ManagedByName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ManagedBy", x => x.ManagedById);
                });

            migrationBuilder.CreateTable(
                name: "Name",
                columns: table => new
                {
                    NameId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(nullable: true),
                    MiddleName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    NickName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Name", x => x.NameId);
                });

            migrationBuilder.CreateTable(
                name: "NextOfKin",
                columns: table => new
                {
                    NextOfKinId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NextOfKinFirstName = table.Column<string>(nullable: false),
                    NextOfKinMiddleName = table.Column<string>(nullable: true),
                    NextOfKinLastName = table.Column<string>(nullable: false),
                    NextOfKinPhoneNumber = table.Column<string>(nullable: false),
                    NextOfKinHomeAddressLine1 = table.Column<string>(nullable: false),
                    NextOfKinHomeAddressLine2 = table.Column<string>(nullable: true),
                    NextOfKinHomePostalCode = table.Column<string>(nullable: true),
                    NextOfKinHomeCountry = table.Column<string>(nullable: false),
                    NextOfKinHomeState = table.Column<string>(nullable: false),
                    NextOfKinHomeCity = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NextOfKin", x => x.NextOfKinId);
                });

            migrationBuilder.CreateTable(
                name: "Owner",
                columns: table => new
                {
                    OwnerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameOfOwner = table.Column<string>(nullable: false),
                    OwnersHouseAddress = table.Column<string>(nullable: false),
                    OwnersMobileNo = table.Column<string>(nullable: false),
                    OwnersNextOfKinName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Owner", x => x.OwnerId);
                });

            migrationBuilder.CreateTable(
                name: "RegisteredBy",
                columns: table => new
                {
                    RegisteredById = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RegisteredByNumber = table.Column<string>(nullable: false),
                    RegisteredByName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegisteredBy", x => x.RegisteredById);
                });

            migrationBuilder.CreateTable(
                name: "SafetyTechnical",
                columns: table => new
                {
                    SafetyTechnicalId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NoOfDefectsOnBus = table.Column<int>(nullable: false),
                    HasSupervisorBeenNotified = table.Column<string>(nullable: false),
                    SafetyTechnicalGeneralRemarks = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SafetyTechnical", x => x.SafetyTechnicalId);
                });

            migrationBuilder.CreateTable(
                name: "Vehicle",
                columns: table => new
                {
                    VehicleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    VehicleType = table.Column<string>(nullable: false),
                    VehicleMake = table.Column<string>(nullable: false),
                    YearOfManufacture = table.Column<string>(nullable: false),
                    ChassisNo = table.Column<string>(nullable: false),
                    EngineNo = table.Column<string>(nullable: false),
                    MOTExpiry = table.Column<DateTime>(nullable: false),
                    InsuranceExpiry = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicle", x => x.VehicleId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<Guid>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    NameFK = table.Column<int>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_Name_NameFK",
                        column: x => x.NameFK,
                        principalTable: "Name",
                        principalColumn: "NameId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Driver",
                columns: table => new
                {
                    DriverId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameFK = table.Column<int>(nullable: false),
                    DriversMobile = table.Column<string>(nullable: false),
                    DriversEmail = table.Column<string>(nullable: false),
                    DriversLicenseNo = table.Column<string>(nullable: false),
                    DriversLicenseExpiryDate = table.Column<DateTime>(nullable: false),
                    DriversHomeAddressFK = table.Column<int>(nullable: false),
                    DriversPermanentAddressFK = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Driver", x => x.DriverId);
                    table.ForeignKey(
                        name: "FK_Driver_Address_DriversHomeAddressFK",
                        column: x => x.DriversHomeAddressFK,
                        principalTable: "Address",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Driver_Address_DriversPermanentAddressFK",
                        column: x => x.DriversPermanentAddressFK,
                        principalTable: "Address",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Driver_Name_NameFK",
                        column: x => x.NameFK,
                        principalTable: "Name",
                        principalColumn: "NameId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<Guid>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    RoleId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Data",
                columns: table => new
                {
                    DriverDataId = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    InspectorFK = table.Column<int>(nullable: false),
                    DriverFK = table.Column<int>(nullable: false),
                    NextOfKinFK = table.Column<int>(nullable: false),
                    OwnerFK = table.Column<int>(nullable: false),
                    VehicleFK = table.Column<int>(nullable: false),
                    EngineFluidLevelsFK = table.Column<int>(nullable: false),
                    ExteriorChecksFK = table.Column<int>(nullable: false),
                    InteriorChecksFK = table.Column<int>(nullable: false),
                    SafetyTechnicalFK = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    ManagedById = table.Column<int>(nullable: true),
                    RegisteredById = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Data", x => x.DriverDataId);
                    table.ForeignKey(
                        name: "FK_Data_Driver_DriverFK",
                        column: x => x.DriverFK,
                        principalTable: "Driver",
                        principalColumn: "DriverId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Data_EngineFluidLevels_EngineFluidLevelsFK",
                        column: x => x.EngineFluidLevelsFK,
                        principalTable: "EngineFluidLevels",
                        principalColumn: "EngineFluidLevelsId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Data_ExteriorChecks_ExteriorChecksFK",
                        column: x => x.ExteriorChecksFK,
                        principalTable: "ExteriorChecks",
                        principalColumn: "ExteriorChecksId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Data_Inspector_InspectorFK",
                        column: x => x.InspectorFK,
                        principalTable: "Inspector",
                        principalColumn: "InspectorId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Data_InteriorChecks_InteriorChecksFK",
                        column: x => x.InteriorChecksFK,
                        principalTable: "InteriorChecks",
                        principalColumn: "InteriorChecksId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Data_ManagedBy_ManagedById",
                        column: x => x.ManagedById,
                        principalTable: "ManagedBy",
                        principalColumn: "ManagedById",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Data_NextOfKin_NextOfKinFK",
                        column: x => x.NextOfKinFK,
                        principalTable: "NextOfKin",
                        principalColumn: "NextOfKinId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Data_Owner_OwnerFK",
                        column: x => x.OwnerFK,
                        principalTable: "Owner",
                        principalColumn: "OwnerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Data_RegisteredBy_RegisteredById",
                        column: x => x.RegisteredById,
                        principalTable: "RegisteredBy",
                        principalColumn: "RegisteredById",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Data_SafetyTechnical_SafetyTechnicalFK",
                        column: x => x.SafetyTechnicalFK,
                        principalTable: "SafetyTechnical",
                        principalColumn: "SafetyTechnicalId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Data_Vehicle_VehicleFK",
                        column: x => x.VehicleFK,
                        principalTable: "Vehicle",
                        principalColumn: "VehicleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    ImageId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FileName = table.Column<string>(nullable: true),
                    FilePath = table.Column<string>(nullable: true),
                    Length = table.Column<long>(nullable: false),
                    DriverDataId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.ImageId);
                    table.ForeignKey(
                        name: "FK_Image_Data_DriverDataId",
                        column: x => x.DriverDataId,
                        principalTable: "Data",
                        principalColumn: "DriverDataId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_NameFK",
                table: "AspNetUsers",
                column: "NameFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Data_DriverFK",
                table: "Data",
                column: "DriverFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Data_EngineFluidLevelsFK",
                table: "Data",
                column: "EngineFluidLevelsFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Data_ExteriorChecksFK",
                table: "Data",
                column: "ExteriorChecksFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Data_InspectorFK",
                table: "Data",
                column: "InspectorFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Data_InteriorChecksFK",
                table: "Data",
                column: "InteriorChecksFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Data_ManagedById",
                table: "Data",
                column: "ManagedById");

            migrationBuilder.CreateIndex(
                name: "IX_Data_NextOfKinFK",
                table: "Data",
                column: "NextOfKinFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Data_OwnerFK",
                table: "Data",
                column: "OwnerFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Data_RegisteredById",
                table: "Data",
                column: "RegisteredById");

            migrationBuilder.CreateIndex(
                name: "IX_Data_SafetyTechnicalFK",
                table: "Data",
                column: "SafetyTechnicalFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Data_VehicleFK",
                table: "Data",
                column: "VehicleFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Driver_DriversHomeAddressFK",
                table: "Driver",
                column: "DriversHomeAddressFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Driver_DriversPermanentAddressFK",
                table: "Driver",
                column: "DriversPermanentAddressFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Driver_NameFK",
                table: "Driver",
                column: "NameFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Image_DriverDataId",
                table: "Image",
                column: "DriverDataId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "IdentityRole");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Data");

            migrationBuilder.DropTable(
                name: "Driver");

            migrationBuilder.DropTable(
                name: "EngineFluidLevels");

            migrationBuilder.DropTable(
                name: "ExteriorChecks");

            migrationBuilder.DropTable(
                name: "Inspector");

            migrationBuilder.DropTable(
                name: "InteriorChecks");

            migrationBuilder.DropTable(
                name: "ManagedBy");

            migrationBuilder.DropTable(
                name: "NextOfKin");

            migrationBuilder.DropTable(
                name: "Owner");

            migrationBuilder.DropTable(
                name: "RegisteredBy");

            migrationBuilder.DropTable(
                name: "SafetyTechnical");

            migrationBuilder.DropTable(
                name: "Vehicle");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "Name");
        }
    }
}