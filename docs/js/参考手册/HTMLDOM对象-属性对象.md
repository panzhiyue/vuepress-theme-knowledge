# HTMLDOM对象-属性对象

### Attr 对象

在 HTML DOM 中, **Attr 对象** 代表一个 HTML 属性。

HTML属性总是属于HTML元素。

------

### NamedNodeMap 对象

在 HTML DOM 中, the **NamedNodeMap 对象** 表示一个无顺序的节点列表。

我们可通过节点名称来访问 NamedNodeMap 中的节点。

### 属性和方法

| 属性 / 方法                                                  | 描述                                                        |
| :----------------------------------------------------------- | :---------------------------------------------------------- |
| [*attr*.isId](https://www.runoob.com/jsref/prop-attr-isid.html) | 如果属性是 ID 类型，则 isId 属性返回 true，否则返回 false。 |
| [*attr*.name](https://www.runoob.com/jsref/prop-attr-name.html) | 返回属性名称                                                |
| [*attr*.value](https://www.runoob.com/jsref/prop-attr-value.html) | 设置或者返回属性值                                          |
| [*attr*.specified](https://www.runoob.com/jsref/prop-attr-specified.html) | 如果属性被指定返回 true ，否则返回 false                    |
|                                                              |                                                             |
| [*nodemap*.getNamedItem()](https://www.runoob.com/jsref/met-namednodemap-getnameditem.html) | 从节点列表中返回的指定属性节点。                            |
| [*nodemap*.item()](https://www.runoob.com/jsref/met-namednodemap-item.html) | 返回节点列表中处于指定索引号的节点。                        |
| [*nodemap*.length](https://www.runoob.com/jsref/prop-namednodemap-length.html) | 返回节点列表的节点数目。                                    |
| [*nodemap*.removeNamedItem()](https://www.runoob.com/jsref/met-namednodemap-removenameditem.html) | 删除指定属性节点                                            |
| [*nodemap*.setNamedItem()](https://www.runoob.com/jsref/met-namednodemap-setnameditem.html) | 设置指定属性节点(通过名称)                                  |

### DOM 4 警告 !!!

在 W3C DOM 内核中, Attr (属性) 对象继承节点对象的所有属性和方法 。

在 DOM 4 中, Attr (属性) 对象不再从节点对象中继承。

**从长远的代码质量来考虑，在属性对象中你需要避免使用节点对象属性和方法:**

| 属性 / 方法            | 避免原因                   |
| :--------------------- | :------------------------- |
| *attr*.appendChild()   | 属性没有子节点             |
| *attr*.attributes      | 属性没有属性               |
| *attr*.baseURI         | 使用 document.baseURI 替代 |
| *attr*.childNodes      | 属性没有子节点             |
| *attr*.cloneNode()     | 使用 attr.value 替代       |
| *attr*.firstChild      | 属性没有子节点             |
| *attr*.hasAttributes() | 属性没有属性               |
| *attr*.hasChildNodes   | 属性没有子节点             |
| *attr*.insertBefore()  | 属性没有子节点             |
| *attr*.isEqualNode()   | 没有意义                   |
| *attr*.isSameNode()    | 没有意义                   |
| *attr*.isSupported()   | 通常为 true                |
| *attr*.lastChild       | 属性没有子节点             |
| *attr*.nextSibling     | 属性没有兄弟节点           |
| *attr*.nodeName        | 使用 *attr*.name 替代      |
| *attr*.nodeType        | 通常为 2 (ATTRIBUTE-NODE)  |
| *attr*.nodeValue       | 使用 *attr*.value 替代     |
| *attr*.normalize()     | 属性没有规范               |
| *attr*.ownerDocument   | 通常为你的 HTML 文档       |
| *attr*.ownerElement    | 你用来访问属性的 HTML 元素 |
| *attr*.parentNode      | 你用来访问属性的 HTML 元素 |
| *attr*.previousSibling | 属性没有兄弟节点           |
| *attr*.removeChild     | 属性没有子节点             |
| *attr*.replaceChild    | 属性没有子节点             |
| *attr*.textContent     | 使用 *attr*.value 替代     |