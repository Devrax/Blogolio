/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { SkillLevel, SkillSection, SkillYears } from "@interfaces/Skill.ts";
import { tw } from "@utils/twind.ts";
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
		<li class={tw`mr-2 mb-2`}>
			<img
				src={labelBadge(skType.skill, skType.years)}
				alt={skType.skill}
			/>
		</li>
	);
};

const skillType = (sk: SkillSection) =>
	sk?.listType === "DISC" ? (
		<ul class={tw`list-dic pl-5`}>
			{(sk.skills as SkillLevel[]).map(skillLevel)}
		</ul>
	) : (
		<ul class={tw`flex flex-wrap`}>
			{(sk.skills as SkillYears[]).map(skillYear)}
		</ul>
	);

export default function (skill: SkillSection) {
	return (
		<section class={tw`text-white mb-5 w-56`}>
			<div class={tw`mb-2`}>
				<h1 class={tw`inline mr-2 font-bold`}>{skill?.section}</h1>
			</div>
			{skillType(skill)}
		</section>
	);
}
