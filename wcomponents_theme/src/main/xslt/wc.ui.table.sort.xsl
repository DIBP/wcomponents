<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/openborders/wcomponents/namespace/ui/v1.0" xmlns:html="http://www.w3.org/1999/xhtml" version="1.0">
	<xsl:output method="html" doctype-public="XSLT-compat" encoding="UTF-8" indent="no" omit-xml-declaration="yes"/>
	<xsl:strip-space elements="*"/>
<!--
 Null default template for ui:sort. The sort indicators are generated in the 
 ui:table column generation and sort controls in ui:thead/ui:th. The ui:sort 
 element itself contains metaData only and does not generate a usable HTML 
 artefact.
-->
	<xsl:template match="ui:sort"/>
</xsl:stylesheet>