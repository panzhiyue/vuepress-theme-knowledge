#### 事件

##### OnClientClick  根据返回值决定是否执行click事件

```c#
<asp:Button ID="btnDelete" runat="server"  class="btn_QL_X"  Text="清空数据库" style="width:90px;" OnClientClick="return confirm('是否删除数据!')"  visible="false"   OnClick="btnDelete_Click"></asp:Button>
```