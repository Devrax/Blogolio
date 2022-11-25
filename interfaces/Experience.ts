import { LeadStatus } from "../enums/LeadStatus.ts";

export interface Experience {
	companyName: string;
	positionName: string;
	positionRole: string;
	startDate: Date | string;
	endDate?: Date | string;
	experienceDescriptions: ExperienceDescription[];
}

export interface ExperienceDescription {
	title: string;
	description?: string;
	details?: ExperienceDetail[];
}

export interface ExperienceDetail {
	leadText?: string;
	leadStatus?: LeadStatus | string;
	description: string;
	link?: string;
	topics?: string[];
}
