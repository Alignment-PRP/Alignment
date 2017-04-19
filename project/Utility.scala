import java.io.File
import java.util.Calendar

object Utility {

  def libs(prefix: String): String = {
    def libsString(list: List[String]): String = {
      list match {
        case Nil => " "
        case h :: t => prefix + h + " " + libsString(t)
      }
    }
    libsString(Reference.libsList)
  }

  def isWindows: Boolean = {
    sys.props("os.name").contains("Windows")
  }

  def browserify: String = {
    if (isWindows) "browserify.cmd" else "browserify"
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

}