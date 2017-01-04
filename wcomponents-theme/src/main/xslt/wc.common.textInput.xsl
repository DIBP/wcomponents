<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/bordertech/wcomponents/namespace/ui/v1.0" 
	xmlns:html="http://www.w3.org/1999/xhtml" version="2.0">
	<xsl:import href="wc.common.readOnly.xsl"/>
	<!-- Single line input controls which may be associated with a datalist. -->
	<xsl:template match="ui:textfield|ui:phonenumberfield|ui:emailfield">
		<xsl:variable name="id" select="@id"/>
		<xsl:choose>
			<xsl:when test="@readOnly">
				<xsl:call-template name="readOnlyControl"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="list" select="@list"/>
				<xsl:variable name="inputId">
					<xsl:value-of select="concat($id,'_input')"/>
				</xsl:variable>
				<span>
					<xsl:call-template name="commonAttributes">
						<xsl:with-param name="class">
							<xsl:text>wc_input_wrapper</xsl:text>
							<xsl:if test="$list">
								<xsl:text> wc-combo</xsl:text>
							</xsl:if>
						</xsl:with-param>
					</xsl:call-template>
					<xsl:if test="$list">
						<xsl:attribute name="role">
							<xsl:text>combobox</xsl:text>
						</xsl:attribute>
						<xsl:attribute name="aria-expanded">
							<xsl:text>false</xsl:text>
						</xsl:attribute>
						<xsl:attribute name="data-wc-suggest">
							<xsl:value-of select="$list"/>
						</xsl:attribute>
						<xsl:attribute name="aria-autocomplete">
							<xsl:text>list</xsl:text>
						</xsl:attribute>
						<xsl:call-template name="title"/>
					</xsl:if>
					<xsl:element name="input">
						<xsl:call-template name="wrappedTextInputAttributes">
							<xsl:with-param name="type">
								<xsl:choose>
									<xsl:when test="self::ui:textfield">
										<xsl:text>text</xsl:text>
									</xsl:when>
									<xsl:when test="self::ui:emailfield">
										<xsl:text>email</xsl:text>
									</xsl:when>
									<xsl:otherwise>
										<xsl:text>tel</xsl:text>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
							<xsl:with-param name="useTitle">
								<xsl:choose>
									<xsl:when test="$list">
										<xsl:number value="0"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:number value="1"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
						</xsl:call-template>
						<xsl:attribute name="value">
							<xsl:value-of select="text()"/>
						</xsl:attribute>
						<xsl:choose>
							<xsl:when test="$list">
								<xsl:attribute name="role">
									<xsl:text>textbox</xsl:text>
								</xsl:attribute>
								<!-- every input that implements combo should have autocomplete turned off -->
								<xsl:attribute name="autocomplete">
									<xsl:text>off</xsl:text>
								</xsl:attribute>
							</xsl:when>
							<xsl:when test="@autocomplete">
								<xsl:attribute name="autocomplete">
									<xsl:value-of select="@autocomplete"/>
								</xsl:attribute>
							</xsl:when>
						</xsl:choose>
						<xsl:if test="@size">
							<xsl:attribute name="size">
								<xsl:value-of select="@size"/>
							</xsl:attribute>
						</xsl:if>
						<xsl:if test="@maxLength">
							<xsl:attribute name="maxlength">
								<xsl:value-of select="@maxLength"/>
							</xsl:attribute>
						</xsl:if>
						<xsl:if test="@minLength">
							<xsl:attribute name="minlength">
								<xsl:value-of select="@minLength"/>
							</xsl:attribute>
						</xsl:if>
						<xsl:if test="@pattern">
							<xsl:attribute name="pattern">
								<xsl:value-of select="@pattern"/>
							</xsl:attribute>
						</xsl:if>
					</xsl:element>
					<xsl:if test="$list">
						<button value="{$inputId}" tabindex="-1" id="{concat($id, '_list')}" type="button" aria-hidden="true" class="wc_suggest wc_btn_icon wc-invite">
							<xsl:call-template name="disabledElement">
								<xsl:with-param name="isControl" select="1"/>
							</xsl:call-template>
						</button>
					</xsl:if>
				</span>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
