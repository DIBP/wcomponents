/**
 * "Safe" conversion of HTML to DocumentFragment.
 * @param {String} html the HTML to convert to a document fragment
 * @param {boolean} isTemplate set to true if the html string is an HTML template element
 * TODO doubt we need this any more, deleted half of it already (also could use HTML templates)
 * @return {DocumentFragment | undefined}
 */
export default function toDocFragment(html, isTemplate=false) {
	if (isTemplate) {
		return templateVersion(html);
	}
	const result = document.createDocumentFragment();
	const tmpDF = document.createDocumentFragment();
	const tmpElement = tmpDF.ownerDocument.createElement("div");
	const tmpContainer = tmpDF.appendChild(tmpElement);
	tmpContainer.innerHTML = html;
	let next;
	while ((next = tmpContainer.firstChild)) {
		result.appendChild(next);
	}
	return result;
}

/**
 *
 * @param html
 * @return {DocumentFragment | undefined}
 */
function templateVersion(html) {
	const parentElement = document.head;
	const beforeTemplates = parentElement.querySelectorAll("template");
	parentElement.insertAdjacentHTML("beforeend", html);
	const newTemplate = parentElement.querySelectorAll("template")[beforeTemplates.length];
	return newTemplate?.content;
}
