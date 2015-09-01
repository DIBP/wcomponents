<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/dibp/wcomponents/namespace/ui/v1.0" xmlns:html="http://www.w3.org/1999/xhtml" version="1.0">
	<xsl:output method="html" doctype-public="XSLT-compat" encoding="UTF-8" indent="no" omit-xml-declaration="yes"/>
	<xsl:strip-space elements="*"/>
	<!-- 
	Required by a11y and i18n requirements. very nasty.

	If your implementation takes a more sensible approach to a11y and pagination control
	labelling then you may not need this, or may have a much simpler template.
	-->
	<xsl:template name="paginationDescription">
		<xsl:variable name="rpp" select="@rowsPerPage"/>
		<xsl:variable name="startRow">
			<xsl:choose>
				<xsl:when test="$rpp">
					<xsl:value-of select="@currentPage * $rpp + 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:number value="1"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="prelimEndRow">
			<xsl:choose>
				<xsl:when test="$rpp">
					<xsl:value-of select="$startRow + $rpp - 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:number value="@rows"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		
		<xsl:variable name="endRow">
			<xsl:choose>
				<xsl:when test="$prelimEndRow &gt; @rows">
					<xsl:value-of select="@rows"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$prelimEndRow"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:variable name="numberPlaceHolder1" select="'${wc.ui.table.string.pagination.label.numberPlaceHolder1}'"/>
		<xsl:variable name="numberPlaceHolder2" select="'${wc.ui.table.string.pagination.label.numberPlaceHolder2}'"/>
		<xsl:variable name="numberPlaceHolder3" select="'${wc.ui.table.string.pagination.label.numberPlaceHolder3}'"/>
		<xsl:element name="span">
			<xsl:choose>
				<xsl:when test="@rows = 1">
					<xsl:value-of select="$$${wc.ui.table.string.pagination.label.concat.oneRow}"/>
				</xsl:when>
				<xsl:when test="$rpp = 1">
					<xsl:variable name="oneRowPerPageString" select="$$${wc.ui.table.string.pagination.label.concat.oneRowPerPage}"/>
					<xsl:value-of select="substring-before($oneRowPerPageString,$numberPlaceHolder1)"/>
					<xsl:element name="span">
						<xsl:attribute name="class">
							<xsl:text>wc_table_pag_rowstart</xsl:text>
						</xsl:attribute>
						<xsl:value-of select="$startRow"/>
					</xsl:element>
					<xsl:variable name="subString1" select="substring-after($oneRowPerPageString,$numberPlaceHolder1)"/>
					<xsl:value-of select="substring-before($subString1,$numberPlaceHolder3)"/>
					<xsl:value-of select="@rows"/>
					<xsl:value-of select="substring-after($subString1,$numberPlaceHolder3)"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:variable name="manyRowsPerPageString" select="$$${wc.ui.table.string.pagination.label.concat.manyRowsPerPage}"/>
					<xsl:value-of select="substring-before($manyRowsPerPageString,$numberPlaceHolder1)"/>
					<xsl:element name="span">
						<xsl:attribute name="class">
							<xsl:text>wc_table_pag_rowstart</xsl:text>
						</xsl:attribute>
					<xsl:value-of select="$startRow"/>
					</xsl:element>
					<xsl:variable name="subString2a" select="substring-after($manyRowsPerPageString,$numberPlaceHolder1)"/>
					<xsl:value-of select="substring-before($subString2a,$numberPlaceHolder2)"/>
					<xsl:element name="span">
						<xsl:attribute name="class">
							<xsl:text>wc_table_pag_rowend</xsl:text>
						</xsl:attribute>
						<xsl:value-of select="$endRow"/>
					</xsl:element>
					<xsl:variable name="subString2b" select="substring-after($subString2a,$numberPlaceHolder2)"/>
					<xsl:value-of select="substring-before($subString2b,$numberPlaceHolder3)"/>
					<xsl:value-of select="@rows"/>
					<xsl:value-of select="substring-after($subString2b,$numberPlaceHolder3)"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>