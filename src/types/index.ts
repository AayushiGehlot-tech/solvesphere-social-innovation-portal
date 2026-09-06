export type UserRole = 'citizen' | 'student' | 'university' | 'industry' | 'government';

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW' | 'URGENT';

export type ProjectStatus =
  | 'PROBLEM_IDENTIFIED'
  | 'AI_ANALYZED'
  | 'MATCHING'
  | 'PROPOSALS_RECEIVED'
  | 'IN_PROGRESS'
  | 'FIELD_TESTING'
  | 'DEPLOYMENT'
  | 'COMPLETED'
  | 'IMPACT_MEASURED';

export type Category =
  | 'Water Management'
  | 'Agriculture'
  | 'Healthcare'
  | 'Education'
  | 'Waste Management'
  | 'Energy'
  | 'Environment';

export type ProviderType =
  | 'University'
  | 'Student Team'
  | 'Startup'
  | 'MSME'
  | 'Industry'
  | 'Research Lab'
  | 'NGO'
  | 'CSR Organization';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: Category;
  subCategory: string;
  location: string;
  district: string;
  state: string;
  priority: Priority;
  status: ProjectStatus;
  statusLabel: string;
  requiredExpertise: string[];
  aiSubCategory: string;
  similarChallenges: number;
  topMatch: number;
  peopleAffected: number;
  submittedBy: string;
  submittedDate: string;
  matchedProviders: number;
  progress: number;
  latestUpdate?: string;
}

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  verified: boolean;
  expertise: string[];
  technologies: string[];
  projectsCompleted: number;
  successfulDeployments: number;
  rating: number;
  districtsServed: string[];
  availability: 'Available' | 'Busy' | 'Limited';
  matchScore?: number;
  matchReasons?: string[];
  resources?: string[];
  description?: string;
  location?: string;
}

export interface Proposal {
  id: string;
  providerId: string;
  providerName: string;
  providerType: ProviderType;
  expertise: string;
  timeline: string;
  estimatedCost: string;
  rating: number;
  aiMatch: number;
  approach: string;
  technology: string[];
  team: string;
  previousExperience: string;
  expectedOutcomes: string[];
  shortlisted?: boolean;
}

export interface Project {
  id: string;
  name: string;
  challengeTitle: string;
  status: ProjectStatus;
  statusLabel: string;
  stakeholders: string[];
  progress: number;
  lifecycle: { label: string; status: 'done' | 'current' | 'pending' }[];
  fundingRequired: number;
  currentFunding: number;
  supportNeeded: string[];
  team: { name: string; role: string; avatar?: string }[];
  tasks: {
    id: string;
    title: string;
    status: 'todo' | 'in-progress' | 'completed';
    assignee: string;
    dueDate: string;
  }[];
  milestones: { id: string; title: string; date: string; completed: boolean }[];
  documents: { id: string; name: string; type: string; date: string; size: string }[];
  activity: { id: string; user: string; action: string; date: string; icon: string }[];
  messages: { id: string; user: string; message: string; date: string; avatar?: string }[];
}

export interface ImpactData {
  projectId: string;
  projectName: string;
  peopleBenefited: number;
  metrics: { label: string; value: string; trend?: string }[];
  villagesCovered: number;
  communitySatisfaction: number;
  impactScore: number;
  beforeAfter: { metric: string; before: string; after: string }[];
}

export interface Notification {
  id: string;
  type: 'proposal' | 'mentorship' | 'match' | 'milestone' | 'report' | 'funding' | 'team';
  message: string;
  date: string;
  read: boolean;
}

export interface GovMetric {
  totalChallenges: number;
  resolved: number;
  inProgress: number;
  pending: number;
  universities: number;
  industryPartners: number;
  patents: number;
  startupsCreated: number;
  villagesCovered: number;
  peopleBenefited: number;
}
