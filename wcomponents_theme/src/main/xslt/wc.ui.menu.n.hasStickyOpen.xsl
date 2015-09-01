<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/dibp/wcomponents/namespace/ui/v1.0" xmlns:html="http://www.w3.org/1999/xhtml" version="1.0">
	<!--
		This template is used to indicate whether a WSubMenu open state should 
		be honoured.
		
		param type:
		The WMenu Type. If type is not defined we are calling this template from
		a WSubMenu in an ajax response, allow stickyness for all menus and fix 
		it in JavaScript.
	-->
	<xsl:template name="hasStickyOpen">
		<xsl:param name="type"/>
		<xsl:choose>
			<!-- if type is not defined we are calling it from a submenu in
					an ajax response, allow stickyness for all menus -->
			<xsl:when test="$type='tree' or not($type)">
				<xsl:number value="1"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:number value="0"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
