import React from "react";
import "./CalendarPlant.css";
import type { Plant } from "../../../../models/plant/IPlant";

interface CalendarPlantProps {
  plant: Plant;
}

const months = ["jan", "fév", "mar", "avr", "mai", "jun", "jul", "aoû", "sep", "oct", "nov", "déc"];

// start et end sont des numéros de mois → 1 à 12
const renderTimeline = (start: number, end: number) => {
  const startIndex = start - 1; 
  const endIndex = end - 1;

  return months.map((month, index) => {
    const active =
      startIndex <= endIndex
        ? index >= startIndex && index <= endIndex
        : index >= startIndex || index <= endIndex; // gestion de la boucle (ex: oct → fév)

    return (
      <div className={`month-box ${active ? "active" : ""}`} key={month}>
        {month}
      </div>
    );
  });
};

const CalendarPlant: React.FC<CalendarPlantProps> = ({ plant }) => {
  // L'API peut renvoyer deux formats :
  // - [{ sowingDate: {...} }, ...]
  // - [{ id:..., start_month:..., end_month:... }, ...]
  // On gère les deux cas en prenant soit la propriété wrapper soit l'objet lui-même.
  const sowingRaw: any = plant.sowingDates?.[0];
  const plantingRaw: any = plant.plantDates?.[0];
  const harvestRaw: any = plant.harvestDates?.[0];

  const sowing: any = sowingRaw?.sowingDate ?? sowingRaw;
  const planting: any = plantingRaw?.plantDate ?? plantingRaw;
  const harvest: any = harvestRaw?.harvestDate ?? harvestRaw;

  return (
    <div className="calendar-plant-container">
      <h3 className="calendar-title">📅 Calendrier de Culture</h3>

      {sowing && sowing.start_month && sowing.end_month && (
        <div className="calendar-section">
          <p className="calendar-label">🌱 Semis</p>
          <div className="calendar-row">
            {renderTimeline(sowing.start_month, sowing.end_month)}
          </div>
        </div>
      )}

      {planting && planting.start_month && planting.end_month && (
        <div className="calendar-section">
          <p className="calendar-label">🌿 Plantation</p>
          <div className="calendar-row">
            {renderTimeline(planting.start_month, planting.end_month)}
          </div>
        </div>
      )}

      {harvest && harvest.start_month && harvest.end_month && (
        <div className="calendar-section">
          <p className="calendar-label">🍅 Récolte</p>
          <div className="calendar-row">
            {renderTimeline(harvest.start_month, harvest.end_month)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPlant;
