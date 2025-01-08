"use client";

import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register components for ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Page() {
  const [positions, setPositions] = useState<
    Array<{
      position: string;
      positionCount: number;
    }>
  >([
    { position: "Software Engineer", positionCount: 10 },
    { position: "Cloud Engineer", positionCount: 7 },
    { position: "Programmer", positionCount: 5 },
    { position: "DevOps Engineer", positionCount: 3 },
    { position: "Product Manager", positionCount: 2 },
    { position: "UX/UI Designer", positionCount: 1 },
  ]);

  const [skills, setSkills] = useState<
    Array<{
      skill: string;
      skillCount: number;
    }>
  >([
    { skill: "JavaScript", skillCount: 12 },
    { skill: "Python", skillCount: 8 },
    { skill: "React", skillCount: 10 },
    { skill: "Docker", skillCount: 6 },
    { skill: "Node.js", skillCount: 7 },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Simulate an API fetch (replace with real API call)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setTimeout(() => {
          setPositions([
            { position: "Software Engineer", positionCount: 10 },
            { position: "Cloud Engineer", positionCount: 7 },
            { position: "Programmer", positionCount: 5 },
            { position: "DevOps Engineer", positionCount: 3 },
            { position: "Product Manager", positionCount: 2 },
            { position: "UX/UI Designer", positionCount: 1 },
          ]);
          setSkills([
            { skill: "JavaScript", skillCount: 12 },
            { skill: "Python", skillCount: 8 },
            { skill: "React", skillCount: 10 },
            { skill: "Docker", skillCount: 6 },
            { skill: "Node.js", skillCount: 7 },
          ]);
        }, 1500);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Prepare data for Pie Chart (Position Distribution)
  const positionData = {
    labels: positions.map((pos) => pos.position), // Position names
    datasets: [
      {
        label: "Number of Positions",
        data: positions.map((pos) => pos.positionCount), // Position counts
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Prepare data for Pie Chart (Skill Distribution)
  const skillData = {
    labels: skills.map((skill) => skill.skill), // Skill names
    datasets: [
      {
        label: "Number of Skills",
        data: skills.map((skill) => skill.skillCount), // Skill counts
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Position and Skill Distribution</h1>

      <div className="w-full md:w-1/2 mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">Position Distribution</h2>
        <Pie data={positionData} />
      </div>

      <div className="w-full md:w-1/2 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Skill Distribution</h2>
        <Pie data={skillData} />
      </div>
    </div>
  );
}
