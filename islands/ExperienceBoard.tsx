import { normalBadge, shieldBadge } from "@utils/badgeShields.ts";
import { Experience } from "@interfaces/Experience.ts";
import { LeadStatus } from "../enums/LeadStatus.ts";

const messagesTitle: { [key in LeadStatus]: string } = {
	[LeadStatus["NOT_PUBLISHED"]]:
		"It's mean that is no possible to download directly from appstore or Google Play",
	[LeadStatus["PUBLISHED"]]:
		"It's available for download from appstore or Google Play",
	[LeadStatus["REMOVED"]]:
		"It was published but for some reason it was removed by the client",
};

export default function ExperienceBoard(experience: Experience) {
	const timeFormat = (t: Date | string, locale = "en") =>
		new Date(t).toLocaleDateString(locale);

	const mergeTexts =
		(joiner: string) =>
		(...args: string[]): string =>
			args.filter(Boolean).join(joiner);

	return (
		<section class="text-white text-justify mb-10">
			<h1 class="text-xl lg:text-2xl">
				<b>{experience?.companyName}</b>, {experience?.positionName} -{" "}
				{experience?.positionRole}
			</h1>
			<p class="text-gray-300 text-xs mb-2 block">
				{mergeTexts(" - ")(
					timeFormat(experience?.startDate),
					experience?.endDate
						? timeFormat(experience.endDate)
						: "Present"
				)}
			</p>
			<div>
				{experience?.experienceDescriptions.map((exp) => (
					<div class="mb-2">
						<h2 class="text-lg font-bold lg:text-xl">
							{exp?.title}
						</h2>
						{exp?.description && <p>{exp?.description}</p>}
						<ul class="list-disc pl-5">
							{exp?.details?.map((detail) => (
								<li class="mb-2 text-sm lg:text-base">
									{mergeTexts(": ")(
										detail.leadText!,
										detail.description
									)}
									{Array.isArray(detail?.topics) && (
										<span class="flex flex-wrap">
											{detail.topics.map(
												(topic: string) => (
													<img
														class="mr-1 mb-1"
														src={shieldBadge(topic)}
														alt={topic}
													/>
												)
											)}
											{detail.leadStatus
												?.split("/")
												.map((status) => (
													<span
														class="mr-1"
														title={
															messagesTitle[
																status.toLocaleUpperCase() as LeadStatus
															]
														}
													>
														<img
															src={normalBadge(
																status
															)}
														/>
													</span>
												))}
										</span>
									)}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}
