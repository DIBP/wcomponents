<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/openborders/wcomponents/namespace/ui/v1.0" xmlns:html="http://www.w3.org/1999/xhtml" version="1.0">
	<xsl:template match="ui:value" mode="readOnly">
		<xsl:value-of select="."/>
	</xsl:template>
</xsl:stylesheet>
