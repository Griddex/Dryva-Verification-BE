using Microsoft.EntityFrameworkCore.Migrations;

namespace DryvaDriverVerification.Migrations
{
    public partial class addedCascadeDeletebehaviourtoImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Image_Data_DriverDataId",
                table: "Image");

            migrationBuilder.RenameColumn(
                name: "DriverDataId",
                table: "Image",
                newName: "ImageFK");

            migrationBuilder.RenameIndex(
                name: "IX_Image_DriverDataId",
                table: "Image",
                newName: "IX_Image_ImageFK");

            migrationBuilder.AddColumn<int>(
                name: "ImageFK",
                table: "Data",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Data_ImageFK",
                table: "Image",
                column: "ImageFK",
                principalTable: "Data",
                principalColumn: "DriverDataId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Image_Data_ImageFK",
                table: "Image");

            migrationBuilder.DropColumn(
                name: "ImageFK",
                table: "Data");

            migrationBuilder.RenameColumn(
                name: "ImageFK",
                table: "Image",
                newName: "DriverDataId");

            migrationBuilder.RenameIndex(
                name: "IX_Image_ImageFK",
                table: "Image",
                newName: "IX_Image_DriverDataId");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Data_DriverDataId",
                table: "Image",
                column: "DriverDataId",
                principalTable: "Data",
                principalColumn: "DriverDataId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}