import type { GardenDraft } from "./gardenService";

const DRAFT_KEY = "gardenDraft";

export const saveDraft = (draft?: GardenDraft) => {
  try {
    if (!draft) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch (e) {
    console.error("Erreur saveDraft:", e);
  }
};

export const getDraft = (): GardenDraft | undefined => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as GardenDraft;
  } catch (e) {
    console.error("Erreur getDraft:", e);
    return undefined;
  }
};

export const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (e) {
    console.error("Erreur clearDraft:", e);
  }
};

export default {
  saveDraft,
  getDraft,
  clearDraft
};
