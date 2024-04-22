import "wc/ui/table.mjs";
import {getButton} from "../helpers/specUtils.mjs";
import {getAllByRole} from "@testing-library/dom";

describe("wc/ui/table", ()=> {
	const selectId = "eg-_3a3a";
	const deleteId = "eg-_3a3b";
	const editId = "eg-_3a3c";

	let ownerDocument;
	let testHolder;

	beforeAll(function() {
		const testContent = `
			<div id="eg-_3a" class="wc-table wc-table-table" aria-live="polite" data-wc-pagemode="dynamic">
				<div class="wc_table_top_controls">
					<div class="wc_table_sel_cont">
						<span id="eg-_3a_tb_st" role="radiogroup" data-wc-target="eg-_3a_tb" class="wc-rowselection wc_seltog">
							<span data-wc-for="eg-_3a_tb_st" id="eg-_3a_tb_st_l">Select:</span>
							<button id="eg-_3a_tb-all" data-testid="eg-_3a_tb-all" role="radio"
								class="wc-linkbutton wc_rowselection wc_seltog" data-wc-value="all" type="button"
								aria-checked="false" aria-controls="eg-_3a_0 eg-_3a_1 eg-_3a_2 eg-_3a_3 eg-_3a_4"
								aria-labelledby="eg-_3a_tb_st_l">All</button>
							<button id="eg-_3a_tb-none" data-testid="eg-_3a_tb-none" role="radio"
								class="wc-linkbutton wc_rowselection wc_seltog" data-wc-value="none" type="button"
								aria-checked="true" aria-controls="eg-_3a_0 eg-_3a_1 eg-_3a_2 eg-_3a_3 eg-_3a_4"
								aria-labelledby="eg-_3a_tb_st_l">None</button>
						</span>
					</div>
				</div>
				<table aria-multiselectable="true" data-wc-rpp="5">
					<colgroup>
						<col class="wc_table_colauto">
						<col>
						<col>
						<col>
					</colgroup>
					<thead>
						<tr>
							<th class="wc_table_sel_wrapper" scope="col" aria-hidden="true"></th>
							<th id="eg-_3a_thh1" scope="col" data-wc-columnidx="0" class="wc-th">
								<div id="eg-_3a0a0" class="wc-decoratedlabel">
									<div id="eg-_3a0a0-body" class="wc-labelbody wc_dlbl_seg">First name</div>
								</div>
							</th>
							<th id="eg-_3a_thh2" scope="col" data-wc-columnidx="1" class="wc-th">
								<div id="eg-_3a0b0" class="wc-decoratedlabel">
									<div id="eg-_3a0b0-body" class="wc-labelbody wc_dlbl_seg">Last name</div>
								</div>
							</th>
							<th id="eg-_3a_thh3" scope="col" data-wc-columnidx="2" class="wc-th">
								<div id="eg-_3a0c0" class="wc-decoratedlabel">
									<div id="eg-_3a0c0-body" class="wc-labelbody wc_dlbl_seg">DOB</div>
								</div>
							</th>
						</tr>
					</thead>
					<tbody id="eg-_3a_tb" class="wc-tbody wc_tbl_table">
						<tr class="wc-tr wc_table_pag_row wc-invite" data-wc-rowindex="0" id="eg-_3a_0" role="row"
							aria-selected="false" tabindex="0" data-wc-name="eg-_3a.selected" data-wc-value="0">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i></td>
							<td class="wc-td" headers="eg-_3a_thh1">Joe</td>
							<td class="wc-td" headers="eg-_3a_thh2">Bloggs</td>
							<td class="wc-td" headers="eg-_3a_thh3"><span id="eg-_3a-row-r0-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1973-02-01">01 Feb 1973</span></td>
						</tr>
						<tr class="wc-tr wc_table_pag_row wc-invite" data-wc-rowindex="1" id="eg-_3a_1" role="row"
							aria-selected="false" tabindex="0" data-wc-name="eg-_3a.selected" data-wc-value="1">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i></td>
							<td class="wc-td" headers="eg-_3a_thh1">Richard</td>
							<td class="wc-td" headers="eg-_3a_thh2">Starkey</td>
							<td class="wc-td" headers="eg-_3a_thh3"><span id="eg-_3a-row-r1-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1976-08-04">04 Aug 1976</span></td>
						</tr>
						<tr class="wc-tr wc_table_pag_row wc-invite" data-wc-rowindex="2" id="eg-_3a_2" role="row"
							aria-selected="false" tabindex="0" data-wc-name="eg-_3a.selected" data-wc-value="2">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i></td>
							<td class="wc-td" headers="eg-_3a_thh1">Peter</td>
							<td class="wc-td" headers="eg-_3a_thh2">Sellers</td>
							<td class="wc-td" headers="eg-_3a_thh3"><span id="eg-_3a-row-r2-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1999-12-21">21 Dec 1999</span></td>
						</tr>
						<tr class="wc-tr wc_table_pag_row wc-invite" data-wc-rowindex="3" id="eg-_3a_3" role="row"
							aria-selected="false" tabindex="0" data-wc-name="eg-_3a.selected" data-wc-value="3">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i></td>
							<td class="wc-td" headers="eg-_3a_thh1">Tom</td>
							<td class="wc-td" headers="eg-_3a_thh2">Smith</td>
							<td class="wc-td" headers="eg-_3a_thh3"><span id="eg-_3a-row-r3-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1963-09-16">16 Sep 1963</span></td>
						</tr>
						<tr class="wc-tr wc_table_pag_row wc-invite" data-wc-rowindex="4" id="eg-_3a_4" role="row"
							aria-selected="false" tabindex="0" data-wc-name="eg-_3a.selected" data-wc-value="4">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i></td>
							<td class="wc-td" headers="eg-_3a_thh1">Mary</td>
							<td class="wc-td" headers="eg-_3a_thh2">Jane</td>
							<td class="wc-td" headers="eg-_3a_thh3"><span id="eg-_3a-row-r4-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1972-04-02">02 Apr 1972</span></td>
						</tr>
					</tbody>
				</table>
				<div class="wc_table_bottom_controls">
					<div class="wc_table_pag_cont">
						<span class="wc_table_pag_rows" data-wc-tablerpp="5" data-wc-tablerows="16" data-wc-tablepage="0">
							<span class="wc_table_pag_rowstart">1</span> - <span class="wc_table_pag_rowend">5</span> of <span class="wc_table_pag_total">16</span>results
						</span>
						<label for="eg-_3a.page">Page
							<select id="eg-_3a.page" class="wc_table_pag_select"
								data-wc-pages="4">
								<option value="0" selected="selected">1</option>
								<option value="1">2</option>
								<option value="2">3</option>
								<option value="3">4</option>
							</select>
						</label>
						<span class="wc_table_pag_btns">
							<button id="eg-_3a.pagination.1" data-testid="eg-_3a.pagination.1" title="First page"
								type="button" class="wc_btn_icon wc-invite" disabled="">
								<i aria-hidden="true" class="fa fa-fw fa-angle-double-left"></i>
							</button>
							<button id="eg-_3a.pagination.2" data-testid="eg-_3a.pagination.2"
								title="Previous page" type="button" class="wc_btn_icon wc-invite" disabled="">
								<i aria-hidden="true" class="fa fa-fw fa-angle-left"></i>
							</button>
							<button id="eg-_3a.pagination.3" data-testid="eg-_3a.pagination.3" title="Next page" type="button" class="wc_btn_icon wc-invite">
								<i aria-hidden="true" class="fa fa-fw fa-angle-right"></i>
							</button>
							<button id="eg-_3a.pagination.4" data-testid="eg-_3a.pagination.4" title="Last page" type="button" class="wc_btn_icon wc-invite">
								<i aria-hidden="true" class="fa fa-fw fa-angle-double-right"></i>
							</button>
						</span>
					</div>
					<div class="wc-actions">
						<wc-tblaction>
							<wc-tblcondition min="1" max="3" other="0" type="error" message="One to three rows must be selected"></wc-tblcondition>
							<button id="eg-_3a3a" data-testid="eg-_3a3a" name="eg-_3a3a"
								value="x" type="submit" class="wc-button" aria-controls="eg-_3b" formnovalidate="formnovalidate"
								disabled="disabled">Select</button>
						</wc-tblaction>
						<wc-tblaction>
							<wc-tblcondition min="1" other="0" type="error" message="At least one row must be selected"></wc-tblcondition>
							<wc-tblcondition max="1" other="0" type="warning" message="Are you sure you wish to delete these rows?"></wc-tblcondition>
							<button id="eg-_3a3b" data-testid="eg-_3a3b"
								name="eg-_3a3b" value="x" type="submit" class="wc-button" aria-controls="eg-_3b"
								formnovalidate="formnovalidate"
								disabled="disabled">Delete</button>
						</wc-tblaction>
						<wc-tblaction>
							<wc-tblcondition min="1" max="1" other="0" type="error" message="Exactly one row must be selected"></wc-tblcondition>
							<button id="eg-_3a3c" data-testid="eg-_3a3c" name="eg-_3a3c" value="x" type="submit" class="wc-button" aria-controls="eg-_3b" formnovalidate="formnovalidate" disabled="disabled">Edit</button>
						</wc-tblaction>
						<wc-tblaction>
							<button id="eg-_3a3d" data-testid="eg-_3a3d" name="eg-_3a3d" value="x" type="submit" class="wc-button" formnovalidate="formnovalidate">Refresh</button>
						</wc-tblaction>
					</div>
				</div>
				<input type="hidden" name="eg-_3a-h" value="x">
			</div>`;
		ownerDocument = document;
		testHolder = ownerDocument.body;
		testHolder.innerHTML = testContent;
	});

	afterAll(() => {
		testHolder.innerHTML = "";
	});

	it("Select button should be enabled when action constraint met", function(done) {
		const selectButton = getButton(testHolder, selectId);
		const deleteButton = getButton(testHolder, deleteId);
		const editButton = getButton(testHolder, editId);

		expect(selectButton.hasAttribute("disabled")).withContext(`button ${selectId} should be disabled`).toBeTruthy();
		expect(deleteButton.hasAttribute("disabled")).withContext(`button ${deleteButton} should be disabled`).toBeTruthy();
		expect(editButton.hasAttribute("disabled")).withContext(`button ${editButton} should be disabled`).toBeTruthy();
		const rows = getAllByRole(testHolder, "row");
		let rowIdx = rows.length - 1;
		clickAndWait(rows[rowIdx--]).then(() => {
			expect(selectButton.hasAttribute("disabled")).withContext(`button ${selectId} should be enabled`).toBeFalsy();
			expect(deleteButton.hasAttribute("disabled")).withContext(`button ${deleteId} should be enabled`).toBeFalsy();
			expect(editButton.hasAttribute("disabled")).withContext(`button ${editId} should be enabled`).toBeFalsy();
			return clickAndWait(rows[rowIdx--]).then(() => {
				expect(selectButton.hasAttribute("disabled")).withContext(`button ${selectId} should be enabled`).toBeFalsy();
				expect(deleteButton.hasAttribute("disabled")).withContext(`button ${deleteId} should be enabled`).toBeFalsy();
				expect(editButton.hasAttribute("disabled")).withContext(`button ${editId} should be disabled`).toBeTruthy();
				setTimeout(done, 250);
			});
		});
	});
});

function clickAndWait(element) {
	return new Promise(win => {
		setTimeout(win, 50);
		const clickEvent = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
			view: window
		});
		element.dispatchEvent(clickEvent);
	});
}
