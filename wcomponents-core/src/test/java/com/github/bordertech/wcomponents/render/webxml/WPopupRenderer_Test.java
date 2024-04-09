package com.github.bordertech.wcomponents.render.webxml;

import com.github.bordertech.wcomponents.WPopup;
import java.io.IOException;
import org.junit.Assert;
import org.custommonkey.xmlunit.exceptions.XpathException;
import org.junit.Test;
import org.xml.sax.SAXException;

/**
 * Junit test case for {@link WPopupRenderer}.
 *
 * @author Jonathan Austin
 * @since 1.0.0
 */
public class WPopupRenderer_Test extends AbstractWebXmlRendererTestCase {

	@Test
	public void testRendererCorrectlyConfigured() {
		WPopup popup = new WPopup();
		Assert.assertTrue("Incorrect renderer supplied",
				getWebXmlRenderer(popup) instanceof WPopupRenderer);
	}

	@Test
	public void testDoPaint() throws IOException, SAXException, XpathException {
		final String testUrl = "www.testurl.invalid";
		final String testUrl2 = "www.testurl2.invalid";
		final String testWindow = "window";

		final int width = 100;
		final int height = 90;

		// Popup with only URL and default settings
		WPopup popup = new WPopup(testUrl) {
			@Override
			public boolean isVisible() {
				return true;
			}
		};

		// assertSchemaMatch(popup);
		assertXpathEvaluatesTo(testUrl, String.format("//html:%s/@url", WPopupRenderer.TAG_NAME), popup);
		assertXpathEvaluatesTo("", String.format("//html:%s/@width", WPopupRenderer.TAG_NAME), popup);
		assertXpathEvaluatesTo("", String.format("//html:%s/@height", WPopupRenderer.TAG_NAME), popup);
		assertXpathEvaluatesTo("true", String.format("//html:%s/@resizable", WPopupRenderer.TAG_NAME), popup);
		assertXpathEvaluatesTo("", String.format("//html:%s/@scrollbars", WPopupRenderer.TAG_NAME), popup);
		assertXpathEvaluatesTo("", String.format("//html:%s/@target", WPopupRenderer.TAG_NAME), popup);

		// All options
		popup.setUrl(testUrl2);
		popup.setWidth(width);
		popup.setHeight(height);
		popup.setResizable(false);
		popup.setScrollable(true);
		popup.setTargetWindow(testWindow);

		assertSchemaMatch(popup);
		assertXpathEvaluatesTo(testUrl2, String.format("//html:%s/@url", WPopupRenderer.TAG_NAME), popup);
		assertXpathEvaluatesTo(Integer.toString(width), String.format("//html:%s/@width", WPopupRenderer.TAG_NAME), popup);
		assertXpathEvaluatesTo(Integer.toString(height), String.format("//html:%s/@height", WPopupRenderer.TAG_NAME), popup);
		assertXpathEvaluatesTo("", String.format("//html:%s/@resizable", WPopupRenderer.TAG_NAME), popup);
		assertXpathEvaluatesTo("true", String.format("//html:%s/@scrollbars", WPopupRenderer.TAG_NAME), popup);
		assertXpathEvaluatesTo(testWindow, String.format("//html:%s/@target", WPopupRenderer.TAG_NAME), popup);
	}

	@Test
	public void testXssEscaping() throws IOException, SAXException, XpathException {
		// Popup with only URL and default settings
		WPopup popup = new WPopup("www.invalid") {
			@Override
			public boolean isVisible() {
				return true;
			}
		};

		popup.setToolTip(getMaliciousAttribute());
		assertSafeContent(popup);

		popup.setHtmlClass(getMaliciousAttribute());
		assertSafeContent(popup);

		popup.setAccessibleText(getMaliciousAttribute());
		assertSafeContent(popup);

		popup.setUrl("http://www.invalid/cgi?a=" + getMaliciousAttribute());
		assertSafeContent(popup);
	}
}
