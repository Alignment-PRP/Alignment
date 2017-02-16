name := """play-java-intro"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, SbtWeb)

ReactJsKeys.harmony := true
ReactJsKeys.es6module := true

scalaVersion := "2.11.8"

libraryDependencies += javaJpa

libraryDependencies += "org.mockito" % "mockito-core" % "2.1.0"

libraryDependencies += javaWs % "test"

libraryDependencies += "org.hibernate" % "hibernate-core" % "5.2.5.Final"

libraryDependencies += javaJdbc

libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.36"


libraryDependencies ++= Seq(
  "org.webjars" %% "webjars-play" % "2.5.0",
  "org.webjars" % "react" % "15.3.2"
)