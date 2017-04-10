import sbt._

object JsDoc {
  lazy val jsDoc = taskKey[Unit]("Run jsDoc")

  val task = Seq[Setting[_]] (
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
  )

}