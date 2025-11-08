import React from "react";
import "../../../assets/styles/CalendarPlant.css";
import type { Plant } from "../services/plantService";

interface CalendarPlantProps {
  plant: Plant;
}

const months = ["jan", "fév", "mar", "avr", "mai", "jun", "jul", "aoû", "sep", "oct", "nov", "déc"];

const CalendarPlant: React.FC<CalendarPlantProps> = ({ plant }) => {

  const renderTimeline = (start: string, end: string) => {
    // Convertit les 3 premières lettres pour correspondre au tableau months
    const startIndex = months.findIndex(m => m.toLowerCase() === start.slice(0,3).toLowerCase());
    const endIndex = months.findIndex(m => m.toLowerCase() === end.slice(0,3).toLowerCase());

    return months.map((month, index) => {
      const active = startIndex <= endIndex
        ? index >= startIndex && index <= endIndex
        : index >= startIndex || index <= endIndex; // traverse décembre

      return (
        <div className={`month-box ${active ? "active" : ""}`} key={month}>
          {month}
        </div>
      );
    });
  };

  return (
    <div className="calendar-plant-container">
      <h3 className="calendar-title">📅 Calendrier de Culture</h3>

      {/* Semis */}
      {plant.sowing_date && (
        <div className="calendar-section">
          <p className="calendar-label">🌱 Semis</p>
          <div className="calendar-row">
            {renderTimeline(plant.sowing_date.start, plant.sowing_date.end)}
          </div>
        </div>
      )}

      {/* Plantation */}
      {plant.plant_date && (
        <div className="calendar-section">
          <p className="calendar-label">🌿 Plantation</p>
          <div className="calendar-row">
            {renderTimeline(plant.plant_date.start, plant.plant_date.end)}
          </div>
        </div>
      )}

      {/* Récolte */}
      {plant.harvest_date && (
        <div className="calendar-section">
          <p className="calendar-label">🍅 Récolte</p>
          <div className="calendar-row">
            {renderTimeline(plant.harvest_date.start, plant.harvest_date.end)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPlant;
