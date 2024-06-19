import rtf from "wc/ui/rtf.mjs";
import timers from "wc/timers.mjs";
import initialise from "wc/dom/initialise.mjs";

describe("wc/ui/rtf", () => {
	it("sets a callback for every nonempty invocation of register", (done) => {
		spyOn(initialise, "addCallback");
		rtf.register(["exID", "anotherEx"]);
		rtf.register(["exID"]);
		rtf.register([]);
		timers.setTimeout(function() {
			expect(initialise.addCallback).toHaveBeenCalledTimes(2);
			done();
		}, 100);
	});
});
