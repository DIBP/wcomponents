<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/dibp/wcomponents/namespace/ui/v1.0" xmlns:html="http://www.w3.org/1999/xhtml" version="1.0">
	<xsl:import href="wc.ui.fileUpload.file.n.fileInfo.xsl"/>
	<xsl:import href="wc.common.attributeSets.xsl"/>
<!--
	File children of ui:fileUpload. These are arranged in a list for nice semantic
	reasons. Each file has a checkbox to deselect it (for removal) and a label
	which gets its content from a call to the named template {{fileInfo}}. This
	named template is not totally necessary but makes themeing the list a little
	easier should you only wish to change the displayed file info in your
	implementation.
-->

	<xsl:template match="ui:file">
		<xsl:call-template name="fileInList"/>
	</xsl:template>

	<xsl:template name="fileInList">
		<xsl:variable name="readOnly" select="../@readOnly"/>
		<xsl:variable name="removeTxt" select="concat('Delete attachment: ', @name)"/>
		<!--
		<xsl:variable name="name">
			<xsl:value-of select="concat(../@id, '${wc.ui.multiFileUploader.id.suffix}')"/>
		</xsl:variable>
		 -->
		<xsl:element name="li">
			<xsl:attribute name="id">
				<!-- Note that when part of an AJAX upload this ID is generated by the client and sent to the server as wc_fileid -->
				<xsl:value-of select="@id"/>
			</xsl:attribute>
			<xsl:attribute name="data-containerid">
				<xsl:value-of select="../@id"/>
			</xsl:attribute>
			<xsl:attribute name="class"><xsl:value-of select="local-name()"/></xsl:attribute><!-- This helps the widget identify file items -->
			<xsl:choose>
				<xsl:when test="ui:link">
					<xsl:apply-templates select="ui:link">
						<xsl:with-param name="imageAltText" select="concat('Thumbnail for uploaded file: ', @name)"/>
					</xsl:apply-templates>
				</xsl:when>
				<xsl:otherwise>
					<!-- This case should not happen because it is lame -->
					<xsl:call-template name="fileInfo"/>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:if test="not($readOnly=$t)">
				<button type="button" class="wc_btn_nada" title="{$removeTxt}">
					<span class="wc_off">
						<xsl:value-of select="$removeTxt"/>
					</span>
				</button>
			</xsl:if>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>
