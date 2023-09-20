import {fileURLToPath} from "url";

/**
 * To help with type checking, get a select element from here.
 * @param {string} id
 * @returns {HTMLSelectElement}
 */
export const getSelect = (id) => /** @type {HTMLSelectElement} */(document.getElementById(id));

/**
 * To help with type checking, get an input element from here.
 * @param {string} id
 * @returns {HTMLInputElement}
 */
export const getInput = (id) => /** @type {HTMLInputElement} */(document.getElementById(id));

/**
 * Gets the path to src/test/resource or src/main/resource
 * @param {string} subPath A file name to append, e.g. "file.txt"
 * @param {boolean} main If true will get the path to src/main/resource
 * @returns {string} The path to the resource dir
 */
export const getResoucePath = (subPath, main) => {
	const type = main ? "main" : "test";
	const url = new URL(`../../${type}/resource/${subPath}`, import.meta.url);
	return fileURLToPath(url);
};
