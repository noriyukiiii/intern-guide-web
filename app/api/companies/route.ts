// // app/api/companies/route.ts

// import { PrismaClient } from "@prisma/client";
// const prismaClient = new PrismaClient();

// export async function GET() {

//   try {
//     const companies: Array<{
//       company_id: string;
//       company_name_th: string;
//       company_name_en: string;
//       company_description?: string;
//       company_location?: string;
//       company_province?: string;
//       company_website?: string;
//       company_benefit?: string;
//       position_names?: string;
//       skill_names?: string;
//       tools_names?: string;
//     }> = await prismaClient.$queryRawUnsafe(`
//       SELECT
//         c.id AS company_id,
//         c."companyNameTh" AS company_name_th,
//         c."companyNameEn" AS company_name_en,
//         c.description AS company_description,
//         c.location AS company_location,
//         c.province AS company_province,
//         c.website AS company_website,
//         c.benefit AS company_benefit,
//         STRING_AGG(DISTINCT p.name, ', ') AS position_names,
//         STRING_AGG(DISTINCT s.name, ', ') AS skill_names,
//         STRING_AGG(DISTINCT t.name, ', ') AS tools_names
//       FROM "Company" c
//       LEFT JOIN "positions" p ON c.id = p."companyId"
//       LEFT JOIN "position_description" pd ON p.id = pd."positionId"
//       LEFT JOIN "skills" s ON pd.id = s."pos_des_id"
//       LEFT JOIN "tools" t ON s.id = t."skillId"
//       WHERE c."deletedAt" IS NULL
//       GROUP BY
//         c.id,
//         c."companyNameTh",
//         c."companyNameEn",
//         c.description,
//         c.location,
//         c.province,
//         c.website,
//         c.benefit
//       ORDER BY c."companyNameTh";
//     `);

//     return new Response(
//       JSON.stringify({
//         data: companies,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching company details:", error);

//     if (error instanceof Error) {
//       console.error("Error Message:", error.message);
//       console.error("Error Stack:", error.stack);
//     }

//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Internal Server Error",
//       }),
//       { status: 500 }
//     );
//   }
// }
"use server";

import { db } from "@/lib/db";

// export async function fetchCompanies() {
//   try {
//     const companies = await prisma.$queryRaw`
//       SELECT
//         c.id AS company_id,
//         c."companyNameTh" AS company_name_th,
//         c."companyNameEn" AS company_name_en,
//         c.description AS company_description,
//         c.location AS company_location,
//         c.province AS company_province,
//         c.website AS company_website,
//         c.benefit AS company_benefit,
//         STRING_AGG(DISTINCT p.name, ', ') AS position_names,
//         STRING_AGG(DISTINCT s.name, ', ') AS skill_names,
//         STRING_AGG(DISTINCT t.name, ', ') AS tools_names
//       FROM "Company" c
//       LEFT JOIN "positions" p ON c.id = p."companyId"
//       LEFT JOIN "position_description" pd ON p.id = pd."positionId"
//       LEFT JOIN "skills" s ON pd.id = s."pos_des_id"
//       LEFT JOIN "tools" t ON s.id = t."skillId"
//       WHERE c."deletedAt" IS NULL
//       GROUP BY
//         c.id,
//         c."companyNameTh",
//         c."companyNameEn",
//         c.description,
//         c.location,
//         c.province,
//         c.website,
//         c.benefit
//       ORDER BY c."companyNameTh";
//     `;
//     return companies;
//   } catch (error) {
//     console.error("Error fetching companies:", error);
//     throw new Error("Failed to fetch companies.");
//   }
// }

// app/api/companies/route.t

export async function GET(request: Request) {
  try {
    const companies = await db.$queryRaw`
      SELECT
  c.id AS company_id,
  c."companyNameTh" AS company_name_th,
  c."companyNameEn" AS company_name_en,
  c.description AS company_description,
  c.location AS company_location,
  c.province AS company_province,
  c.website AS company_website,
  c.benefit AS company_benefit,
  c."imgLink" AS company_image, -- ใช้เครื่องหมายคำพูดคู่
  STRING_AGG(DISTINCT p.name, ', ') AS position_names,
  STRING_AGG(DISTINCT pd.description, ', ') AS position_descriptions,
  STRING_AGG(DISTINCT s.name, ', ') AS skill_names,
  STRING_AGG(DISTINCT t.name, ', ') AS tools_names
FROM "Company" c
LEFT JOIN "positions" p ON c.id = p."companyId"
LEFT JOIN "position_description" pd ON p.id = pd."positionId"
LEFT JOIN "skills" s ON pd.id = s."pos_des_id"
LEFT JOIN "tools" t ON s.id = t."skillId"
WHERE c."deletedAt" IS NULL
GROUP BY 
  c.id, 
  c."companyNameTh", 
  c."companyNameEn", 
  c.description, 
  c.location, 
  c.province, 
  c.website, 
  c.benefit, 
  c."imgLink" -- ใช้เครื่องหมายคำพูดคู่
ORDER BY c."companyNameTh";

    `;

    return new Response(JSON.stringify({ data: companies }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch companies." }),
      { status: 500 }
    );
  }
}
