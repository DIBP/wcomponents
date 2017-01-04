<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="https://github.com/bordertech/wcomponents/namespace/ui/v1.0" 
	xmlns:html="http://www.w3.org/1999/xhtml" version="2.0">
	<xsl:import href="wc.common.readOnly.xsl"/>
	<xsl:import href="wc.common.imageEditButton.xsl"/>
	<!--
		Transform for WFileWidget and WMultiFileWidget. Should be a pretty simple HTML input element of type file. But it isn't.

		The template will output an unordered list of files if read only and files are present. When read only and no files are present we output a
		placeholder with an ID as a potential AJAX target.

		When not read only the element is a potential compound control and so gets wrapped in a container with the component ID. The compound contro
		l consists of the file input and the list of files.
	-->
	<xsl:template match="ui:fileupload|ui:multifileupload">
		<xsl:variable name="id" select="@id"/>
		<xsl:choose>
			<xsl:when test="self::ui:fileupload and @readOnly">
				<xsl:call-template name="readOnlyControl"/>
			</xsl:when>
			<xsl:when test="self::ui:fileupload">
				<span>
					<xsl:call-template name="commonAttributes">
						<xsl:with-param name="class">
							<xsl:text>wc_input_wrapper</xsl:text>
						</xsl:with-param>
					</xsl:call-template>
					<xsl:call-template name="fileInput"/>
				</span>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="containerTag">
					<xsl:choose>
						<xsl:when test="@readOnly">
							<xsl:text>div</xsl:text>
						</xsl:when>
						<xsl:otherwise>
							<xsl:text>fieldset</xsl:text>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:variable name="cols">
					<xsl:choose>
						<xsl:when test="@cols">
							<xsl:number value="number(@cols)"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:number value="0"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:element name="{$containerTag}">
					<xsl:call-template name="commonWrapperAttributes">
						<xsl:with-param name="class">
							<xsl:choose>
								<xsl:when test="@readOnly">
									<xsl:text>wc_ro</xsl:text>
								</xsl:when>
								<xsl:when test="@ajax">
									<xsl:text>wc-ajax</xsl:text>
								</xsl:when>
							</xsl:choose>
						</xsl:with-param>
					</xsl:call-template>
					<xsl:attribute name="data-wc-cols">
						<xsl:value-of select="$cols"/>
					</xsl:attribute>
					<xsl:choose>
						<xsl:when test="@readOnly">
							<xsl:call-template name="roComponentName"/>
						</xsl:when>
						<xsl:otherwise>
							<label class="wc-off" for="{concat($id,'_input')}">
								<xsl:text>{{t 'file_inputLabel'}}</xsl:text>
							</label>
							<xsl:call-template name="fileInput"/>
							
						</xsl:otherwise>
					</xsl:choose>
					<xsl:if test="ui:file">
						<xsl:variable name="numFiles" select="count(ui:file)"/>
						<xsl:choose>
							<xsl:when test="number($cols) gt 1 and number($cols) ge number($numFiles)">
								<div class="wc_files">
									<xsl:apply-templates select="ui:file[1]" mode="columns">
										<xsl:with-param name="rows" select="number($numFiles)"/>
									</xsl:apply-templates>
								</div>
							</xsl:when>
							<xsl:when test="number($cols) gt 1">
								<xsl:variable name="rows">
									<xsl:value-of select="ceiling(number($numFiles) div number($cols))"/>
								</xsl:variable>
								<div class="wc_files">
									<xsl:apply-templates select="ui:file[position() mod number($rows) eq 1]" mode="columns">
										<xsl:with-param name="rows" select="$rows"/>
									</xsl:apply-templates>
								</div>
							</xsl:when>
							<xsl:otherwise>
								<ul>
									<xsl:attribute name="class">
										<xsl:text>wc_list_nb wc_filelist</xsl:text>
										<xsl:if test="number($cols) eq 0">
											<xsl:text> wc-listlayout-type-flat</xsl:text>
										</xsl:if>
									</xsl:attribute>
									<xsl:apply-templates select="ui:file"/>
								</ul>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
				</xsl:element>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template name="fileInput">
		<xsl:element name="input">
			<xsl:call-template name="wrappedInputAttributes">
				<xsl:with-param name="type">
					<xsl:text>file</xsl:text>
				</xsl:with-param>
				<xsl:with-param name="useRequired">
					<xsl:choose>
						<xsl:when test="self::ui:fileupload">
							<xsl:number value="1"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:number value="0"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:with-param>
			</xsl:call-template>
			<xsl:if test="@acceptedMimeTypes">
				<xsl:attribute name="accept">
					<xsl:value-of select="@acceptedMimeTypes"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:if test="@maxFileSize">
				<xsl:attribute name="data-wc-maxfilesize">
					<xsl:value-of select="@maxFileSize"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:if test="self::ui:multifileupload">
				<xsl:attribute name="multiple">
					<xsl:text>multiple</xsl:text>
				</xsl:attribute>
				<xsl:attribute name="data-dropzone">
					<xsl:choose>
						<xsl:when test="@dropzone">
							<xsl:value-of select="@dropzone"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="@id"/><!-- If there is no dropzone we may as well default to the file widget container -->
						</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:if test="@editor">
					<xsl:attribute name="data-wc-editor">
						<xsl:value-of select="@editor"/>
					</xsl:attribute>
				</xsl:if>
				<xsl:if test="@maxFiles">
					<xsl:attribute name="data-wc-maxfiles">
						<xsl:value-of select="@maxFiles"/>
					</xsl:attribute>
				</xsl:if>
			</xsl:if>
		</xsl:element>
		<xsl:if test="@camera">
			<xsl:call-template name="imageEditButton">
				<xsl:with-param name="text">
					<xsl:text>Camera</xsl:text><!-- TODO i18n -->
				</xsl:with-param>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>
