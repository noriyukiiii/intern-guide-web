import { db } from "@/lib/db";

export const getCompanyDetails = async (companyId: string) => {
  try {
    // ดึงข้อมูลบริษัทพร้อมกับข้อมูลที่เกี่ยวข้อง
    const company = await db.company.findUnique({
      where: {
        id: companyId,
      },
      include: {
        positions: {
          include: {
            position_description: {
              include: {
                skills: {
                  include: {
                    tools: true, // ดึงข้อมูล tools ด้วย
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!company) {
      return null; // กรณีไม่เจอข้อมูลบริษัท
    }

    // จัดรูปแบบข้อมูล
    const positionNames = Array.from(
      new Set(company.positions.map((position) => position.name))
    ).join(", ");

    const positionDescriptions = Array.from(
      new Set(
        company.positions.flatMap((position) =>
          position.position_description.map((desc) => desc.description)
        )
      )
    ).join(", ");

    const skillNames = Array.from(
      new Set(
        company.positions.flatMap((position) =>
          position.position_description.flatMap((desc) =>
            desc.skills.map((skill) => skill.name)
          )
        )
      )
    ).join(", ");

    const toolsNames = Array.from(
      new Set(
        company.positions.flatMap((position) =>
          position.position_description.flatMap((desc) =>
            desc.skills.flatMap((skill) =>
              skill.tools.map((tool) => tool.name)
            )
          )
        )
      )
    ).join(", ");

    // ส่งข้อมูลกลับในรูปแบบที่จัดไว้
    return {
      company_id: company.id,
      company_name_th: company.companyNameTh,
      company_name_en: company.companyNameEn,
      company_description: company.description,
      company_location: company.location,
      company_province: company.province,
      company_website: company.website,
      company_benefit: company.benefit,
      company_logo: company.imgLink,
      position_names: positionNames,
      position_descriptions: positionDescriptions,
      skill_names: skillNames,
      tools_names: toolsNames,
    };
  } catch (error) {
    console.error("Error fetching company details:", error);
    return null;
  }
};
