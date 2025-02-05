package com.github.bordertech.wcomponents.render.webxml;

import com.github.bordertech.wcomponents.Renderer;
import com.github.bordertech.wcomponents.UIContext;
import com.github.bordertech.wcomponents.UIContextHolder;
import com.github.bordertech.wcomponents.WButton;
import com.github.bordertech.wcomponents.WComponent;
import com.github.bordertech.wcomponents.WTable;
import com.github.bordertech.wcomponents.WTable.ExpandMode;
import com.github.bordertech.wcomponents.WTable.PaginationMode;
import com.github.bordertech.wcomponents.WTable.RowIdWrapper;
import com.github.bordertech.wcomponents.WTable.SelectMode;
import com.github.bordertech.wcomponents.WTable.TableModel;
import com.github.bordertech.wcomponents.WTable.TableRepeater;
import com.github.bordertech.wcomponents.WTableColumn;
import com.github.bordertech.wcomponents.WTableColumn.Alignment;
import com.github.bordertech.wcomponents.XmlStringBuilder;
import com.github.bordertech.wcomponents.servlet.WebXmlRenderContext;
import com.github.bordertech.wcomponents.util.I18nUtilities;
import com.github.bordertech.wcomponents.util.SystemException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * {@link Renderer} for the {@link WTable} component.
 *
 * @author Jonathan Austin
 * @since 1.0.0
 */
final class
WTableRenderer extends AbstractWebXmlRenderer {

	/**
	 * Table action tag name.
	 */
	public static final String TAG_ACTION = "wc-tblaction";
	/**
	 * Table condition tag name.
	 */
	public static final String TAG_CONDITION = "wc-tblcondition";

	/**
	 * Paints the given WTable.
	 *
	 * @param component the WTable to paint.
	 * @param renderContext the RenderContext to paint to.
	 */
	private int selectedOnOther;

	@Override
	public void doRender(final WComponent component, final WebXmlRenderContext renderContext) {
		WTable table = (WTable) component;
		XmlStringBuilder xml = renderContext.getWriter();

		xml.appendTagOpen("ui:table");
		xml.appendAttribute("id", component.getId());
		xml.appendOptionalAttribute("class", component.getHtmlClass());
		xml.appendOptionalAttribute("track", component.isTracking(), "true");
		xml.appendOptionalAttribute("hidden", table.isHidden(), "true");
		xml.appendOptionalAttribute("caption", table.getCaption());

		switch (table.getType()) {
			case TABLE:
				xml.appendAttribute("type", "table");
				break;
			case HIERARCHIC:
				xml.appendAttribute("type", "hierarchic");
				break;
			default:
				throw new SystemException("Unknown table type: " + table.getType());
		}

		switch (table.getStripingType()) {
			case ROWS:
				xml.appendAttribute("striping", "rows");
				break;
			case COLUMNS:
				xml.appendAttribute("striping", "cols");
				break;
			case NONE:
				break;
			default:
				throw new SystemException("Unknown striping type: " + table.getStripingType());
		}

		switch (table.getSeparatorType()) {
			case HORIZONTAL:
				xml.appendAttribute("separators", "horizontal");
				break;
			case VERTICAL:
				xml.appendAttribute("separators", "vertical");
				break;
			case BOTH:
				xml.appendAttribute("separators", "both");
				break;
			case NONE:
				break;
			default:
				throw new SystemException("Unknown separator type: " + table.getSeparatorType());
		}
		xml.appendClose();

		// Render margin
		MarginRendererUtil.renderMargin(table, renderContext);

		if (table.getPaginationMode() != PaginationMode.NONE) {
			paintPaginationDetails(table, xml);
		}

		if (table.getSelectMode() != SelectMode.NONE) {
			paintSelectionDetails(table, xml);
		}

		if (table.getExpandMode() != ExpandMode.NONE) {
			paintExpansionDetails(table, xml);
		}

		if (table.isSortable()) {
			paintSortDetails(table, xml);
		}

		// Headers
		paintColumnHeaderFooter(table, renderContext, true);
		// Body
		paintRows(table, renderContext);
		// Footers
		if (table.isRenderColumnFooters()) {
			paintColumnHeaderFooter(table, renderContext, false);
		}
		// Actions
		paintTableActions(table, renderContext);

		xml.appendEndTag("ui:table");
	}

	/**
	 * Paint the pagination aspects of the table.
	 *
	 * @param table the WDataTable being rendered
	 * @param xml the string builder in use
	 */
	private void paintPaginationDetails(final WTable table, final XmlStringBuilder xml) {
		TableModel model = table.getTableModel();

		xml.appendTagOpen("ui:pagination");

		xml.appendAttribute("rows", model.getRowCount());
		xml.appendOptionalAttribute("rowsPerPage", table.getRowsPerPage() > 0, table.
				getRowsPerPage());
		xml.appendAttribute("currentPage", table.getCurrentPage());

		switch (table.getPaginationMode()) {
			case CLIENT:
				xml.appendAttribute("mode", "client");
				break;
			case DYNAMIC:
				xml.appendAttribute("mode", "dynamic");
				break;
			case NONE:
				break;
			default:
				throw new SystemException("Unknown pagination mode: " + table.
						getPaginationMode());
		}

		if (table.getPaginationLocation() != WTable.PaginationLocation.AUTO) {
			switch (table.getPaginationLocation()) {
				case TOP:
					xml.appendAttribute("controls", "top");
					break;
				case BOTTOM:
					xml.appendAttribute("controls", "bottom");
					break;
				case BOTH:
					xml.appendAttribute("controls", "both");
					break;
				default:
					throw new SystemException("Unknown pagination control location: " + table.getPaginationLocation());
			}
		}
		xml.appendClose();
		// Rows per page options
		if (table.getRowsPerPageOptions() != null) {
			xml.appendTag("ui:rowsselect");
			for (Integer option : table.getRowsPerPageOptions()) {
				xml.appendTagOpen("ui:option");
				xml.appendAttribute("value", option);
				xml.appendEnd();
			}
			xml.appendEndTag("ui:rowsselect");
		}
		xml.appendEndTag("ui:pagination");

	}

	/**
	 * Paint the row selection aspects of the table.
	 *
	 * @param table the WDataTable being rendered
	 * @param xml the string builder in use
	 */
	private void paintSelectionDetails(final WTable table, final XmlStringBuilder xml) {
		boolean multiple = table.getSelectMode() == SelectMode.MULTIPLE;
		xml.appendTagOpen("ui:rowselection");
		xml.appendOptionalAttribute("multiple", multiple, "true");

		boolean toggleSubRows = multiple && table.isToggleSubRowSelection()
				&& WTable.ExpandMode.NONE != table.getExpandMode();
		xml.appendOptionalAttribute("toggle", toggleSubRows, "true");
		if (multiple) {
			switch (table.getSelectAllMode()) {
				case CONTROL:
					xml.appendAttribute("selectAll", "control");
					break;
				case TEXT:
					xml.appendAttribute("selectAll", "text");
					break;
				case NONE:
					break;
				default:
					throw new SystemException("Unknown select-all mode: " + table.
							getSelectAllMode());
			}
		}
		xml.appendEnd();
	}

	/**
	 * Paint the row selection aspects of the table.
	 *
	 * @param table the WDataTable being rendered
	 * @param xml the string builder in use
	 */
	private void paintExpansionDetails(final WTable table, final XmlStringBuilder xml) {
		xml.appendTagOpen("ui:rowexpansion");

		switch (table.getExpandMode()) {
			case CLIENT:
				xml.appendAttribute("mode", "client");
				break;
			case LAZY:
				xml.appendAttribute("mode", "lazy");
				break;
			case DYNAMIC:
				xml.appendAttribute("mode", "dynamic");
				break;
			case NONE:
				break;
			default:
				throw new SystemException("Unknown expand mode: " + table.getExpandMode());
		}

		xml.appendOptionalAttribute("expandAll", table.isExpandAll(), "true");
		xml.appendEnd();
	}

	/**
	 * Paints the sort details.
	 *
	 * @param table the table being rendered
	 * @param xml the string builder in use
	 */
	private void paintSortDetails(final WTable table, final XmlStringBuilder xml) {

		int col = table.getSortColumnIndex();
		boolean ascending = table.isSortAscending();

		xml.appendTagOpen("ui:sort");
		if (col >= 0) {
			// Allow for column order
			int[] cols = table.getColumnOrder();
			if (cols != null) {
				for (int i = 0; i < cols.length; i++) {
					if (cols[i] == col) {
						col = i;
						break;
					}
				}
			}
			xml.appendAttribute("col", col);
			xml.appendOptionalAttribute("descending", !ascending, "true");
		}

		switch (table.getSortMode()) {
			case DYNAMIC:
				xml.appendAttribute("mode", "dynamic");
				break;
			default:
				throw new SystemException("Unknown sort mode: " + table.getSortMode());
		}

		xml.appendEnd();
	}

	/**
	 * Paints the table actions of the table.
	 *
	 * @param table the table to paint the table actions for.
	 * @param renderContext the RenderContext to paint to.
	 */
	private void paintTableActions(final WTable table, final WebXmlRenderContext renderContext) {
		XmlStringBuilder xml = renderContext.getWriter();
		List<WButton> tableActions = table.getActions();

		if (!tableActions.isEmpty()) {
			boolean hasActions = false;

			for (WButton button : tableActions) {
				if (!button.isVisible()) {
					continue;
				}

				if (!hasActions) {
					hasActions = true;
					xml.appendTag("ui:actions");
				}

				xml.appendTag(TAG_ACTION);

				List<WTable.ActionConstraint> constraints = table.getActionConstraints(button);

				if (constraints != null) {
					for (WTable.ActionConstraint constraint : constraints) {
						int minRows = constraint.getMinSelectedRowCount();
						int maxRows = constraint.getMaxSelectedRowCount();
						String message = constraint.getMessage();
						String type = constraint.isError() ? "error" : "warning";

						xml.appendTagOpen(TAG_CONDITION);
						xml.appendOptionalAttribute("min", minRows > 0, minRows);
						xml.appendOptionalAttribute("max", maxRows > 0, maxRows);
						xml.appendAttribute("other", this.selectedOnOther);
						xml.appendAttribute("type", type);
						xml.appendAttribute("message", I18nUtilities.format(null, message));
						xml.appendClose();
						xml.appendEndTag(TAG_CONDITION);
					}
				}

				button.paint(renderContext);

				xml.appendEndTag(TAG_ACTION);
			}

			if (hasActions) {
				xml.appendEndTag("ui:actions");
			}
		}
	}

	/**
	 * Paints the rows of the table.
	 *
	 * @param table the table to paint the rows for.
	 * @param renderContext the RenderContext to paint to.
	 */
	private void paintRows(final WTable table, final WebXmlRenderContext renderContext) {
		XmlStringBuilder xml = renderContext.getWriter();
		TableModel model = table.getTableModel();

		xml.appendTagOpen("ui:tbody");
		xml.appendAttribute("id", table.getId() + ".body");
		xml.appendClose();

		if (model.getRowCount() == 0) {
			xml.appendTag("ui:nodata");
			xml.appendEscaped(table.getNoDataMessage());
			xml.appendEndTag("ui:nodata");
		} else {
			// If has at least one visible col, paint the rows.
			final int columnCount = table.getColumnCount();

			for (int i = 0; i < columnCount; i++) {
				if (table.getColumn(i).isVisible()) {
					doPaintRows(table, renderContext);
					break;
				}
			}
		}

		xml.appendEndTag("ui:tbody");
	}

	/**
	 * Override paintRow so that we only paint the first-level nodes for tree-tables.
	 *
	 * @param table the table to paint the rows for.
	 * @param renderContext the RenderContext to paint to.
	 */
	private void doPaintRows(final WTable table, final WebXmlRenderContext renderContext) {
		TableRepeater repeater = table.getRepeater();

		WComponent row = repeater.getRepeatedComponent();

		List<RowIdWrapper> wrappers = repeater.getBeanList();

		Set<?> otherSelectedRows = new HashSet<>(table.getSelectedRows());

		int index = -1;
		for (RowIdWrapper wrapper : wrappers) {
			index++;

			Object rowKey = wrapper.getRowKey();

			if (table.getSelectedRows().contains(rowKey)) {
				otherSelectedRows.remove(rowKey);
			}

			// Only rendering top level rows
			// Child rows handled by the layout, so dont paint the row
			if (wrapper.getParent() != null) {
				continue;
			}

			// Each row has its own context. This is why we can reuse the same
			// WComponent instance for each row.
			UIContext rowContext = repeater.getRowContext(wrapper, index);

			UIContextHolder.pushContext(rowContext);

			try {
				row.paint(renderContext);
			} finally {
				UIContextHolder.popContext();
			}
		}
		this.selectedOnOther = otherSelectedRows.size();
	}

	/**
	 * Paints the column headings for the given table.
	 *
	 * @param table the table to paint the headings for.
	 * @param renderContext the RenderContext to paint to.
	 * @param renderHeaders true if rendering headers otherwise render footers
	 */
	private void paintColumnHeaderFooter(final WTable table, final WebXmlRenderContext renderContext, final boolean renderHeaders) {
		XmlStringBuilder xml = renderContext.getWriter();
		int[] columnOrder = table.getColumnOrder();
		TableModel model = table.getTableModel();
		final int columnCount = columnOrder == null ? table.getColumnCount() : columnOrder.length;

		if (renderHeaders) {
			// Headers
			xml.appendTagOpen("ui:thead");
			xml.appendOptionalAttribute("hidden", !table.isShowColumnHeaders(), "true");
			xml.appendClose();
		} else {
			// Footers
			xml.appendTag("tfoot");
			xml.appendTag("tr");
			// Allow for expandable column
			if (table.getExpandMode() != ExpandMode.NONE) {
				xml.appendTag("td");
				xml.appendEndTag("td");
			}
			// Allow for selectable column
			if (table.getSelectMode() != SelectMode.NONE) {
				xml.appendTag("td");
				xml.appendEndTag("td");
			}
		}

		for (int i = 0; i < columnCount; i++) {
			int colIndex = columnOrder == null ? i : columnOrder[i];
			WTableColumn col = table.getColumn(colIndex);

			if (col.isVisible()) {
				if (renderHeaders) {
					// Header
					boolean sortable = model.isSortable(colIndex);
					paintColumnHeading(col, sortable, renderContext);
				} else {
					// Footer
					paintColumnFooting(col, renderContext);
				}
			}
		}

		if (renderHeaders) {
			xml.appendEndTag("ui:thead");
		} else {
			xml.appendEndTag("tr");
			xml.appendEndTag("tfoot");
		}
	}

	/**
	 * Paints a single column heading.
	 *
	 * @param col the column to paint.
	 * @param sortable true if the column is sortable, false otherwise
	 * @param renderContext the RenderContext to paint to.
	 */
	private void paintColumnHeading(final WTableColumn col, final boolean sortable,
			final WebXmlRenderContext renderContext) {
		XmlStringBuilder xml = renderContext.getWriter();
		int width = col.getWidth();
		Alignment align = col.getAlign();

		xml.appendTagOpen("ui:th");
		xml.appendOptionalAttribute("width", width > 0, width);
		xml.appendOptionalAttribute("sortable", sortable, "true");

		if (Alignment.RIGHT.equals(align)) {
			xml.appendAttribute("align", "right");
		} else if (Alignment.CENTER.equals(align)) {
			xml.appendAttribute("align", "center");
		}

		xml.appendClose();

		col.paint(renderContext);

		xml.appendEndTag("ui:th");
	}

	/**
	 * Paints a single column footing.
	 *
	 * @param col the column to paint.
	 * @param renderContext the RenderContext to paint to.
	 */
	private void paintColumnFooting(final WTableColumn col, final WebXmlRenderContext renderContext) {

		XmlStringBuilder xml = renderContext.getWriter();

		xml.appendTag("td");

		if (col.getFooterRender() != null) {
			col.getFooterRender().paint(renderContext);
		}

		xml.appendEndTag("td");
	}

}
