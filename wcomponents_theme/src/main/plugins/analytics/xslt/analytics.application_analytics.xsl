<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/dibp/wcomponents/namespace/ui/v1.0" xmlns:html="http://www.w3.org/1999/xhtml" version="1.0">
	<!--
		Setps up JS registration of components when web analytics is turned on.
		
		There are two registration phases:
		1. Register the page view
		2. register all trackable components within the application.
	-->
	
	<xsl:template match="ui:application" mode="analytics">
		<xsl:variable name="name">
			<!-- The name attribute is guaranteed by Java API for ui:analytic even though it is optional in the schema. -->
			<xsl:value-of select="ui:analytic/@name"/>
		</xsl:variable>
		
		<!-- now for the actual JavaScript -->
		
		<!-- page tracking -->
		<xsl:text>
	require(["${analytics.core.path.name}/${analytics.core.module.name}"], function(a){
		if(a){
			if(a.registerPage){
				a.registerPage({"name":"</xsl:text>
		<xsl:value-of select="$name"/>
		<xsl:text>"</xsl:text>
		<xsl:apply-templates select="ui:tracking" mode="analytics"/>
		<xsl:text>});}</xsl:text><!--end of registerPage-->
		
		<!-- component tracking -->
		<xsl:variable name="trackables">
			<xsl:apply-templates select=".//ui:tracking|.//*[@track]" mode="analytics"/>
		</xsl:variable>
		<xsl:if test="$trackables!=''">
			<xsl:variable name="trimmedTrackables">
				<xsl:choose>
					<xsl:when test="substring($trackables,string-length($trackables)) = ','">
						<xsl:value-of select="substring($trackables, 1, string-length($trackables) -1)"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$trackables"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			<xsl:text>
			if(a.register){
				a.register([</xsl:text>
			<xsl:value-of select="$trimmedTrackables"/>
			<xsl:text>]);}</xsl:text><!-- end of register -->
		</xsl:if>
		<xsl:text>}});</xsl:text><!-- end of require -->
	</xsl:template>
</xsl:stylesheet>