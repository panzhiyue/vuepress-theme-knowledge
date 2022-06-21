## 与数值互转

```c#
int   s   =   100;  
byte[]   shi   =   System.BitConverter.GetBytes(s);         
int   sh   =   System.BitConverter.ToInt32(shi,0); 
```