<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/openborders/wcomponents/namespace/ui/v1.0" xmlns:html="http://www.w3.org/1999/xhtml" version="1.0">
	<!--
		The option is the value of the text input of the HTML5 combo.
	-->
	<xsl:template match="ui:option" mode="comboValue">
		<xsl:value-of select="."/>
	</xsl:template>
</xsl:stylesheet>
