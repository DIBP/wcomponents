import "wc/ui/table.mjs";
import {getButton} from "../helpers/specUtils.mjs";
import {getAllByRole} from "@testing-library/dom";

describe("wc/ui/table", ()=> {
	const selectId = "eg-_3b3a";
	const deleteId = "eg-_3b3b";
	const editId = "eg-_3b3c";

	let ownerDocument;
	let testHolder;

	beforeAll(function() {
		const testContent = `
			<div id="eg-_3b" class="wc-table wc-table-table">
				<div class="wc_table_top_controls">
					<div class="wc_table_sel_cont"><span id="eg-_3b_tb_st" role="radiogroup" data-wc-target="eg-_3b_tb"
							class="wc-rowselection wc_seltog"><span data-wc-for="eg-_3b_tb_st"
								id="eg-_3b_tb_st_l">Select:</span><button id="eg-_3b_tb-all" role="radio"
								class="wc-linkbutton wc_rowselection wc_seltog" data-wc-value="all" type="button"
								aria-checked="false"
								aria-controls="eg-_3b_0 eg-_3b_1 eg-_3b_2 eg-_3b_3 eg-_3b_4 eg-_3b_5 eg-_3b_6 eg-_3b_7 eg-_3b_8 eg-_3b_9 eg-_3b_10 eg-_3b_11 eg-_3b_12 eg-_3b_13 eg-_3b_14 eg-_3b_15"
								aria-labelledby="eg-_3b_tb_st_l">All</button><button id="eg-_3b_tb-none" role="radio"
								class="wc-linkbutton wc_rowselection wc_seltog" data-wc-value="none" type="button"
								aria-checked="true"
								aria-controls="eg-_3b_0 eg-_3b_1 eg-_3b_2 eg-_3b_3 eg-_3b_4 eg-_3b_5 eg-_3b_6 eg-_3b_7 eg-_3b_8 eg-_3b_9 eg-_3b_10 eg-_3b_11 eg-_3b_12 eg-_3b_13 eg-_3b_14 eg-_3b_15"
								aria-labelledby="eg-_3b_tb_st_l">None</button></span>
					</div>
				</div>
				<table aria-multiselectable="true">
					<colgroup>
						<col class="wc_table_colauto">
						<col>
						<col>
						<col>
					</colgroup>
					<thead>
						<tr>
							<th class="wc_table_sel_wrapper" scope="col" aria-hidden="true">&nbsp;</th>
							<th id="eg-_3b_thh1" scope="col" data-wc-columnidx="0" class="wc-th">
								<div id="eg-_3b0a0" class="wc-decoratedlabel">
									<div id="eg-_3b0a0-body" class="wc-labelbody wc_dlbl_seg">First name</div>
								</div>
							</th>
							<th id="eg-_3b_thh2" scope="col" data-wc-columnidx="1" class="wc-th">
								<div id="eg-_3b0b0" class="wc-decoratedlabel">
									<div id="eg-_3b0b0-body" class="wc-labelbody wc_dlbl_seg">Last name</div>
								</div>
							</th>
							<th id="eg-_3b_thh3" scope="col" data-wc-columnidx="2" class="wc-th">
								<div id="eg-_3b0c0" class="wc-decoratedlabel">
									<div id="eg-_3b0c0-body" class="wc-labelbody wc_dlbl_seg">DOB</div>
								</div>
							</th>
						</tr>
					</thead>
					<tbody id="eg-_3b_tb" class="wc-tbody wc_tbl_table">
						<tr class="wc-tr wc-invite" data-wc-rowindex="0" id="eg-_3b_0" role="row" aria-selected="false" tabindex="0"
							data-wc-name="eg-_3b.selected" data-wc-value="0">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Joe</td>
							<td class="wc-td" headers="eg-_3b_thh2">Bloggs</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r0-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1973-02-01"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="1" id="eg-_3b_1" role="row" aria-selected="false" tabindex="0"
							data-wc-name="eg-_3b.selected" data-wc-value="1">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Richard</td>
							<td class="wc-td" headers="eg-_3b_thh2">Starkey</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r1-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1976-08-04"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="2" id="eg-_3b_2" role="row" aria-selected="false" tabindex="0"
							data-wc-name="eg-_3b.selected" data-wc-value="2">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Peter</td>
							<td class="wc-td" headers="eg-_3b_thh2">Sellers</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r2-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1999-12-21"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="3" id="eg-_3b_3" role="row" aria-selected="false" tabindex="0"
							data-wc-name="eg-_3b.selected" data-wc-value="3">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Tom</td>
							<td class="wc-td" headers="eg-_3b_thh2">Smith</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r3-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1963-09-16"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="4" id="eg-_3b_4" role="row" aria-selected="false" tabindex="0"
							data-wc-name="eg-_3b.selected" data-wc-value="4">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Mary</td>
							<td class="wc-td" headers="eg-_3b_thh2">Jane</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r4-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1972-04-02"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="5" id="eg-_3b_5" role="row" aria-selected="false" tabindex="0"
							data-wc-name="eg-_3b.selected" data-wc-value="5">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">John</td>
							<td class="wc-td" headers="eg-_3b_thh2">Bonham</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r5-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1952-03-05"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="6" id="eg-_3b_6" role="row" aria-selected="false" tabindex="0"
							data-wc-name="eg-_3b.selected" data-wc-value="6">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Nick</td>
							<td class="wc-td" headers="eg-_3b_thh2">Mason</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r6-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1946-05-03"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="7" id="eg-_3b_7" role="row" aria-selected="false" tabindex="0"
							data-wc-name="eg-_3b.selected" data-wc-value="7">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">James</td>
							<td class="wc-td" headers="eg-_3b_thh2">Osterberg</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r7-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1974-06-04"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="8" id="eg-_3b_8" role="row" aria-selected="false" tabindex="0"
							data-wc-name="eg-_3b.selected" data-wc-value="8">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Kate</td>
							<td class="wc-td" headers="eg-_3b_thh2">Pierson</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r8-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1965-11-07"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="9" id="eg-_3b_9" role="row" aria-selected="false" tabindex="0"
							data-wc-name="eg-_3b.selected" data-wc-value="9">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Saul</td>
							<td class="wc-td" headers="eg-_3b_thh2">Hudson</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r9-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1978-03-05"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="10" id="eg-_3b_10" role="row" aria-selected="false"
							tabindex="0" data-wc-name="eg-_3b.selected" data-wc-value="10">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Kim</td>
							<td class="wc-td" headers="eg-_3b_thh2">Sung</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r10-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1945-10-01"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="11" id="eg-_3b_11" role="row" aria-selected="false"
							tabindex="0" data-wc-name="eg-_3b.selected" data-wc-value="11">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Ahmed</td>
							<td class="wc-td" headers="eg-_3b_thh2">McCarthur</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r11-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1985-07-15"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="12" id="eg-_3b_12" role="row" aria-selected="false"
							tabindex="0" data-wc-name="eg-_3b.selected" data-wc-value="12">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Nicholai</td>
							<td class="wc-td" headers="eg-_3b_thh2">Smith</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r12-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1996-04-29"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="13" id="eg-_3b_13" role="row" aria-selected="false"
							tabindex="0" data-wc-name="eg-_3b.selected" data-wc-value="13">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Polly</td>
							<td class="wc-td" headers="eg-_3b_thh2">Vinyl</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r13-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1978-08-15"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="14" id="eg-_3b_14" role="row" aria-selected="false"
							tabindex="0" data-wc-name="eg-_3b.selected" data-wc-value="14">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Ron</td>
							<td class="wc-td" headers="eg-_3b_thh2">Donald</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r14-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1923-01-01"></span></td>
						</tr>
						<tr class="wc-tr wc-invite" data-wc-rowindex="15" id="eg-_3b_15" role="row" aria-selected="false"
							tabindex="0" data-wc-name="eg-_3b.selected" data-wc-value="15">
							<td class="wc_table_sel_wrapper" aria-hidden="true"><i aria-hidden="true"
									class="fa fa-fw fa-square-o"></i>
							</td>
							<td class="wc-td" headers="eg-_3b_thh1">Tom</td>
							<td class="wc-td" headers="eg-_3b_thh2">Anderson</td>
							<td class="wc-td" headers="eg-_3b_thh3"><span id="eg-_3b-row-r15-_0c0" class="wc-datefield"
									data-wc-component="datefield" data-wc-value="1932-08-05"></span></td>
						</tr>
					</tbody>
				</table>
				<div class="wc_table_bottom_controls">
					<div class="wc-actions">
						<wc-tblaction>
							<wc-tblcondition min="1" max="3" other="0" type="error"
								message="One to three rows must be selected"></wc-tblcondition>
							<button id="${selectId}" data-testid="${selectId}" name="${selectId}" value="x" type="submit" class="wc-button" aria-controls="eg-_3c"
								formnovalidate="formnovalidate" disabled="disabled">Select
							</button>
						</wc-tblaction>
						<wc-tblaction>
							<wc-tblcondition min="1" other="0" type="error"
								message="At least one row must be selected"></wc-tblcondition>
							<wc-tblcondition max="1" other="0" type="warning"
								message="Are you sure you wish to delete these rows?"></wc-tblcondition>
							<button id="${deleteId}" data-testid="${deleteId}" name="${deleteId}" value="x" type="submit" class="wc-button" aria-controls="eg-_3c"
								formnovalidate="formnovalidate" disabled="disabled">Delete
							</button>
						</wc-tblaction>
						<wc-tblaction>
							<wc-tblcondition min="1" max="1" other="0" type="error"
								message="Exactly one row must be selected"></wc-tblcondition>
							<button id="${editId}" data-testid="${editId}" name="${editId}" value="x" type="submit" class="wc-button" aria-controls="eg-_3c"
								formnovalidate="formnovalidate" disabled="disabled">Edit
							</button>
						</wc-tblaction>
					</div>
				</div>
				<input type="hidden" name="eg-_3b-h" value="x">
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
