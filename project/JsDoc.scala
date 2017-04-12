import sbt._

object JsDoc {
  lazy val jsDoc = taskKey[Unit]("Run jsDoc")

  val settings = Seq[Setting[_]] (
    jsDoc := {
      if (Utility.isWindows) {
        "./node_modules/.bin/jsdoc.cmd -c jsdoc_conf.json" !
      } else {
        "./node_modules/.bin/jsdoc -c jsdoc_conf.json" !
      }
    }
  )

}