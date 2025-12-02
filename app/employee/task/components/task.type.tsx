// task.types.ts

export interface Task {
  role: "web_developer" | "graphic_designer" | "video_editor" | "marketer";
  employeeId: string; // MongoDB ObjectId as string
  bdDate: string; // formatted date (YYYY-MM-DD)
  attendance: "present" | "absent" | "leave";
  hours: number;
  companies: string;
  projectDetails?: string;

  // Role-specific fields
  numberOfWebsites?: number; // for web_developer
  numberOfDesigns?: number; // for graphic_designer
  numberOfVideos?: number; // for video_editor
  adsPlatform?: string; // for marketer
  numberOfPlatforms?: number; // for marketer

  // Common metadata
  createdAt?: string;
  updatedAt?: string;
  _id?: string; // optional if returned from backend
}
