import {setUpExternalHTML} from "../helpers/specUtils.mjs";
import {setView} from "wc/dom/initialise.mjs";
import Trigger from "wc/ajax/Trigger.mjs";
import containerload from "wc/ui/containerload.mjs";

describe("wc/dom/containerload", () => {

	let testHolder;

	beforeAll(function() {
		testHolder = document.body.appendChild(document.createElement("div"));
	});

	afterAll(function() {
		testHolder.innerHTML = "";
	});

	it("sends a separate ajax request for each eager component", function(done) {
		let callCount = 0;
		const expectedCalls = 3;
		const ids = ["someFakeID", "anotherFakeID", "aThirdFakeID"];

		let html = '';

		for (let i = 0; i < ids.length; i++) {
			html += `
				<div id=${ids[i]}></div>
				<wc-ajax mode="eager">${ids[i]}</wc-ajax>
			`;
		}

		spyOn(Trigger.prototype, "fire").and.callFake(() => {
			callCount++;
			if (callCount === expectedCalls) {
				done();
			}
			return Promise.resolve();
		});

		testHolder.innerHTML = html;
	});
});
