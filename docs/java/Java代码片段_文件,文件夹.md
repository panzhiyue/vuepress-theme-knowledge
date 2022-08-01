

# Java代码片段_文件,文件夹

## 1.判断路径、文件、文件夹是否存在

https://www.cnblogs.com/1012hq/p/11377850.html

```java
import java.io.File;

public class Test {
    public static void main(String[] args) throws Exception{
        File file = new File("D:\\xxx");
        if (!file.exists()) { //用来测试此路径名表示的文件或目录是否存在
            file.isDirectory(); //来判断这是不是一个文件夹。

            File file1 = new File("D:\\xxx\\sss");
            if(!file1 .exists()) {
                file1.mkdirs();//创建目录
                System.out.println("测试文件夹不存在");
            }
            File file2 = new File("D:\\xxx\\sss\\xx.txt");
            if(!file2 .exists()) {
                file2.createNewFile();//创建文件
                System.out.println("测试文件不存在");
            }
        }
　　　　  //java中File类自带一个检测方法exists可以判断文件或文件夹是否存在，一般与mkdirs方法（该方法相较于mkdir可以创建包括父级路径，推荐使用该方法）或者createNewFile方法合作使用。
    }
}
```

