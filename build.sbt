
import sbt._

name := """play-java-intro"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  javaJpa,
  "org.mockito" % "mockito-core" % "2.1.0",
  javaWs % "test",
  "org.hibernate" % "hibernate-core" % "5.2.5.Final",
  javaJdbc,
  "mysql" % "mysql-connector-java" % "5.1.36",
  "org.mindrot" % "jbcrypt" % "0.4"
)





sourceGenerators in Assets += browserifyTask.taskValue
unmanagedResources in Assets += baseDirectory.value / "target/web/browserify/main.js"
unmanagedResources in Assets += baseDirectory.value / "target/web/browserify/react.js"
unmanagedResourceDirectories in Assets += baseDirectory.value / "out"
