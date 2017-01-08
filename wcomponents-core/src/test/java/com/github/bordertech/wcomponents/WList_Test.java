package com.github.bordertech.wcomponents;

import com.github.bordertech.wcomponents.WList.Separator;
import com.github.bordertech.wcomponents.WList.Type;
import com.github.bordertech.wcomponents.util.GapSizeUtil;
import junit.framework.Assert;
import org.junit.Test;

/**
 * Unit tests for {@link WList}.
 *
 * @author Jonathan Austin
 * @since 1.0.0
 */
public class WList_Test extends AbstractWComponentTestCase {

	private static final GapSizeUtil.Size GAP = GapSizeUtil.Size.SMALL;

	@Test
	public void testConstructor1() {
		WList list;
		for (WList.Type t : WList.Type.values()) {
			list = new WList(t);
			Assert.assertEquals("Constructor - Incorrect type", t, list.getType());
			Assert.assertNull("Constructor - Incorrect default gap", list.getGap());
		}
	}

	@Test
	public void testConstructor2() {
		WList list;
		for (WList.Type t : WList.Type.values()) {
			list = new WList(t, GAP);
			Assert.assertEquals("Constructor - Incorrect type", t, list.getType());
			Assert.assertEquals("Constructor - Incorrect gap", GAP, list.getGap());
		}
	}

	@Test
	public void testDeprecatedConstructor() {
		WList list;
		for (WList.Type t : WList.Type.values()) {
			list = new WList(t, GapSizeUtil.sizeToInt(GAP));
			Assert.assertEquals("Constructor - Incorrect type", t, list.getType());
			Assert.assertEquals("Constructor - Incorrect gap", GAP, list.getGap());
		}
	}

	@Test
	public void testMarginAccessors() {
		assertAccessorsCorrect(new WList(Type.FLAT), "margin", null, new Margin(GAP), new Margin(GapSizeUtil.Size.LARGE));
	}

	@Test
	public void testTypeAccessors() {
		assertAccessorsCorrect(new WList(Type.FLAT), "type", Type.FLAT, Type.STACKED, Type.STRIPED);
	}

	@Test
	public void testSeparatorAccessors() {
		assertAccessorsCorrect(new WList(Type.FLAT), "separator", null, Separator.BAR, Separator.DOT);
	}

	@Test
	public void testRenderBorderAccessors() {
		assertAccessorsCorrect(new WList(Type.FLAT), "renderBorder", false, true, false);
	}

	// Test of the deprecated constructor.
	@Test
	public void testConstructor2Gaps() {
		WList list;
		GapSizeUtil.Size bigGap = GapSizeUtil.Size.LARGE;
		for (WList.Type t : WList.Type.values()) {
			list = new WList(t, GapSizeUtil.sizeToInt(GAP), GapSizeUtil.sizeToInt(bigGap));
			Assert.assertEquals("Constructor - Incorrect type", t, list.getType());

			if (t == WList.Type.FLAT) {
				Assert.assertEquals("Constructor - Incorrect gap", GAP, list.getGap());
				Assert.assertEquals("Constructor - Incorrect hgap", GapSizeUtil.sizeToInt(GAP), list.getHgap());
				Assert.assertEquals("Constructor - Incorrect vgap", 0, list.getVgap());
			} else {
				Assert.assertEquals("Constructor - Incorrect gap", bigGap, list.getGap());
				Assert.assertEquals("Constructor - Incorrect hgap", 0, list.getHgap());
				Assert.assertEquals("Constructor - Incorrect vgap", GapSizeUtil.sizeToInt(bigGap), list.getVgap());
			}
		}
	}

}
