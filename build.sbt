import sbt._

name := """alignment"""
version := "1.0"
scalaVersion := "2.11.8"

lazy val root = (project in file(".")).enablePlugins(PlayJava, SbtWeb)

/* Dependencies */
libraryDependencies ++= Seq(
  javaJpa,
  "org.mockito" % "mockito-core" % "2.1.0",
  javaWs % "test",
  "org.hibernate" % "hibernate-core" % "5.2.5.Final",
  javaJdbc,
  "mysql" % "mysql-connector-java" % "5.1.36",
  "org.mindrot" % "jbcrypt" % "0.4",
  "org.apache.httpcomponents" % "httpclient" % "4.5.2",
  "org.apache.httpcomponents" % "httpmime" % "4.5.2",
  "org.apache.commons" % "commons-io" % "1.3.2",
  "com.googlecode.json-simple" % "json-simple" % "1.1.1",
  "org.skyscreamer" % "jsonassert" % "1.4.0"


)

/* Import settings */
Client.settings
NpmLibs.settings
JsDoc.settings

/* Babel (Settings for babel) */
JsEngineKeys.engineType := JsEngineKeys.EngineType.Node
BabelKeys.options := WebJs.JS.Object(
  "presets" -> List("es2015", "react", "stage-3")
)

/* Digest (filter for fingerprinting) */
includeFilter in digest := FileFilter.globFilter("*main.js") || FileFilter.globFilter("*npmlibs.js") || FileFilter.globFilter("*.css")
excludeFilter in digest := FileFilter.globFilter("*.jsx")

/* Pipeline */
pipelineStages in Assets := Seq(Client.clientCompile, digest)

/* Unmanaged */
unmanagedResources in Assets += baseDirectory.value / "target/web/browserify/npmlibs.js"
