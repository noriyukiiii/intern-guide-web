"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

interface Company {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  description: string | null;
  location: string | null;
  province: string | null;
  contactName?: string | null;
  contactTel?: string | null;
  contactEmail?: string | null;
  contactSocial?: string | null;
  contactSocial_line?: string | null;
  establishment: string | null;
  imgLink: string | null;
  occupation: string | null;
  benefit: string | null;
  website: string | null;
  positions: Position[];
}

interface Position {
  id: string;
  name: string;
  position_description: PositionDescription[];
  isDelete?: boolean;
}

interface PositionDescription {
  id: string;
  description: string;
  skills: Skill[];
  isDelete?: boolean;
}

interface Skill {
  id: string;
  name: string;
  tools: Tool[];
  isDelete?: boolean;
}

interface Tool {
  id: string;
  name: string;
  isDelete?: boolean;
}

type Option = {
  skill: string[];
  tool: string[];
  province: string[];
  position: string[];
  positiondescription: string[];
};

const EditForm = ({
  company,
  optionData,
}: {
  company: Company;
  optionData: Option;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<Company | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clone the data to avoid mutating the original object
    const updatedData = JSON.parse(JSON.stringify(formData));

    // Recursive function to process positions
    function processPositions(positions: any) {
      return positions.map((position: any) => {
        if (position.isDelete) {
          delete position.name; // Remove the name field if isDelete is true
        }

        if (position.position_description) {
          position.position_description = processDescriptions(
            position.position_description
          );
        }

        return position;
      });
    }

    // Recursive function to process position descriptions
    function processDescriptions(descriptions: any) {
      return descriptions.map((description: any) => {
        if (description.isDelete) {
          delete description.description; // Remove positionId if isDelete is true
        }

        if (description.skills) {
          description.skills = processSkills(description.skills);
        }

        return description;
      });
    }

    // Recursive function to process skills
    function processSkills(skills: any) {
      return skills.map((skill: any) => {
        if (skill.isDelete) {
          delete skill.name; // Remove skill name if isDelete is true
        }

        if (skill.tools) {
          skill.tools = processTools(skill.tools);
        }

        return skill;
      });
    }

    // Recursive function to process tools
    function processTools(tools: any) {
      return tools.map((tool: any) => {
        if (tool.isDelete) {
          delete tool.name; // Remove tool name if isDelete is true
        }
        return tool;
      });
    }

    // Process positions in the form data
    if (updatedData.positions) {
      updatedData.positions = processPositions(updatedData.positions);
    }

    console.log("Updated Data:", updatedData);

    // try {
    //   const response = await fetch("http://localhost:5555/api/update_company", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(updatedData), // แปลงข้อมูลเป็น JSON
    //   });

    //   if (response.ok) {
    //     const result = await response.json();
    //     console.log("Response from server:", result);
    //     alert("Data updated successfully!");
    //   } else {
    //     console.error("Failed to update data. Status:", response.status);
    //     alert("Failed to update data.");
    //   }
    // } catch (error) {
    //   console.error("Error occurred while updating data:", error);
    //   alert("An error occurred. Please try again.");
    // }
  };

  useEffect(() => {
    setIsClient(true); // Set isClient to true once the client loads
  }, []);

  useEffect(() => {
    if (formData) {
      setFormData({
        ...formData,
        positions,
      });
    }
  }, [positions]);

  useEffect(() => {
    if (company) {
      setFormData(company); // Set formData when company data is available
      setPositions(company.positions || []); // Set positions
    }
  }, [company]);

  if (!isClient) {
    return null; // Or show a loading spinner
  }

  // Transformed options
  const transformedOptions = {
    skill: (optionData.skill || []).map((item) => ({
      label: item,
      value: item,
    })),
    tool: (optionData.tool || []).map((item) => ({ label: item, value: item })),
    province: (optionData.province || []).map((item) => ({
      label: item,
      value: item,
    })),
    position: (optionData.position || []).map((item) => ({
      label: item,
      value: item,
    })),
    positiondescription: (optionData.positiondescription || []).map((item) => ({
      label: item,
      value: item,
    })),
  };

  const deletePosition = (positionIndex: number) => {
    const updatedPositions = [...positions];
    const position = updatedPositions[positionIndex];

    if (position.id.startsWith("new")) {
      // ถ้าเป็นตำแหน่งใหม่ (ที่ยังไม่ได้บันทึกในฐานข้อมูล)
      updatedPositions.splice(positionIndex, 1);
    } else {
      // ถ้าเป็นตำแหน่งเก่า (ที่มีในฐานข้อมูล)
      updatedPositions[positionIndex] = {
        ...position,
        isDelete: true, // ตั้งค่าเป็นถูกลบ
      };
    }

    setPositions(updatedPositions);
  };

  const deletePositionDescription = (
    positionIndex: number,
    descIndex: number
  ) => {
    const updatedPositions = [...positions];
    const description =
      updatedPositions[positionIndex].position_description[descIndex];

    if (description.id.startsWith("new")) {
      // ถ้าเป็นคำอธิบายที่เพิ่มใหม่ ให้ลบออกจาก state เลย
      updatedPositions[positionIndex].position_description.splice(descIndex, 1);
    } else {
      // ถ้าเป็นคำอธิบายเก่า ให้ตั้งค่า isDelete เป็น true และเก็บข้อมูลใน state
      const deletedDescription = {
        ...description,
        isDelete: true,
      };
      updatedPositions[positionIndex].position_description.splice(descIndex, 1); // ลบออกจากฟอร์ม
      updatedPositions[positionIndex].position_description.push(
        deletedDescription
      ); // เพิ่มข้อมูลกลับเข้า state
    }

    setPositions(updatedPositions);
  };

  const deleteSkill = (
    positionIndex: number,
    descIndex: number,
    skillIndex: number
  ) => {
    const updatedPositions = [...positions];
    const skill =
      updatedPositions[positionIndex].position_description[descIndex].skills[
        skillIndex
      ];

    if (skill.id.startsWith("new")) {
      // ถ้าเป็นทักษะที่เพิ่มใหม่ ให้ลบออกจาก state เลย
      updatedPositions[positionIndex].position_description[
        descIndex
      ].skills.splice(skillIndex, 1);
    } else {
      // ถ้าเป็นทักษะเก่า ให้ตั้งค่า isDelete เป็น true และเก็บข้อมูลใน state
      const deletedSkill = {
        ...skill,
        isDelete: true,
      };
      updatedPositions[positionIndex].position_description[
        descIndex
      ].skills.splice(skillIndex, 1); // ลบออกจากฟอร์ม
      updatedPositions[positionIndex].position_description[
        descIndex
      ].skills.push(deletedSkill); // เพิ่มข้อมูลกลับเข้า state
    }

    setPositions(updatedPositions);
  };

  const deleteTool = (
    positionIndex: number,
    descIndex: number,
    skillIndex: number,
    toolIndex: number
  ) => {
    const updatedPositions = [...positions];
    const tool =
      updatedPositions[positionIndex].position_description[descIndex].skills[
        skillIndex
      ].tools[toolIndex];

    if (tool.id.startsWith("new")) {
      // ถ้าเป็นเครื่องมือที่เพิ่มใหม่ ให้ลบออกจาก state เลย
      updatedPositions[positionIndex].position_description[descIndex].skills[
        skillIndex
      ].tools.splice(toolIndex, 1);
    } else {
      // ถ้าเป็นเครื่องมือเก่า ให้ตั้งค่า isDelete เป็น true และเก็บข้อมูลใน state
      const deletedTool = {
        ...tool,
        isDelete: true,
      };
      updatedPositions[positionIndex].position_description[descIndex].skills[
        skillIndex
      ].tools.splice(toolIndex, 1); // ลบออกจากฟอร์ม
      updatedPositions[positionIndex].position_description[descIndex].skills[
        skillIndex
      ].tools.push(deletedTool); // เพิ่มข้อมูลกลับเข้า state
    }

    setPositions(updatedPositions);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Company) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };

  const handleChangePosition = (newValue: any, index: number) => {
    if (newValue && newValue.value) {
      const updatedPositions = [...positions];
      updatedPositions[index].name = newValue.value; // Update position name
      setPositions(updatedPositions);
    }
  };

  // Handle changes in description select
  const handleChangePositionDescription = (
    newValue: any,
    positionIndex: number,
    descIndex: number
  ) => {
    if (newValue && newValue.value) {
      const updatedPositions = [...positions];
      updatedPositions[positionIndex].position_description[
        descIndex
      ].description = newValue.value; // Update description
      setPositions(updatedPositions);
    }
  };

  // Handle changes in skill name
  const handleChangeSkill = (
    newValue: any,
    positionIndex: number,
    descIndex: number,
    skillIndex: number
  ) => {
    if (newValue && newValue.value) {
      const updatedPositions = [...positions];
      updatedPositions[positionIndex].position_description[descIndex].skills[
        skillIndex
      ].name = newValue.value;
      setPositions(updatedPositions);
    }
  };

  // Handle changes in tool name
  const handleChangeTool = (
    newValue: any,
    positionIndex: number,
    descIndex: number,
    skillIndex: number,
    toolIndex: number
  ) => {
    if (newValue && newValue.value) {
      const updatedPositions = [...positions];
      updatedPositions[positionIndex].position_description[descIndex].skills[
        skillIndex
      ].tools[toolIndex].name = newValue.value;
      setPositions(updatedPositions);
    }
  };

  // Add new position
  const addPosition = () => {
    const newPosition = {
      id: `new-${Date.now()}`, // ใช้ "new-" เพื่อระบุว่าเป็นตำแหน่งใหม่
      name: "",
      position_description: [],
    };
    setPositions([...positions, newPosition]);
  };

  const addDescription = (positionIndex: number) => {
    const updatedPositions = [...positions];
    updatedPositions[positionIndex].position_description.push({
      id: `new-${Date.now()}`, // ใช้ "new-" เพื่อระบุว่าเป็นคำอธิบายใหม่
      description: "",
      skills: [],
    });
    setPositions(updatedPositions);
  };

  const addSkill = (positionIndex: number, descIndex: number) => {
    const updatedPositions = [...positions];
    updatedPositions[positionIndex].position_description[descIndex].skills.push(
      {
        id: `new-${Date.now()}`, // ใช้ "new-" เพื่อระบุว่าเป็นทักษะใหม่
        name: "",
        tools: [],
      }
    );
    setPositions(updatedPositions);
  };

  const addTool = (
    positionIndex: number,
    descIndex: number,
    skillIndex: number
  ) => {
    const updatedPositions = [...positions];
    updatedPositions[positionIndex].position_description[descIndex].skills[
      skillIndex
    ].tools.push({
      id: `new-${Date.now()}`, // ใช้ "new-" เพื่อระบุว่าเป็นเครื่องมือใหม่
      name: "",
    });
    setPositions(updatedPositions);
  };

  return (
    <form className="bg-gray-200 border-black border-2 mx-auto p-6 grid grid-cols-8 gap-4 font-Prompt rounded-md">
      <div className="col-span-4">
        <label htmlFor="companyNameTh">Company Name (TH):</label>
        <input
          type="text"
          id="companyNameTh"
          name="companyNameTh"
          value={formData?.companyNameTh || ""}
          onChange={(e) => handleChange(e, 'companyNameTh')} 
          className="border p-2 w-full"
        />
        <button className="p-2 bg-rose-200" onClick={handleSubmit}>
          Update
        </button>
      </div>

      <div className="col-span-4">
        <label htmlFor="companyNameEn">Company Name (EN):</label>
        <Input
          type="text"
          id="companyNameEn"
          placeholder="Company Name (EN)"
          value={formData?.companyNameEn || ""}
          className="border p-2 w-full"
        />
      </div>
      {/* Render Positions */}
      <div className="col-span-4">
        {positions
          ?.filter((position) => !position.isDelete) // กรองเฉพาะตำแหน่งที่ไม่ได้ถูกลบ
          .map((position, positionIndex) => (
            <div key={position.id} className="mb-4">
              <label htmlFor={`position-${positionIndex}`}>
                Position {positionIndex + 1}:
              </label>
              <CreatableSelect
                id={`position-${positionIndex}`}
                name={`position-${positionIndex}`}
                value={
                  position.name
                    ? { label: position.name, value: position.name }
                    : null
                }
                onChange={(newValue) =>
                  handleChangePosition(newValue, positionIndex)
                }
                options={transformedOptions.position}
                placeholder="Select or type to add"
                isClearable
              />
              {/* Delete Position */}
              <button
                type="button"
                onClick={() => deletePosition(positionIndex)}
                className="mt-2 p-2 bg-red-500 text-white rounded"
              >
                ลบตำแหน่ง {position.name}
              </button>

              {/* Render Position Descriptions */}
              {position.position_description?.map((description, descIndex) => (
                <div key={description.id} className="pl-10">
                  <label htmlFor={`description-${descIndex}`}>
                    Description {descIndex + 1}:
                  </label>
                  <CreatableSelect
                    id={`description-${descIndex}`}
                    name={`description-${descIndex}`}
                    value={
                      description.description
                        ? {
                            label: description.description,
                            value: description.description,
                          }
                        : null
                    }
                    onChange={(newValue) =>
                      handleChangePositionDescription(
                        newValue,
                        positionIndex,
                        descIndex
                      )
                    }
                    options={transformedOptions.positiondescription}
                    placeholder="Select or type to add"
                    isClearable
                  />
                  {/* Delete Position Description */}
                  <button
                    type="button"
                    onClick={() =>
                      deletePositionDescription(positionIndex, descIndex)
                    }
                    className="mt-2 p-2 bg-red-500 text-white rounded"
                  >
                    ลบคำอธิบายตำแหน่ง : {description.description}
                  </button>

                  {/* Render Skills and Tools */}
                  {description.skills?.map((skill, skillIndex) => (
                    <div key={skill.id} className="pl-10">
                      <label htmlFor={`skill-${descIndex}`}>
                        Skill {skillIndex + 1}:
                      </label>
                      <CreatableSelect
                        id={`skill-${descIndex}`}
                        name={`skill-${descIndex}`}
                        value={
                          skill.name
                            ? { label: skill.name, value: skill.name }
                            : null
                        }
                        onChange={(newValue) =>
                          handleChangeSkill(
                            newValue,
                            positionIndex,
                            descIndex,
                            skillIndex
                          )
                        }
                        options={transformedOptions.skill}
                        placeholder="Select or type to add"
                        isClearable
                      />
                      {/* Delete Skill */}
                      <button
                        type="button"
                        onClick={() =>
                          deleteSkill(positionIndex, descIndex, skillIndex)
                        }
                        className="mt-2 p-2 bg-red-500 text-white rounded"
                      >
                        Delete Skill
                      </button>

                      {/* Render Tools */}
                      {skill.tools?.map((tool, toolIndex) => (
                        <div key={tool.id} className="pl-10">
                          <label htmlFor={`tool-${descIndex}`}>
                            Tool {toolIndex + 1}:
                          </label>
                          <CreatableSelect
                            id={`tool-${descIndex}`}
                            name={`tool-${descIndex}`}
                            value={
                              tool.name
                                ? { label: tool.name, value: tool.name }
                                : null
                            }
                            onChange={(newValue) =>
                              handleChangeTool(
                                newValue,
                                positionIndex,
                                descIndex,
                                skillIndex,
                                toolIndex
                              )
                            }
                            options={transformedOptions.tool}
                            placeholder="Select or type to add"
                            isClearable
                          />
                          {/* Delete Tool */}
                          <button
                            type="button"
                            onClick={() =>
                              deleteTool(
                                positionIndex,
                                descIndex,
                                skillIndex,
                                toolIndex
                              )
                            }
                            className="mt-2 p-2 bg-red-500 text-white rounded"
                          >
                            Delete Tool
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          addTool(positionIndex, descIndex, skillIndex)
                        }
                        className="mt-2 p-2 bg-green-500 text-white rounded"
                      >
                        Add Tool
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addSkill(positionIndex, descIndex)}
                    className="mt-2 p-2 bg-green-500 text-white rounded"
                  >
                    Add Skill
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addDescription(positionIndex)}
                className="mt-2 p-2 bg-green-500 text-white rounded"
              >
                Add Description
              </button>
            </div>
          ))}

        <button
          type="button"
          onClick={addPosition}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Add Position
        </button>
      </div>
    </form>
  );
};

export default EditForm;
