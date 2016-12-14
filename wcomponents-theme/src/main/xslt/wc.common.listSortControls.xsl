<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/bordertech/wcomponents/namespace/ui/v1.0" xmlns:html="http://www.w3.org/1999/xhtml" version="2.0">
	<xsl:import href="wc.common.attributes.xsl"/>
	<!--
		Build the button controls used to re-order items in a list box as per
		wc.ui.shuffler.xsl and wc.ui.multiSelectPair.xsl.

		param id:
		The id of the list we are moving. This is passed in as a different ID from the
		component ID when called from multiSelectPair. It is slightly more efficient to
		pass in this paramter than to calculate it here. Default @id.
	-->
	<xsl:template name="listSortControls">
		<xsl:param name="id" select="@id"/>
		<span class="wc_sortcont">
			<xsl:if test="self::ui:multiselectpair">
				<xsl:text>&#x00a0;</xsl:text>
			</xsl:if>
			<xsl:call-template name="listSortControl">
				<xsl:with-param name="id" select="$id"/>
				<xsl:with-param name="value" select="'top'"/>
				<xsl:with-param name="toolTip"><xsl:text>{{t 'shuffle_top'}}</xsl:text></xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="listSortControl">
				<xsl:with-param name="id" select="$id"/>
				<xsl:with-param name="value" select="'up'"/>
				<xsl:with-param name="toolTip"><xsl:text>{{t 'shuffle_up'}}</xsl:text></xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="listSortControl">
				<xsl:with-param name="id" select="$id"/>
				<xsl:with-param name="value" select="'down'"/>
				<xsl:with-param name="toolTip"><xsl:text>{{t 'shuffle_down'}}</xsl:text></xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="listSortControl">
				<xsl:with-param name="id" select="$id"/>
				<xsl:with-param name="value" select="'bottom'"/>
				<xsl:with-param name="toolTip"><xsl:text>{{t 'shuffle_bottom'}}</xsl:text></xsl:with-param>
			</xsl:call-template>
		</span>
	</xsl:template>

	<!--
		Outputs each shuffle control as a HTML BUTTON element.
		
		param id: The id of the SELECT being controlled. This is not necessarily the id
		of the component which owns the sort controls.
		param value: The value of the button "top", "bottom", "up", "down"
		param toolTip: The text used to populate the button title.
	-->
	<xsl:template name="listSortControl">
		<xsl:param name="id"/>
		<xsl:param name="value"/>
		<xsl:param name="toolTip"/>
		<button class="wc_sorter wc_btn_icon wc-invite" type="button" value="{$value}" aria-controls="{$id}" title="{$toolTip}">
			<xsl:call-template name="disabledElement">
				<xsl:with-param name="isControl" select="1"/>
			</xsl:call-template>
		</button>
	</xsl:template>
</xsl:stylesheet>
