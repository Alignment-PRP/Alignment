import java.io.File

import sbt.Keys.target
import sbt._

object NpmLibs {

  val npmCompile = taskKey[Unit]("Run libs")
  val libOutputDir = settingKey[File]("Npm-Libs output directory")

  val settings = Seq[Setting[_]] (
    libOutputDir := target.value / "web" / "browserify",
    npmCompile := {
      runNpmCompile(libOutputDir.value)
    }
  )

  def runNpmCompile(libOutputDir: File): Unit = {
    println(Utility.timestamp + " NpmLibs: Running...")

    val outputVendorFile = libOutputDir / "npmlibs.js"
    libOutputDir.mkdirs
    "./node_modules/.bin/"+Utility.browserify+" --fast -o " + outputVendorFile + " " + Utility.libs("-r ") !

    println(Utility.timestamp + " NpmLibs: Done")
  }

}