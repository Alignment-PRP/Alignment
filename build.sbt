import java.io.File

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

val browserifyTask = taskKey[Seq[File]]("Run browserify")
val browserifyOutputDir = settingKey[File]("Browserify output directory")
browserifyOutputDir := target.value / "web" / "browserify"

browserifyTask := {
  val libsList = List(
    "axios",
    "classnames",
    "material-ui",
    "react",
    "react-addons-css-transition-group",
    "react-addons-transition-group",
    "react-dom",
    "react-redux",
    "react-router",
    "react-tap-event-plugin",
    "redux",
    "redux-form",
    "redux-form-material-ui",
    "redux-logger",
    "redux-thunk"
  )
  val reactFiles = List(
    "./node_modules/react/react.js",
    "./node_modules/react-dom/index.js"
  )
  val reactOutput = "target/web/browserify/react.js"
  val appOutput = "target/web/browserify/main.js"
  val appFolder = "app/assets/javascripts"
  val appStartingPoint = "app/assets/javascripts/main.jsx"

  def libs(prefix: String): String = {
    def libsString(list: List[String]): String = {
      list match {
        case Nil => " "
        case h :: t => prefix + h + " " + libsString(t)
      }
    }
    libsString(libsList)
  }

  def browserify: String = {
    def isWindows: Boolean = {
      sys.props("os.name").contains("Windows")
    }
    if (isWindows) "browserify.cmd" else "browserify"
  }

  def modified(target: String, fileFolder: String): Boolean = {
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
    val files = getListOfFiles(fileFolder)
    compare(target, files)
  }

  def compare(target: String, files: List[Any]): Boolean = {
    def compareLastModified(target: File, files: List[File]): Boolean = {
      val ll = files.filter(_.lastModified > target.lastModified)
      ll.nonEmpty
    }

    val fileList: List[File] = files.map({
      case s: String => new File(s)
      case f: File => f
    })
    compareLastModified(new File(target), fileList)
  }

  if (compare(reactOutput, reactFiles)) {
    println("%React: Running browserify")
    val outputVendorFile = browserifyOutputDir.value / "react.js"
    browserifyOutputDir.value.mkdirs
    "./node_modules/.bin/"+browserify+" --fast -o " + outputVendorFile + " " + libs("-r ") !;
  }

  if (modified(appOutput, appFolder)) {
    println("%Client: Running browserify")
    val outputFile = browserifyOutputDir.value / "main.js"
    browserifyOutputDir.value.mkdirs
    "./node_modules/.bin/"+browserify+" --fast -t [ babelify --presets [ es2015 react ] ] " + appStartingPoint + " -o " + outputFile.getPath + " " + libs("-x=") !;
  }
  Nil

}

sourceGenerators in Assets += browserifyTask.taskValue
unmanagedResources in Assets += baseDirectory.value / "target/web/browserify/main.js"
unmanagedResources in Assets += baseDirectory.value / "target/web/browserify/react.js"

