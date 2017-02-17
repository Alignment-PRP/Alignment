name := """play-java-intro"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.8"

libraryDependencies += javaJpa

libraryDependencies += "org.mockito" % "mockito-core" % "2.1.0"

libraryDependencies += javaWs % "test"

libraryDependencies += "org.hibernate" % "hibernate-core" % "5.2.5.Final"

libraryDependencies += javaJdbc

libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.36"

/*
libraryDependencies ++= Seq(
  "org.webjars" %% "webjars-play" % "2.5.0",
  "org.webjars" % "react" % "15.3.2",
  "org.webjars.npm" % "react-tap-event-plugin" % "1.0.0",
  "org.webjars.bower" % "material-ui" % "0.16.7",
  "org.webjars.npm" % "browserify" % "13.1.0"
}
*/


val browserifyTask = taskKey[Seq[File]]("Run browserify")
val browserifyOutputDir = settingKey[File]("Browserify output directory")
browserifyOutputDir := target.value / "web" / "browserify"


browserifyTask := {
  def modified(): Boolean = {
    def getListOfFiles(dir: String): List[File] = {
      def files(list: List[File]): List[File] = {
        list match {
          case Nil => Nil
          case h :: t => {
            if (h.isDirectory) {
              files(h.listFiles.toList) ::: files(t)
            } else {
              h :: files(t)
            }
          }
        }
      }
      val d = new File(dir)
      if (d.exists && d.isDirectory) {
        return files(d.listFiles.toList)
      }
      List[File]()
    }

    val l = getListOfFiles("app/assets/javascripts")
    val f = new File("target/web/browserify/main.js")
    val ll = l.filter(_.lastModified() > f.lastModified())

    if (ll.isEmpty) false else true
  }

  if (modified()) {
    println("Running browserify")
    val outputFile = browserifyOutputDir.value / "main.js"
    browserifyOutputDir.value.mkdirs
    "./node_modules/.bin/browserify --fast -t [ babelify --presets [ es2015 react ] ] app/assets/javascripts/main.jsx -o "+outputFile.getPath !;
  }
  Nil

}

sourceGenerators in Assets += browserifyTask.taskValue
unmanagedResources in Assets += baseDirectory.value / "target/web/browserify/main.js"