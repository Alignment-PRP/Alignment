import java.io.File
import java.io.PrintWriter
import java.util.Calendar
import sbt._
import scala.io.Source


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

lazy val jsDoc = taskKey[Unit]("Run jsDoc")
jsDoc := {
  def isWindows: Boolean = {
    sys.props("os.name").contains("Windows")
  }
  if (isWindows) {
    "./node_modules/.bin/jsdoc.cmd -c jsdoc_conf.json" !
  } else {
    "./node_modules/.bin/jsdoc -c jsdoc_conf.json" !
  }
}

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
    "react-router-redux",
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

  def timestamp: String = {
    def format(n: Integer): String = {
      if (n<=9) "0"+n else ""+n
    }
    val now = Calendar.getInstance()
    val hour = format(now.get(Calendar.HOUR_OF_DAY))
    val minute = format(now.get(Calendar.MINUTE))
    val seconds = format(now.get(Calendar.SECOND))
    val timestamp = "[" + hour + ":" + minute + ":" + seconds + "]"
    timestamp
  }

  if (compare(reactOutput, reactFiles)) {
    println(timestamp + " React: Running browserify")
    val outputVendorFile = browserifyOutputDir.value / "react.js"
    browserifyOutputDir.value.mkdirs
    "./node_modules/.bin/"+browserify+" --fast -o " + outputVendorFile + " " + libs("-r ") !;
    println(timestamp + " React: Done")
  }

  if (modified(appOutput, appFolder)) {
    println(timestamp + " Client: Running browserify")
    val outputFile = browserifyOutputDir.value / "main.js"
    browserifyOutputDir.value.mkdirs

    val log = new ProcessLogger {

      var error: Boolean = false
      val sDir = "target/jsError/"
      val dir = new File("target/jsError")
      dir.mkdir()
      val errorFile = new File(sDir + "error.txt")
      val codeFile = new File(sDir + "code.txt")
      val stackFile = new File(sDir + "stack.txt")
      val writeError = new PrintWriter(errorFile)
      val writeCode = new PrintWriter(codeFile)
      val writeStack = new PrintWriter(stackFile)

      def makeJsFile(): Unit = {

        if (error) {
          val jsFile = new File(sDir + "jsfile.js")
          val jsFileWriter = new PrintWriter(jsFile)

          jsFileWriter.println("var error = [")
          Source.fromFile(errorFile).getLines
            .foreach(x => {
              val y = x.replace("\\", "/")
              jsFileWriter.print("'")
              jsFileWriter.print(y)
              jsFileWriter.println("',")
            })
          jsFileWriter.println("];")

          jsFileWriter.println("var code = [")
          Source.fromFile(codeFile).getLines
            .foreach(x => {
              val y = x.replace("\\", "/")
              jsFileWriter.print("'")
              jsFileWriter.print(y)
              jsFileWriter.println("',")
            })
          jsFileWriter.println("];")

          jsFileWriter.println("var stack = [")
          Source.fromFile(stackFile).getLines
            .foreach(x => {
              val y = x.replace("\\", "/")
              jsFileWriter.print("'")
              jsFileWriter.print(y)
              jsFileWriter.println("',")
            })
          jsFileWriter.println("];")

          jsFileWriter.println("function codeLine(e){var r=document.createElement(\"pre\"),t=document.createElement(\"span\"),n=document.createElement(\"span\");return t.setAttribute(\"class\",\"line\"),n.setAttribute(\"class\",\"code\"),e=e.trim(),e=e.split(\"|\"),num=e[0].trim(),num.startsWith(\">\")?(r.setAttribute(\"class\",\"error\"),num=num.slice(1).trim()):0===num.length&&(num=\" \"),t.innerHTML=num,n.innerHTML=e[1],r.appendChild(t),r.appendChild(n),r}function init(){document.head.removeChild(document.head.getElementsByTagName(\"link\")[0]);var e=document.createElement(\"style\");e.setAttribute(\"type\",\"text/css\");var r=\"h1,h2{color:#fff;text-shadow:1px 1px 1px rgba(0,0,0,.3);margin:0}h1,h2,p#detail,pre{margin:0}body,html,pre{margin:0;padding:0;font-family:Monaco,'Lucida Console',monospace;background:#ECECEC}h1{background:#A31012;padding:20px 45px;border-bottom:1px solid #690000;font-size:28px}a{color:#D36D6D}p#detail{padding:15px 45px;background:#F5A0A0;border-top:4px solid #D36D6D;color:#730000;text-shadow:1px 1px 1px rgba(255,255,255,.3);font-size:14px;border-bottom:1px solid #BA7A7A}p#detail.pre{white-space:pre;font-size:13px;overflow:auto}h2,p#detail input,pre{font-size:12px}p#detail input{background:#AE1113;background:-webkit-linear-gradient(#AE1113,#A31012);background:-o-linear-gradient(#AE1113,#A31012);background:-moz-linear-gradient(#AE1113,#A31012);background:linear-gradient(#AE1113,#A31012);border:1px solid #790000;padding:3px 10px;text-shadow:1px 1px 0 rgba(0,0,0,.5);color:#fff;border-radius:3px;cursor:pointer;font-family:Monaco,'Lucida Console';margin:0 10px;display:inline-block;position:relative;top:-1px}h2{padding:5px 45px;background:#333;border-top:4px solid #2a2a2a}pre,pre span.line{text-shadow:1px 1px 1px rgba(255,255,255,.5)}pre{border-bottom:1px solid #DDD;position:relative}pre span.line{text-align:right;display:inline-block;padding:5px;width:30px;background:#D6D6D6;color:#8B8B8B;font-weight:700}pre.error span.line,pre.error span.marker{background:#A31012;text-shadow:1px 1px 1px rgba(0,0,0,.3)}pre span.code{padding:5px;position:absolute;right:0;left:40px}pre:first-child span.code{border-top:4px solid #CDCDCD}pre:first-child span.line{border-top:4px solid #B6B6B6}pre.error span.line{color:#fff}pre.error{color:#A31012}pre.error span.marker{color:#fff}\";e.appendChild(document.createTextNode(r)),document.head.appendChild(e);var t=document.createElement(\"div\");t.setAttribute(\"id\",\"play-error-page\");var n=document.createElement(\"h1\"),o=document.createElement(\"p\");o.setAttribute(\"id\",\"detail\"),o.setAttribute(\"class\",\"pre\");var p=document.createElement(\"h2\"),i=document.createElement(\"div\");i.setAttribute(\"id\",\"source-code\");var a=error[0].indexOf(\"Error:\")+6,d=a+1,l=error[0].indexOf(\".jsx:\")+4,c=l+2;n.innerHTML=error[0].slice(0,a).replace(\":\",\"\"),p.innerHTML=error[0].slice(d,l),o.innerHTML=error[0].slice(c);for(var s=code.map(codeLine),m=0;m<s.length;m++)i.appendChild(s[m]);t.appendChild(n),t.appendChild(o),t.appendChild(p),t.appendChild(i),document.getElementById(\"app\").appendChild(t)}addEventListener(\"load\",init);")

          jsFileWriter.close()


          val mainjs = new File("target/web/browserify/main.js")
          mainjs.delete()
          jsFile.renameTo(mainjs)

        }

      }

      def close(): Unit = {
        writeError.close()
        writeCode.close()
        writeStack.close()
      }

      override def error(s: => String): Unit = {
        if (!error) error = true
        if (s.contains("Error:")) {
          writeError.println(s)
        } else if (s.trim.startsWith("at")) {
          writeStack.println(s)
        } else {
          writeCode.println(s)
        }
      }

      override def buffer[T](f: => T): T = f

      override def info(s: => String) {println(s)}
    }
    "./node_modules/.bin/"+browserify+" --fast -t [ babelify --presets [ es2015 react stage-3] ] " + appStartingPoint + " -o " + outputFile.getPath + " " + libs("-x=") ! log;
    log.close()
    log.makeJsFile()

    if (log.error)
      println(timestamp + " Client: Error")
    else
      println(timestamp + " Client: Done")
  }
  Nil

}

sourceGenerators in Assets += browserifyTask.taskValue
unmanagedResources in Assets += baseDirectory.value / "target/web/browserify/main.js"
unmanagedResources in Assets += baseDirectory.value / "target/web/browserify/react.js"
unmanagedResourceDirectories in Assets += baseDirectory.value / "out"
