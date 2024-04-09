package com.github.bordertech.wcomponents.render.webxml;

import com.github.bordertech.wcomponents.WButton;
import com.github.bordertech.wcomponents.WDialog;
import java.io.IOException;
import org.junit.Assert;
import org.custommonkey.xmlunit.exceptions.XpathException;
import org.junit.Test;
import org.xml.sax.SAXException;

import static com.github.bordertech.wcomponents.render.webxml.WDialogRenderer.TAG_NAME;

/**
 * Junit test case for {@link WDialogRenderer}.
 *
 * @author Anthony O'Connor
 * @since 1.0.0
 */
public class WDialogRenderer_Test extends AbstractWebXmlRendererTestCase {

	/**
	 * Test title.
	 */
	public static final String TEST_TITLE = "This is the title";

	@Test
	public void testRendererCorrectlyConfigured() {
		WDialog component = new WDialog();
		Assert.assertTrue("Incorrect renderer supplied",
				getWebXmlRenderer(component) instanceof WDialogRenderer);
	}

	@Test
	public void testSchemaMatch() throws IOException, SAXException {
		WDialog dialog = new WDialog();
		dialog.setTitle(TEST_TITLE);
		dialog.setMode(WDialog.MODAL);

		setActiveContext(createUIContext());
		dialog.display();
	}

	@Test
	public void testDoRender() throws IOException, SAXException, XpathException {
		WDialog dialog = new WDialog();
		dialog.setTitle(TEST_TITLE);
		dialog.setMode(WDialog.MODELESS);
		dialog.setWidth(0);
		dialog.setHeight(0);
		dialog.setLocked(true);

		String xml = renderDialog(dialog);
		String foo = TAG_NAME;
		assertXpathEvaluatesTo(dialog.getId(), String.format("//html:%s/@data-id", TAG_NAME), xml);
		assertXpathNotExists( String.format("//html:%s/@modal", TAG_NAME), xml);
		assertXpathEvaluatesTo(TEST_TITLE,  String.format("//html:%s/@title", TAG_NAME), xml);
		assertXpathNotExists( String.format("//html:%s/@width", TAG_NAME), xml);
		assertXpathNotExists( String.format("//html:%s/@height", TAG_NAME), xml);
		assertXpathNotExists( String.format("//html:%s/@triggerid", TAG_NAME), xml);

		int width = 123;
		int height = 456;
		dialog.setWidth(width);
		dialog.setHeight(height);
		xml = renderDialog(dialog);
		assertXpathEvaluatesTo(String.valueOf(width),  String.format("//html:%s/@width", TAG_NAME), xml);
		assertXpathEvaluatesTo(String.valueOf(height),  String.format("//html:%s/@height", TAG_NAME), xml);

		dialog.setMode(WDialog.MODAL);
		xml = renderDialog(dialog);
		assertXpathEvaluatesTo("true",  String.format("//html:%s/@modal", TAG_NAME), xml);
	}

	@Test
	public void testRenderTrigger() throws IOException, SAXException, XpathException {
		WButton trigger = new WButton("Launch dialog");
		WButton content = new WButton("Dialog content");

		WDialog dialog = new WDialog(content, trigger);
		assertXpathExists( String.format("//html:%s", TAG_NAME), dialog);
		assertXpathEvaluatesTo(dialog.getId(),  String.format("//html:%s/@data-id", TAG_NAME), dialog);
		assertXpathNotExists( String.format("//html:%s/@open", TAG_NAME), dialog);
		assertXpathEvaluatesTo(trigger.getId(),  String.format("//html:%s/html:button/@id", TAG_NAME), dialog);
		assertXpathEvaluatesTo(trigger.getId(),  String.format("//html:%s/@triggerid", TAG_NAME), dialog);
	}

	/**
	 * Renders the dialog.
	 *
	 * @param dialog the dialog to render.
	 * @return the rendered XML.
	 */
	private String renderDialog(final WDialog dialog) {
		setActiveContext(createUIContext());
		dialog.display();
		String xml = wrapXHtml(render(dialog));
		resetContext();

		return xml;
	}

	@Test
	public void testXssEscaping() throws IOException, SAXException, XpathException {
		WDialog dialog = new WDialog();
		dialog.setTitle(TEST_TITLE);
		dialog.setMode(WDialog.MODAL);

		setActiveContext(createUIContext());
		dialog.setTitle(getMaliciousAttribute());
		dialog.display();

		assertSafeContent(dialog);
	}
}
