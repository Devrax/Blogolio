import { SkillLevel, SkillSection, SkillYears } from "@interfaces/Skill.ts";
import { labelBadge } from "@utils/badgeShields.ts";

const skillLevel = (skType: SkillLevel) => {
	const mainContent = (
		<>
			<b>{skType?.skill}</b>:&nbsp;{skType.level}
		</>
	);

	return (
		<li>
			{skType?.validation ? (
				<a href={skType.validation}>{mainContent}</a>
			) : (
				mainContent
			)}
		</li>
	);
};

const skillYear = (skType: SkillYears) => {
	return (
		<li class="mr-2 mb-2">
			<img
				src={labelBadge(skType.skill, skType.years)}
				alt={skType.skill}
			/>
		</li>
	);
};

const skillType = (sk: SkillSection) =>
	sk?.listType === "DISC" ? (
		<ul class="list-dic pl-5">
			{(sk.skills as SkillLevel[]).map(skillLevel)}
		</ul>
	) : (
		<ul class="flex flex-wrap">
			{(sk.skills as SkillYears[]).map(skillYear)}
		</ul>
	);

export default function (skill: SkillSection) {
	return (
		<section class="text-white mb-5 lg:w-56 w-full">
			<div class="mb-2">
				<h1 class="inline mr-2 font-bold">{skill?.section}</h1>
			</div>
			{skillType(skill)}
		</section>
	);
}
