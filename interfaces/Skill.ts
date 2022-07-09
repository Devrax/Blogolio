type MoreOrLess = ">" | "<";
type RangeType = 1 | 2 | 3 | 4 | 5;

export interface Skill {
	skill: string;
}

export interface SkillLevel extends Skill {
	level: string;
	validation?: string;
}

export interface SkillYears extends Skill {
	years: `${MoreOrLess}${RangeType}`;
}

export interface SkillSection {
	section: string;
	legend?: string;
	listType: "DISC" | "BADGE";
	skills: SkillLevel[] | SkillYears[];
}
