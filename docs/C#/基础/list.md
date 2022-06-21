排序

```c#
        List<GZSoft.Model.Basic.Dictionary> szs = bDictionary.GetModelsByTypesInCache("SHU_ZHONG");
        szs.Sort((GZSoft.Model.Basic.Dictionary e1, GZSoft.Model.Basic.Dictionary e2) =>
        {
            return Convert.ToInt32(e1.DM) > Convert.ToInt32(e2.DM) ? 1 : -1;  //升序

        });
```