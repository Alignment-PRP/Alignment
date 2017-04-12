import sbt._

name := """play-java-intro"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, SbtWeb)

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  javaJpa,
  "org.mockito" % "mockito-core" % "2.1.0",
  javaWs % "test",
  "org.hibernate" % "hibernate-core" % "5.2.5.Final",
  javaJdbc,
  "mysql" % "mysql-connector-java" % "5.1.36",
  "org.mindrot" % "jbcrypt" % "0.4",
  "org.webjars" %% "webjars-play" % "2.4.0-1"

  //"org.webjars.npm" % "react" % "15.4.2"
)
Client.settings
NpmLibs.settings
JsDoc.settings

JsEngineKeys.engineType := JsEngineKeys.EngineType.Node

BabelKeys.options := WebJs.JS.Object(
  "presets" -> List("es2015", "react", "stage-3")
)

includeFilter in digest := FileFilter.globFilter("*main.js") || FileFilter.globFilter("*npmlibs.js") || FileFilter.globFilter("*.css")
excludeFilter in digest := FileFilter.globFilter("*.jsx")

pipelineStages in Assets := Seq(Client.clientCompile, digest)


unmanagedResources in Assets += baseDirectory.value / "target/web/browserify/npmlibs.js"
