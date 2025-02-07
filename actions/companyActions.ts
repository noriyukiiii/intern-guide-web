"use server";
import { db } from "@/lib/db";

export async function getCompany(userId : string) {
  try {
    // ดึงรายการ companyId ที่ผู้ใช้ทำ Favorite
    const favoriteCompanies = await db.favoriteCompanies.findMany({
      where: {
        userId: userId,
      },
      select: {
        companyId: true,
      },
    });

    // สร้าง Set ของ companyId ที่ผู้ใช้ชื่นชอบ
    const favoriteCompanyIds = new Set(favoriteCompanies.map((fav) => fav.companyId));

    // ดึงข้อมูลบริษัททั้งหมด
    const companies = await db.company.findMany({
      where: {
        deletedAt: null,
        approvalStatus: "approved", // กรองเฉพาะบริษัทที่อนุมัติ
      },
      include: {
        positions: {
          include: {
            position_description: {
              include: {
                skills: {
                  include: {
                    tools: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        companyNameTh: "asc",
      },
    });

    // เพิ่ม isFavorite ในผลลัพธ์
    const formattedCompanies = companies.map((company) => {
      const positionNames = Array.from(
        new Set(company.positions.map((p) => p.name))
      ).join(", ");

      const positionDescriptions = Array.from(
        new Set(
          company.positions.flatMap((p) =>
            p.position_description.map((pd) => pd.description)
          )
        )
      ).join(", ");

      const skillNames = Array.from(
        new Set(
          company.positions.flatMap((p) =>
            p.position_description.flatMap((pd) =>
              pd.skills.map((s) => s.name)
            )
          )
        )
      ).join(", ");

      const toolsNames = Array.from(
        new Set(
          company.positions.flatMap((p) =>
            p.position_description.flatMap((pd) =>
              pd.skills.flatMap((s) => s.tools.map((t) => t.name))
            )
          )
        )
      ).join(", ");

      return {
        company_id: company.id,
        company_name_th: company.companyNameTh,
        company_name_en: company.companyNameEn,
        company_description: company.description,
        company_location: company.location,
        company_province: company.province,
        company_website: company.website,
        company_benefit: company.benefit,
        company_occuption: company.occupation,
        company_established: company.establishment,
        company_is_mou: company.isMou,
        company_logo: company.imgLink,
        contract_name: company.contractName,
        contract_email: company.contractEmail,
        contract_tel: company.contractTel,
        contract_social: company.contractSocial,
        contract_line: company.contractSocial_line,
        position_names: positionNames,
        position_descriptions: positionDescriptions,
        skill_names: skillNames,
        tools_names: toolsNames,
        is_favorite: favoriteCompanyIds.has(company.id), // ตรวจสอบว่าเป็น favorite หรือไม่
      };
    });

    return formattedCompanies;
  } catch (error) {
    throw error;
  }
}


export async function getAdminCompany(companyId: string) {
  try {
    // ตรวจสอบว่า companyId ถูกส่งมาหรือไม่
    if (!companyId) {
      throw new Error("Company ID is required");
    }

    // ดึงข้อมูลบริษัทที่ตรงกับ companyId
    const company = await db.company.findUnique({
      where: {
        id: companyId, // กรองบริษัทตาม ID
      },
      
      select: {
        id: true,
        companyNameTh: true,
        companyNameEn: true,
        description: true,
        location: true,
        province: true,
        contractName: true,
        contractTel: true,
        contractEmail: true,
        contractSocial: true,
        contractSocial_line: true,
        establishment: true,
        website: true,
        benefit: true,
        isMou:true,
        occupation: true,
        imgLink: true,
        positions: {
          select: {
            id: true,
            name: true,
            position_description: {
              select: {
                id: true,
                description: true,
                skills: {
                  select: {
                    id: true,
                    name: true,
                    tools : {
                      select: {
                        id : true,
                        name : true
                      }
                    }
                  },
                },
              },
            },
          },
        },
      },
    });

    // ตรวจสอบว่าพบข้อมูลบริษัทหรือไม่
    if (!company) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    return company;
  } catch (error: any) {
    console.error("Error fetching company data:", error.message || error);
    throw new Error("Failed to fetch company data"); // ส่งข้อความ error ออกไปยังส่วนที่เรียกใช้
  }
}
