package com.github.bordertech.wcomponents.container;

import com.github.bordertech.wcomponents.RenderContext;
import com.github.bordertech.wcomponents.UIContextHolder;
import com.github.bordertech.wcomponents.servlet.WebXmlRenderContext;
import com.github.bordertech.wcomponents.util.Config;
import com.github.bordertech.wcomponents.util.ConfigurationProperties;
import com.github.bordertech.wcomponents.util.WhiteSpaceFilterPrintWriter;
import java.io.PrintWriter;

/**
 * WhitespaceFilterInterceptor is an interceptor that removes HTML comments and redundant white space from HTML output.
 *
 * For local testing/troubleshooting, the filter can be disabled by setting the following {@link Config configuration}
 * parameter:
 * <pre>
 * com.github.bordertech.wcomponents.container.WhitespaceFilterInterceptor.enabled=false
 * </pre>
 *
 * @author Yiannis Paschalidis
 * @since 1.0.0
 */
public class WhitespaceFilterInterceptor extends InterceptorComponent {

	/**
	 * Paints the component.
	 *
	 * @param renderContext the renderContext to send the output to.
	 */
	@Override
	public void paint(final RenderContext renderContext) {
		boolean enabled = ConfigurationProperties.getWhitespaceFilter();

		if (enabled && renderContext instanceof WebXmlRenderContext) {
			PrintWriter writer = ((WebXmlRenderContext) renderContext).getWriter();
			writer = new WhiteSpaceFilterPrintWriter(writer);

			WebXmlRenderContext filteredContext = new WebXmlRenderContext(writer, UIContextHolder.
					getCurrent().getLocale());
			filteredContext.getWriter().turnIndentingOff();
			super.paint(filteredContext);
		} else {
			super.paint(renderContext);
		}
	}
}
