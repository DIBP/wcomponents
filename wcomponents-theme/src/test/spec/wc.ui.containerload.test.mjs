import {setUpExternalHTML} from "../helpers/specUtils.mjs";
import {setView} from "wc/dom/initialise.mjs";
import Trigger from "wc/ajax/Trigger.mjs";

describe("wc/dom/containerload", () => {

	let testHolder;

	beforeAll(function() {
		testHolder = document.body.appendChild(document.createElement("div"));
	});

	afterAll(function() {
		testHolder.innerHTML = "";
	});

	// beforeEach(() => {
	// 	return setUpExternalHTML("domUsefulDom.html").then(dom => {
	// 		setView(dom.window);
	// 	});
	// });

	it("sends a separate ajax request for each eager component", function(done) {
		let callCount = 0;
		const expectedCalls = 3;
		const ids = ["someFakeID", "anotherFakeID", "aThirdFakeID"];

		// TODO maybe change to have the actual component (eg tab, section) wrapper also
		const html = `
			<wc-ajax mode="eager">${ids[0]}</wc-ajax>
			<wc-ajax mode="eager">${ids[1]}</wc-ajax>
			<wc-ajax mode="eager">${ids[2]}</wc-ajax>`;

		/* would like to test if the fire is actually resolved or not
		 * but i don't think that can be done without a backend
		 */
		let fireSpy = spyOn(Trigger.prototype, "fire").and.callFake(() => {
			callCount++;
			if (callCount === expectedCalls) {
				done();
			}
		});

		// TODO consider adding argument (the ids) check

		testHolder.innerHTML = html;
	});
});
