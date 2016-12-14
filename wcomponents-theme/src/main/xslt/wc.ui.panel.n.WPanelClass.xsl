<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/bordertech/wcomponents/namespace/ui/v1.0" xmlns:html="http://www.w3.org/1999/xhtml" version="2.0">
	<xsl:import href="wc.common.n.className.xsl" />

	<xsl:template name="WPanelClass">
		<xsl:param name="type" select="''"/>
		<xsl:call-template name="commonClassHelper">
			<xsl:with-param name="additional">
				<xsl:choose>
					<xsl:when test="(@mode eq 'lazy' and @hidden)"><xsl:text> wc_magic</xsl:text></xsl:when>
					<xsl:when test="@mode eq 'dynamic'"><xsl:text> wc_magic wc_dynamic</xsl:text></xsl:when>
				</xsl:choose>
			</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
</xsl:stylesheet>
