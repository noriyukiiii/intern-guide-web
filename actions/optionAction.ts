"use server";
import { db } from "@/lib/db";

export async function getOptionAction() {
  try {
    const companies = await db.company.findMany({
      where: {
        deletedAt: null, // Only include companies that are not deleted
      },
      include: {
        positions: {
          include: {
            position_description: {
              include: {
                skills: {
                  include: {
                    tools: true, // Include tools
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        companyNameTh: "asc", // Sort by company name in Thai
      },
    });

    // Initialize sets to store unique values
    const uniqueSkills = new Set<string>();
    const uniqueTools = new Set<string>();
    const uniqueProvinces = new Set<string>();
    const uniquePositions = new Set<string>();
    const uniquePositionDescriptions = new Set<string>();

    // Iterate through companies to collect data
    companies.forEach((company) => {
      if (company.province) {
        uniqueProvinces.add(company.province);
      }

      company.positions.forEach((position) => {
        uniquePositions.add(position.name);

        position.position_description.forEach((description) => {
          uniquePositionDescriptions.add(description.description);

          description.skills.forEach((skill) => {
            uniqueSkills.add(skill.name);

            skill.tools.forEach((tool) => {
              uniqueTools.add(tool.name);
            });
          });
        });
      });
    });

    // Return the combined data as an object
    return {
      skill: Array.from(uniqueSkills),
      tool: Array.from(uniqueTools),
      province: Array.from(uniqueProvinces),
      position: Array.from(uniquePositions),
      positiondescription: Array.from(uniquePositionDescriptions),
    };
  } catch (error) {
    console.error("Error in getOptionAction: ", error);
    throw error;
  }
}
