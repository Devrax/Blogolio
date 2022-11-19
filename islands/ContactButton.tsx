import { useRef } from "preact/hooks";
import { ContactRef } from "@interfaces/ContactRef.ts";

interface ContactUser extends ContactRef {
	userName: string;
}

export default function ContactButton(contact: ContactUser) {
	const anchorRef = useRef(null);

	return (
		<span
			onClick={() => processRedirection(contact, anchorRef)}
			class="flex flex-col items-center fill-white hover:text-yellow-500 hover:fill-yellow-500 cursor-pointer"
			title={`${contact.userName}'s ${contact.siteName}`}
		>
			<a
				class="hidden"
				ref={anchorRef}
				rel="noopener author external noreferrer"
			></a>
			<span
				class="w-6 h-6 block animate-bounce"
				dangerouslySetInnerHTML={{ __html: contact.iconPath }}
			></span>
			<span>{contact.siteName}</span>
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
	switch (contact.siteName) {
		case "Gmail":
			anchorRef.href = "mailto:" + contact.siteUrl + "@" + "gmail.com";
			break;
		case "Blog":
			anchorRef.rel = "next";
			anchorRef.target = "_self";
			break;
	}
	anchorRef.click();
}
