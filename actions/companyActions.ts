"use server";
import { db } from "@/lib/db";


export async function getCompany() {
  try {
    const companies = await db.company.findMany({
      where: {
        deletedAt: null, // เฉพาะบริษัทที่ยังไม่ถูกลบ
      },
      include: {
        positions: {
          include: {
            position_description: {
              include: {
                skills: {
                  include: {
                    tools: true, // รวมข้อมูล tools
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        companyNameTh: 'asc', // เรียงลำดับตามชื่อภาษาไทย
      },
    });
    // จัดรูปแบบข้อมูลใน JavaScript เพื่อเลียนแบบผลลัพธ์ raw query
    const formattedCompanies = companies.map((company) => {
      const positionNames = Array.from(
        new Set(company.positions.map((p) => p.name))
      ).join(', ');

      const positionDescriptions = Array.from(
        new Set(
          company.positions.flatMap((p) =>
            p.position_description.map((pd) => pd.description) // เพิ่มการดึงชื่อจาก position_description
          )
        )
      ).join(', ');
  
      const skillNames = Array.from(
        new Set(
          company.positions.flatMap((p) =>
            p.position_description.flatMap((pd) =>
              pd.skills.map((s) => s.name)
            )
          )
        )
      ).join(', ');
  
      const toolsNames = Array.from(
        new Set(
          company.positions.flatMap((p) =>
            p.position_description.flatMap((pd) =>
              pd.skills.flatMap((s) => s.tools.map((t) => t.name))
            )
          )
        )
      ).join(', ');
  
      return {
        company_id: company.id,
        company_name_th: company.companyNameTh,
        company_name_en: company.companyNameEn,
        company_description: company.description,
        company_location: company.location,
        company_province: company.province,
        company_website: company.website,
        company_benefit: company.benefit,
        company_occuption: company.occupation, // เพิ่ม occuption
        company_established: company.establishment, // เพิ่ม established
        company_is_mou: company.isMou, // เพิ่ม isMou
        company_logo: company.imgLink,
        position_names: positionNames,
        position_descriptions: positionDescriptions, // รวมข้อมูล position_description
        skill_names: skillNames,
        tools_names: toolsNames,
      };
    });
  
    return formattedCompanies;
  } catch (error) {
    throw error;   
  }
}
