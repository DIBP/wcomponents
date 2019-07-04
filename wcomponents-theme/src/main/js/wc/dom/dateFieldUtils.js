define(["wc/date/Format", "wc/has", "wc/date/parsers", "wc/date/interchange", "wc/dom/Widget"], function(Format, has, parsers, interchange, Widget) {
	var FIELD_CLASS = "wc-datefield",
		widgets,
		FAKE_VALUE_ATTRIB = "data-wc-value",  // TODO duplicated from dateField
		utils = {
			/**
			 * Get a list of potential date matches based on the user's input.
			 * @function
			 * @private
			 * @param {Element} element The input element of the date field.
			 * @returns {String[]} Potential dates as strings.
			 */
			getMatches: function (element) {
				var value = element.value,
					parser = utils.getParser(element),
					matches = parser.parse(value);
				return matches;
			},
			/**
			 * Gets the raw value for the given date field.
			 * @param {Element} element Any part of any kind of date field supported by wc/ui/dateField
			 * @return {String} The raw value of the date field.
			 */
			getRawValue: function getRawValue(element) {
				var result, textbox, container;
				if (element) {
					container = utils.get(element) || element;
					if ((result = container.getAttribute(FAKE_VALUE_ATTRIB))) {
						return result;
					}
					if (utils.hasNativeInput(element, true) && (result = element.value)) {
						return result;
					}

					if ((textbox = utils.getTextBox(container)) && (result = textbox.value)) {
						// we don't have a recorded xfer date for this element, check its value
						return result;
					}
					if (element.firstChild && element.firstChild.nodeType === Node.TEXT_NODE) {
						// something like <span>28 JUN 2019</span>
						result = element.firstChild.textContent;
					}
				}
				return result || "";
			},
			/**
			 * Finds the correct date parser for this element.
			 * @function
			 * @private
			 * @param {Element} element A date input element.
			 * @returns {Parser} An instance of {@link module:wc/date/Parser}
			 */
			getParser: function getParser(element) {
				var result, widgetMap = utils.getWidgets();
				if (widgetMap.DATE_PARTIAL.isOneOfMe(element) || widgetMap.DATE_PARTIAL.findDescendant(element)) {
					result = parsers.get(parsers.type.PARTIAL);
				} else {
					result = parsers.get();
				}
				return result;
			},
			getWidgets: function() {
				return widgets || (widgets = createWidgets());
			},
			/**
			 * Indicates that the requested element is a dateField OR the textbox sub-component
			 * @function module:wc/dom/dateFieldUtils.isOneOfMe
			 * @public
			 * @param {Element} element The DOM element to test
			 * @param {Boolean} [onlyContainer] Set `true` to test if the element is exactly the dateField, explicitly
			 *    `false` to test if only the input element.
			 * @returns {Boolean} true if the passed in element is a dateField or date input textbox sub-component of a
			 *    dateField
			 */
			isOneOfMe: function (element, onlyContainer) {
				var result,
					widgetMap = utils.getWidgets();
				if (onlyContainer) {
					result = widgetMap.DATE_WRAPPER_INCL_RO.isOneOfMe(element);
				} else if (onlyContainer === false) {
					result = widgetMap.INPUT.isOneOfMe(element);
				} else {
					result = Widget.isOneOfMe(element, [widgetMap.INPUT, widgetMap.DATE_WRAPPER_INCL_RO]);
				}
				return result;
			},
			/**
			 * Determine if this element contains a partial date.
			 * Note the following:
			 * - an empty value returns false
			 * - an invalid value returns 1
			 * - a partial date value returns true
			 * - a full date returns false
			 * @param {Element} element The date field to test.
			 * @return {Number|Boolean} Truthy if it contains a partial date or unparseable date, otherwise false.
			 */
			hasPartialDate: function (element) {
				var result = false,
					value = this.getRawValue(element),
					parser = parsers.get(parsers.type.PARTIAL),  // We always want the the most inclusive (the partial parser) here
					formatter = Format.getDefaultFormatter();

				if (value) {
					if (!interchange.isValid(value)) {
						value = formatter.reverse(value, { parser: parser });
					}
					if (value) {
						result = !interchange.isComplete(value);
					} else {
						// if there is a value BUT it is not even a parseable date then return 0 to differentiate.
						result = 1;
					}
				}

				return result;
			},
			/**
			 * Get the value (in transfer format yyyy-mm-dd) from a date field component.
			 * @function  module:wc/dom/dateFieldUtils.getValue
			 * @public
			 * @param {Element} element The date field we want to get the value from.
			 * @param {Boolean} [guess] If true then try a best guess at the transfer format when formatting it. For
			 *    more info see {@link module:wc/date/Fomat~reverse}
			 * @returns {String} The date in transfer format or an empty string if the field has no value.
			 */
			getValue: function(element, guess) {
				var formatter, parser,  result = utils.getRawValue(element);
				formatter = Format.getDefaultFormatter();
				parser = utils.getParser(element);
				result = formatter.reverse(result, { guess: guess, parser: parser });
				return result || "";
			},
			/**
			 * Get the text input element descendant of a date field.
			 * @function module:wc/dom/dateFieldUtils.getTextBox
			 * @public
			 * @param {Element} element A dateField.
			 * @returns {Element} The input element of the dateField.
			 */
			getTextBox: function (element) {
				return utils.getWidgets().INPUT.findDescendant(element);
			},
			get: function(element) {
				return utils.getWidgets().DATE_FIELD.findAncestor(element);
			},
			/**
			 * Is a particular date field or input a native date input?
			 * @function module:wc/dom/dateFieldUtils.hasNativeInput
			 * @public
			 * @param {Element} el The element to test.
			 * @param {Boolean} [forceInput] Set true if we know we are calling with an input element to save a test.
			 * @returns {Boolean} True if el is a native date input (or the datefield wrapper of one).
			 */
			hasNativeInput: function (el, forceInput) {
				var textBox;
				if (has("native-dateinput")) {
					if (forceInput) {
						textBox = el;
					} else {
						textBox = widgets.DATE_FIELD.isOneOfMe(el) ? utils.getTextBox(el) : el;
					}
					return textBox ? widgets.DATE.isOneOfMe(textBox) : false;
				}
				return false;
			},
			isReadOnly: function (element) {
				return utils.getWidgets().DATE_RO.isOneOfMe(element);
			}
		};

	function createWidgets() {
		var widgetMap = {
			DATE_FIELD: new Widget("div", FIELD_CLASS),
			DATE_WRAPPER_INCL_RO: new Widget("", FIELD_CLASS),
			DATE_RO: new Widget("", "", {"data-wc-component": "datefield"}),
			INPUT: new Widget("input"),
			SUGGESTION_LIST: new Widget("", "", { role: "listbox"}),
			OPTION_WD: new Widget("", "", { role: "option"}),
			LAUNCHER: new Widget("button", "wc_wdf_cal"),
			SWITCHER: new Widget("input", "", { type: "checkbox" }),
			CUSTOM: new Widget("wc-dateinput")
		};
		widgetMap.DATE = widgetMap.INPUT.extend("", { type: "date"});
		widgetMap.DATE_PARTIAL = widgetMap.INPUT.extend("", { type : "text"});
		widgetMap.INPUT.descendFrom(widgetMap.DATE_FIELD, true);
		widgetMap.DATE.descendFrom(widgetMap.DATE_FIELD, true);
		widgetMap.DATE_PARTIAL.descendFrom(widgetMap.DATE_FIELD, true);
		widgetMap.SUGGESTION_LIST.descendFrom(widgetMap.DATE_FIELD, true);
		return widgetMap;
	}

	return utils;
});