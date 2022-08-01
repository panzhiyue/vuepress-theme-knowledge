

# Java-Spring项目打包为exe

https://www.cnblogs.com/cherylwu/p/8642307.html

https://blog.csdn.net/zhuimeng_by/article/details/88952026

## 原始pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

## 在build->plugins添加以下插件

需要注意的是 <mainClass>org.springframework.boot.loader.JarLauncher</mainClass>

其他选项按项目实际情况修改

```xml
<build>
        <plugins>
            <plugin>
                <groupId>com.akathist.maven.plugins.launch4j</groupId>
                <artifactId>launch4j-maven-plugin</artifactId>
                <executions>
                    <execution>
                        <id>l4j-clui</id>
                        <phase>package</phase>
                        <goals><goal>launch4j</goal></goals>
                        <configuration>
                            <headerType>console</headerType>
                            <outfile>target/consoleTest.exe</outfile>
                            <jar>target/demo-0.0.1-SNAPSHOT.jar</jar>
                            <errTitle>consoleTest</errTitle>
                            <classPath>
                                <mainClass>org.springframework.boot.loader.JarLauncher</mainClass>
                                <addDependencies>false</addDependencies>
                                <preCp>anything</preCp>
                            </classPath>
                            <jre>
                                <minVersion>1.5.0</minVersion>
                            </jre>
                            <versionInfo>
                                <fileVersion>1.2.3.4</fileVersion>
                                <txtFileVersion>txt file version?</txtFileVersion>
                                <fileDescription>a description</fileDescription>
                                <copyright>my copyright</copyright>
                                <productVersion>4.3.2.1</productVersion>
                                <txtProductVersion>txt product version</txtProductVersion>
                                <productName>consoleTest</productName>
                                <internalName>consoleTest</internalName>
                                <originalFilename>original.exe</originalFilename>
                            </versionInfo>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <artifactId>maven-assembly-plugin</artifactId>
                <executions>
                    <execution>
                        <id>assembly</id>
                        <phase>package</phase>
                        <goals><goal>single</goal></goals>
                        <configuration>
                            <descriptors>
                                <descriptor>assembly.xml</descriptor>
                            </descriptors>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

 同时在项目根目录新建一个assembly.xml文件 

```xml
<assembly xmlns="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.2 http://maven.apache.org/xsd/assembly-1.1.2.xsd">
    <id>cdc-upgrade</id>
    <formats>
        <format>zip</format>
    </formats>
    <includeBaseDirectory>false</includeBaseDirectory>
    <fileSets>
        <fileSet>
            <directory>${project.build.directory}</directory>
            <outputDirectory>/</outputDirectory>
            <includes>
                <include>*.exe</include>
            </includes>
        </fileSet>
    </fileSets>
</assembly>
```

## package

![1629789889116](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010920896.png)

## 运行程序

```
H:
CD H:\Java学习\spring\控制台应用程序HelloWord\target
consoleTest.exe 参数1 参数2
```

![1629789986623](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010920905.png)