
# Python简单爬虫的实现

今天在慕课网上学习了如何制作一个简单的Python爬虫，主要的功能就是从百度百科中获取关于Python的1000条数据。

1.要制作一个简单的爬虫程序需要有5个模块

（1）入口程序：在这个文件中定义了爬虫类，和调用爬虫的方法，爬虫类有2个函数，**第一个是__init__函数**，在爬虫类实例化的时候把url管理器,网页下载器,网页解析器和网页输出器赋值给爬虫类；**第二个是craw函数**，该函数用于爬取数据，调用该方法需要传入一个url，爬虫程序首先抓取此url对应的网页内容,其他的url都是解析网页时获取的。

（2）url管理器：在这个文件中定义了一个url管理类,主要有5个函数,**第一个是__init__函数**,在url管理类实例化时赋予它2个set(),分别用来存储待爬取的网页url和已爬取的网页url；**第二，三个是add_new_url，add_new_urls函数**，分别是向url管理器中添加单个url和批量添加url,在添加之前必须先判断url是否为空和是否已经在已爬取url或待爬取url中，有些网页可能存在2个网页相互引用，如此可以防止爬虫陷入循环；**第四个是has_new_url函数**，用于判断是否还有待爬取的url;**第5个是get_new_url函数**,用于获取新的待爬取的url;

```python
#coding:utf-8
'''
Created on 2017-6-27
'''

class UrlManager(object):
  def __init__(self):
    self.new_urls=set()
    self.old_urls=set()
  
  #向管理器中添加一个新的url
  def add_new_url(self,url):
    if(url is None):
      return
    if url not in self.new_urls and url not in self.old_urls:  #url既不在已爬取url列表,也不在待爬取url列表
      self.new_urls.add(url)
  #向管理器中添加批量的url
  def add_new_urls(self,urls):
    print(urls)
    if urls is None or len(urls)==0:
      return
    for url in urls:
      self.add_new_url(url)
  #判断管理器中是否有新的,待爬取的url
  def has_new_url(self):
    return len(self.new_urls)!=0


  #从管理器中获取一个新的待爬取得url
  def get_new_url(self):
    new_url=self.new_urls.pop()
    self.old_urls.add(new_url)
    return new_url
```




（3）网页下载器：在这个文件中定义了网页下载类，类只有一个download函数，用于下载url对应的网页内容，**在python2中下载网页内容需要用到urllib2模块，而在python3中使用from urllib import request，相关知识自行百度.**

```python
# coding:utf-8
'''
网页下载器
Created on 2017-6-27
'''


from urllib import request

class HtmlDownloader(object): 
  def download(self,url):
    if url is None:
      return None
    response=request.urlopen(url)
    if response.getcode()!=200:
      return None
    return response.read()
```

（4）网页解析器：顾名思义，就是用来分析网页内容的，不同的网页解析规则并不相同，本程序中的网页解析方法并不通用，如果需要解析其他网页内容，请自行修改函数。

文件定义了一个网页解析类，有3个方法,**第一个是_get_new_urls函数**，用于从下载的网页内容中获取符合筛选条件的url,**第二个是_get_new_data函数**，用于从获取自己需要的数据，**第三个是parse函数**，返回解析出来的数据。

```python
# coding:utf-8
'''
网页解析器
Created on 2017-6-27
'''

from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin
class HtmlParser(object):
   
  def _get_new_urls(self, page_url, soup):
    new_urls=set()
    links=soup.find_all('a',href=re.compile(r"/item/\.*"))
    for link in links:
      new_url=link["href"]
      new_full_url=urljoin(page_url,new_url)
      new_urls.add(new_full_url)
    return new_urls
  
  
  def _get_new_data(self, page_url, soup):
    res_data={}
    res_data['url']=page_url
    title_node=soup.find('dd',class_="lemmaWgt-lemmaTitle-title").find("h1")
    res_data['title']=title_node.get_text()
    
    summary_node=soup.find("div",class_="lemma-summary")
    res_data['summary']=summary_node.get_text()
    return res_data
  
  
  def parse(self,page_url,html_cont):
    if page_url is None or html_cont is None:
      return
    soup=BeautifulSoup(html_cont,'html.parser')
    new_urls=self._get_new_urls(page_url,soup)
    new_data=self._get_new_data(page_url,soup)
    return new_urls,new_data
```

  

（5）网页输出器：我们从目标网站获取到数据之后不可能什么都不做，所以需要使用网页输出器来把数据组织成我们需要的。文件定义了网页输出类，有3个方法，**第一个是__init__函数**，用于给类初始化一个datas，用于存储数据;**第二个是collect_data函数**，需要传入data,把data添加到datas中；**第三个是output_html函数**，当所有网页解析完，或者达到要求时，所有网页的数据都存储在datas中,在output_html函数中循环遍历datas，把数据组织成自己想要的格式。

```python
# coding:utf-8
'''
网页输出器
Created on 2017-6-27
'''
import io
import sys


class HtmlOutputer(object):
    def __init__(self):
        self.datas=[]
        
    
    def collect_data(self,data):
        if data is None:
            return
        self.datas.append(data)


    
    def output_html(self):
        fout=open('output.html','w',encoding='utf-8')
        fout.write('<HTML>')
        fout.write('<head>')
        fout.write('<meta charset="utf-8">')
        fout.write('</head>')
        fout.write('<body>')
        fout.write('<table>')
        for data in self.datas:
            fout.write('<tr>')
            fout.write('<td>%s</td>' % data['url'])
            fout.write('<td>%s</td>' % (data['title']))
            fout.write('<td>%s</td>' % data['summary'])
        fout.write('</table>')
        fout.write('</body>')
        fout.write('</HTML>')
        fout.close()
```

2.在教程中要把中文写入到文件需要把数据进行（.encode("utf-8")）转换，但是我转换之后输出了二进制数据，再使用(decode("utf-8"))也一直报错。百度了好久，之后在打开文件时指定编码格式（ fout=open('output.html','w',**encoding='utf-8'**)）问题就解决了。