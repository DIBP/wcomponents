<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/dibp/wcomponents/namespace/ui/v1.0" xmlns:html="http://www.w3.org/1999/xhtml" version="1.0">
	<xsl:output method="html" doctype-public="XSLT-compat" encoding="UTF-8" indent="no" omit-xml-declaration="yes"/>
	<xsl:strip-space elements="*"/>
<!--
 In-place transform for each table action. The UI artefact is the child
 button. The conditions are not output in place.
 see wc.ui.table.action.condition.xsl
-->
	<xsl:template match="ui:action">
		<xsl:apply-templates select="ui:button"/>
	</xsl:template>
</xsl:stylesheet>