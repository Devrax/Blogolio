/** @jsx h */
import { h } from "preact";
import { useRef } from "preact/hooks";
import { tw } from "@utils/twind.ts";
import { ContactRef } from "@interfaces/ContactRef.ts";

interface ContactUser extends ContactRef {
	userName: string;
}

export default function ContactButton(contact: ContactUser) {
	const anchorRef = useRef(null);

	return (
		<span
			class={tw`flex flex-col items-center fill-white`}
			title={`${contact.userName}'s ${contact.siteName}`}
		>
			<a
				class={tw`hidden`}
				ref={anchorRef}
				rel="noopener author external noreferrer"
			></a>
			<span
				class={tw`w-6 h-6 block`}
				dangerouslySetInnerHTML={{ __html: contact.iconPath }}
			></span>
			<span onClick={() => processRedirection(contact, anchorRef)}>
				{contact.siteName}
			</span>
		</span>
	);
}

/**
 * Email Obfuscation
 */
function processRedirection(contact: ContactRef, event: any) {
	const anchorRef: HTMLAnchorElement = event.current!;
	anchorRef.target = "_blank";
	anchorRef.href = contact.siteUrl;
	if (contact.siteName === "Gmail") {
		anchorRef.href = "mailto:" + contact.siteUrl + "@" + "gmail.com";
	}
	anchorRef.click();
	anchorRef.href = "";
}
