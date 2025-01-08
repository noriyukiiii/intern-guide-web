"use client"
import React, { useState } from 'react';

function CompanyForm() {
  const [companyData, setCompanyData] = useState<any>({
    company_name: '',
    positions: [
      {
        position_name: '',
        position_description: [
          {
            position_description_name: '',
            skills: [
              {
                skill_name: '',
                tools: [{ tool_name: '' }],
              },
            ],
          },
        ],
      },
    ],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCompanyData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePositionChange = (index: any, e: any) => {
    const { name, value } = e.target;
    const updatedPositions = [...companyData.positions];
    updatedPositions[index] = {
      ...updatedPositions[index],
      [name]: value,
    };
    setCompanyData((prevData: any) => ({
      ...prevData,
      positions: updatedPositions,
    }));
  };

  const handlePositionDescriptionChange = (positionIndex: any, descriptionIndex: any, e: any) => {
    const { name, value } = e.target;
    const updatedPositions = [...companyData.positions];
    updatedPositions[positionIndex].position_description[descriptionIndex] = {
      ...updatedPositions[positionIndex].position_description[descriptionIndex],
      [name]: value,
    };
    setCompanyData((prevData: any) => ({
      ...prevData,
      positions: updatedPositions,
    }));
  };

  const handleSkillChange = (positionIndex: any, descriptionIndex: any, skillIndex: any, e: any) => {
    const { name, value } = e.target;
    const updatedPositions = [...companyData.positions];
    updatedPositions[positionIndex].position_description[descriptionIndex].skills[skillIndex] = {
      ...updatedPositions[positionIndex].position_description[descriptionIndex].skills[skillIndex],
      [name]: value,
    };
    setCompanyData((prevData: any) => ({
      ...prevData,
      positions: updatedPositions,
    }));
  };

  const handleToolChange = (positionIndex: any, descriptionIndex: any, skillIndex: any, toolIndex: any, e: any) => {
    const { name, value } = e.target;
    const updatedPositions = [...companyData.positions];
    updatedPositions[positionIndex].position_description[descriptionIndex].skills[skillIndex].tools[toolIndex] = {
      ...updatedPositions[positionIndex].position_description[descriptionIndex].skills[skillIndex].tools[toolIndex],
      [name]: value,
    };
    setCompanyData((prevData: any) => ({
      ...prevData,
      positions: updatedPositions,
    }));
  };

  const handleAddPosition = () => {
    setCompanyData((prevData: any) => ({
      ...prevData,
      positions: [
        ...prevData.positions,
        {
          position_name: '',
          position_description: [
            {
              position_description_name: '',
              skills: [{ skill_name: '', tools: [{ tool_name: '' }] }],
            },
          ],
        },
      ],
    }));
  };

  return (
    <form>
      <label>
        Company Name:
        <input
          type="text"
          name="company_name"
          value={companyData.company_name}
          onChange={handleChange}
        />
      </label>

      {companyData.positions.map((position: any, positionIndex: any) => (
        <div key={positionIndex} className="position">
          <label>
            Position Name:
            <input
              type="text"
              name="position_name"
              value={position.position_name}
              onChange={(e) => handlePositionChange(positionIndex, e)}
            />
          </label>

          {position.position_description.map((description: any, descriptionIndex: any) => (
            <div key={descriptionIndex} className="position-description">
              <label>
                Position Description:
                <input
                  type="text"
                  name="position_description_name"
                  value={description.position_description_name}
                  onChange={(e) => handlePositionDescriptionChange(positionIndex, descriptionIndex, e)}
                />
              </label>

              {description.skills.map((skill: any, skillIndex: any) => (
                <div key={skillIndex} className="skill">
                  <label>
                    Skill Name:
                    <input
                      type="text"
                      name="skill_name"
                      value={skill.skill_name}
                      onChange={(e) => handleSkillChange(positionIndex, descriptionIndex, skillIndex, e)}
                    />
                  </label>

                  {skill.tools.map((tool: any, toolIndex: any) => (
                    <div key={toolIndex} className="tool">
                      <label>
                        Tool Name:
                        <input
                          type="text"
                          name="tool_name"
                          value={tool.tool_name}
                          onChange={(e) => handleToolChange(positionIndex, descriptionIndex, skillIndex, toolIndex, e)}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      <button type="button" onClick={handleAddPosition}>
        Add Position
      </button>

      <button type="submit">Submit</button>
    </form>
  );
}

export default CompanyForm;