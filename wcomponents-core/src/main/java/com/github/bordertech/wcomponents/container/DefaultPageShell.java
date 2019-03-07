package com.github.bordertech.wcomponents.container;

import com.github.bordertech.wcomponents.ComponentWithContext;
import com.github.bordertech.wcomponents.Headers;
import com.github.bordertech.wcomponents.UIContext;
import com.github.bordertech.wcomponents.UIContextHolder;
import com.github.bordertech.wcomponents.WApplication;
import com.github.bordertech.wcomponents.WComponent;
import com.github.bordertech.wcomponents.WWindow;
import com.github.bordertech.wcomponents.WebUtilities;
import com.github.bordertech.wcomponents.util.I18nUtilities;
import com.github.bordertech.wcomponents.util.XMLUtil;
import java.io.PrintWriter;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * <p>
 * A default implementation of the PageShell interface.</p>
 *
 * <p>
 * This implementation writes the absolute minimum amount of mark-up necessary to support a WComponent application.
 * There is no visible content written to the headers/footers.</p>
 *
 * @author Yiannis Paschalidis
 * @since 1.0.0
 */
public class DefaultPageShell implements PageShell {

	@Override
	public void openDoc(final PrintWriter writer) {
		UIContext uic = UIContextHolder.getCurrent();
		String title = getApplicationTitle(uic);

		writer.write(XMLUtil.getXMLDeclarationWithThemeXslt(uic));

		StringBuilder rootElement = new StringBuilder();
		rootElement.append("\n<ui:root title=\"");
		rootElement.append(WebUtilities.encode(title));
		rootElement.append("\" ");

		Locale locale = I18nUtilities.getEffectiveLocale();
		if (locale != null) {
			String lang = locale.toLanguageTag();
			if (lang != null) {
				rootElement.append("lang=\"");
				rootElement.append(WebUtilities.encode(locale.toLanguageTag()));
				rootElement.append("\" ");
			}
		}

		rootElement.append(XMLUtil.STANDARD_NAMESPACES);
		rootElement.append(">");

		writer.write(rootElement.toString());
	}

	/**
	 * Retrieves the application title for the given context. This mess is required due to WWindow essentially existing
	 * as a separate UI root. If WWindow is eventually removed, then we can just retrieve the title from the root
	 * WApplication.
	 *
	 * @param uic the context to check.
	 * @return the current application title.
	 */
	private String getApplicationTitle(final UIContext uic) {
		WComponent root = uic.getUI();
		String title = root instanceof WApplication ? ((WApplication) root).getTitle() : null;

		Map<String, String> params = uic.getEnvironment().getHiddenParameters();
		String target = params.get(WWindow.WWINDOW_REQUEST_PARAM_KEY);

		if (target != null) {
			ComponentWithContext targetComp = WebUtilities.getComponentById(target, true);

			if (targetComp != null && targetComp.getComponent() instanceof WWindow) {
				try {
					UIContextHolder.pushContext(targetComp.getContext());
					title = ((WWindow) targetComp.getComponent()).getTitle();
				} finally {
					UIContextHolder.popContext();
				}
			}
		}

		return title == null ? "" : title;
	}

	@Override
	public void writeHeader(final PrintWriter writer) {
		UIContext uic = UIContextHolder.getCurrent();
		addHeadlines(writer, uic.getHeaders().getHeadLines());
		addJsHeadlines(writer, uic.getHeaders().getHeadLines(Headers.JAVASCRIPT_HEADLINE));
		addCssHeadlines(writer, uic.getHeaders().getHeadLines(Headers.CSS_HEADLINE));
	}

	@Override
	public void writeApplicationHeader(final PrintWriter writer) {
		// This implementation does not write any visible app header
	}

	@Override
	public void writeApplicationFooter(final PrintWriter writer) {
		// This implementation does not write any visible app footer
	}

	@Override
	public void writeFooter(final PrintWriter writer) {
		// This implementation does not require a footer element
	}

	@Override
	public void closeDoc(final PrintWriter writer) {
		writer.write("</ui:root>");
	}

	/**
	 * Add a list of html headline entries intended to be added only once to the page.
	 *
	 * @param writer the writer to write to.
	 * @param headlines a list of html entries to be added to the page as a whole.
	 */
	private void addHeadlines(final PrintWriter writer, final List headlines) {
		if (headlines == null || headlines.isEmpty()) {
			return;
		}

		writer.write("\n<!-- Start general headlines -->");

		for (Object line : headlines) {
			writer.write("\n" + line);
		}

		writer.println("\n<!-- End general headlines -->");
	}

	/**
	 * Add a list of javascript headline entries intended to be added only once to the page.
	 *
	 * @param writer the writer to write to.
	 * @param jsHeadlines a list of javascript entries to be added to the page as a whole.
	 */
	private void addJsHeadlines(final PrintWriter writer, final List jsHeadlines) {
		if (jsHeadlines == null || jsHeadlines.isEmpty()) {
			return;
		}

		writer.println();
		writer.write("\n<!-- Start javascript headlines -->"
				+ "\n<script type=\"" + WebUtilities.CONTENT_TYPE_JS + "\">");

		for (Object line : jsHeadlines) {
			writer.write("\n" + line);
		}

		writer.write("\n</script>"
				+ "\n<!-- End javascript headlines -->");
	}

	/**
	 * Add a list of css headline entries intended to be added only once to the page.
	 *
	 * @param writer the writer to write to.
	 * @param cssHeadlines a list of css entries to be added to the page as a whole.
	 */
	private void addCssHeadlines(final PrintWriter writer, final List cssHeadlines) {
		if (cssHeadlines == null || cssHeadlines.isEmpty()) {
			return;
		}

		writer.write("<!-- Start css headlines -->"
				+ "\n<style type=\"" + WebUtilities.CONTENT_TYPE_CSS + "\" media=\"screen\">");

		for (Object line : cssHeadlines) {
			writer.write("\n" + line);
		}

		writer.write("\n</style>"
				+ "<!-- End css headlines -->");
	}
}
