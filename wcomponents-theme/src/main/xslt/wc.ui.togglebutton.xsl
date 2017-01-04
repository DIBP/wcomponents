<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/bordertech/wcomponents/namespace/ui/v1.0" 
	xmlns:html="http://www.w3.org/1999/xhtml" version="2.0">
	<xsl:import href="wc.common.hField.xsl"/>
	<xsl:import href="wc.common.readOnly.xsl"/>

	<xsl:template match="ui:togglebutton">
		<xsl:choose>
			<xsl:when test="@readOnly">
				<span>
					<xsl:call-template name="commonAttributes">
						<xsl:with-param name="class">
							<xsl:text>wc-icon wc_ro</xsl:text>
							<xsl:if test="@selected">
								<xsl:text> wc_ro_sel</xsl:text>
							</xsl:if>
						</xsl:with-param>
					</xsl:call-template>
					<xsl:call-template name="title"/>
					<xsl:call-template name="roComponentName"/>
					<xsl:call-template name="togglebuttonlabeltext"/>
				</span>
			</xsl:when>
			<xsl:otherwise>
				<span>
					<xsl:call-template name="commonAttributes">
						<xsl:with-param name="class">
							<xsl:text>wc_input_wrapper</xsl:text>
						</xsl:with-param>
					</xsl:call-template>
					<button type="button" data-wc-name="{@id}" data-wc-value="true" role="checkbox">
						<xsl:call-template name="wrappedInputAttributes">
							<xsl:with-param name="name" select="''"/>
						</xsl:call-template>
						<xsl:attribute name="value">
							<xsl:text>true</xsl:text>
						</xsl:attribute>
						<xsl:attribute name="aria-checked">
							<xsl:choose>
								<xsl:when test="@selected">true</xsl:when>
								<xsl:otherwise>false</xsl:otherwise>
							</xsl:choose>
						</xsl:attribute>
						<xsl:if test="@groupName">
							<xsl:attribute name="data-wc-group">
								<xsl:value-of select="@groupName"/>
							</xsl:attribute>
						</xsl:if>
						<xsl:call-template name="togglebuttonlabeltext"/>
					</button>
					<xsl:call-template name="hField"/>
				</span>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="togglebuttonlabeltext">
		<xsl:if test="normalize-space(text()) ne ''">
			<span class="wc-togglebutton-text" id="{@id}-lbl">
				<xsl:apply-templates/>
			</span>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>
