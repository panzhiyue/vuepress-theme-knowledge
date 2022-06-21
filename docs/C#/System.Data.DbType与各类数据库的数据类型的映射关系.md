

# System.Data.DbType与各类数据库的数据类型的映射关系
有如下类型的映射对照：

1. **System.Data.SqlClient.SqlDbType**
2. **System.Data.OleDb.OleDbType**
3. **System.Data.Odbc.OdbcType**
4. **System.Data.OracleClient.OracleType**
5. **Oracle.ManagedDataAccess.ClientOracleDbType**

格式：

DbType.枚举名（枚举值） = DbType.枚举名（枚举值）

## 1、与 System.Data.SqlClient.SqlDbType转换

System.Data.SqlClient.SqlDbType.BigInt(0)  = System.Data.DbType.Int64(12)
System.Data.SqlClient.SqlDbType.Binary(1)  = System.Data.DbType.Binary(1)
System.Data.SqlClient.SqlDbType.Bit(2)  = System.Data.DbType.Boolean(3)
System.Data.SqlClient.SqlDbType.Char(3)  = System.Data.DbType.AnsiStringFixedLength(22)
System.Data.SqlClient.SqlDbType.DateTime(4)  = System.Data.DbType.DateTime(6)
System.Data.SqlClient.SqlDbType.Decimal(5)  = System.Data.DbType.Decimal(7)
System.Data.SqlClient.SqlDbType.Float(6)  = System.Data.DbType.Double(8)
System.Data.SqlClient.SqlDbType.Image(7)  = System.Data.DbType.Binary(1)
System.Data.SqlClient.SqlDbType.Int(8)  = System.Data.DbType.Int32(11)
System.Data.SqlClient.SqlDbType.Money(9)  = System.Data.DbType.Currency(4)
System.Data.SqlClient.SqlDbType.NChar(10)  = System.Data.DbType.StringFixedLength(23)
System.Data.SqlClient.SqlDbType.NText(11)  = System.Data.DbType.String(16)
System.Data.SqlClient.SqlDbType.NVarChar(12)  = System.Data.DbType.String(16)
System.Data.SqlClient.SqlDbType.Real(13)  = System.Data.DbType.Single(15)
System.Data.SqlClient.SqlDbType.UniqueIdentifier(14)  = System.Data.DbType.Guid(9)
System.Data.SqlClient.SqlDbType.SmallDateTime(15)  = System.Data.DbType.DateTime(6)
System.Data.SqlClient.SqlDbType.SmallInt(16)  = System.Data.DbType.Int16(10)
System.Data.SqlClient.SqlDbType.SmallMoney(17)  = System.Data.DbType.Currency(4)
System.Data.SqlClient.SqlDbType.Text(18)  = System.Data.DbType.AnsiString(0)
System.Data.SqlClient.SqlDbType.Timestamp(19)  = System.Data.DbType.Binary(1)
System.Data.SqlClient.SqlDbType.TinyInt(20)  = System.Data.DbType.Byte(2)
System.Data.SqlClient.SqlDbType.VarBinary(21)  = System.Data.DbType.Binary(1)
System.Data.SqlClient.SqlDbType.VarChar(22)  = System.Data.DbType.AnsiString(0)
System.Data.SqlClient.SqlDbType.Variant(23)  = System.Data.DbType.Object(13)
System.Data.SqlClient.SqlDbType.Xml(25)  = System.Data.DbType.Xml(25)
System.Data.SqlClient.SqlDbType.Udt(29)  = System.Data.DbType.Object(13)
System.Data.SqlClient.SqlDbType.Structured(30)  = System.Data.DbType.Object(13)
System.Data.SqlClient.SqlDbType.Date(31)  = System.Data.DbType.Date(5)
System.Data.SqlClient.SqlDbType.Time(32)  = System.Data.DbType.Time(17)
System.Data.SqlClient.SqlDbType.DateTime2(33)  = System.Data.DbType.DateTime2(26)
System.Data.SqlClient.SqlDbType.DateTimeOffset(34)  = System.Data.DbType.DateTimeOffset(27)

## 2、与 System.Data.OleDb.OleDbType转换

System.Data.OleDb.OleDbType.Empty(0)  = System.Data.DbType.Object(13)
System.Data.OleDb.OleDbType.SmallInt(2)  = System.Data.DbType.Int16(10)
System.Data.OleDb.OleDbType.Integer(3)  = System.Data.DbType.Int32(11)
System.Data.OleDb.OleDbType.Single(4)  = System.Data.DbType.Single(15)
System.Data.OleDb.OleDbType.Double(5)  = System.Data.DbType.Double(8)
System.Data.OleDb.OleDbType.Currency(6)  = System.Data.DbType.Currency(4)
System.Data.OleDb.OleDbType.Date(7)  = System.Data.DbType.DateTime(6)
System.Data.OleDb.OleDbType.BSTR(8)  = System.Data.DbType.String(16)
System.Data.OleDb.OleDbType.IDispatch(9)  = System.Data.DbType.Object(13)
System.Data.OleDb.OleDbType.Error(10)  = System.Data.DbType.Int32(11)
System.Data.OleDb.OleDbType.Boolean(11)  = System.Data.DbType.Boolean(3)
System.Data.OleDb.OleDbType.Variant(12)  = System.Data.DbType.Object(13)
System.Data.OleDb.OleDbType.IUnknown(13)  = System.Data.DbType.Object(13)
System.Data.OleDb.OleDbType.Decimal(14)  = System.Data.DbType.Decimal(7)
System.Data.OleDb.OleDbType.TinyInt(16)  = System.Data.DbType.SByte(14)
System.Data.OleDb.OleDbType.UnsignedTinyInt(17)  = System.Data.DbType.Byte(2)
System.Data.OleDb.OleDbType.UnsignedSmallInt(18)  = System.Data.DbType.UInt16(18)
System.Data.OleDb.OleDbType.UnsignedInt(19)  = System.Data.DbType.UInt32(19)
System.Data.OleDb.OleDbType.BigInt(20)  = System.Data.DbType.Int64(12)
System.Data.OleDb.OleDbType.UnsignedBigInt(21)  = System.Data.DbType.UInt64(20)
System.Data.OleDb.OleDbType.Filetime(64)  = System.Data.DbType.DateTime(6)
System.Data.OleDb.OleDbType.Guid(72)  = System.Data.DbType.Guid(9)
System.Data.OleDb.OleDbType.Binary(128)  = System.Data.DbType.Binary(1)
System.Data.OleDb.OleDbType.Char(129)  = System.Data.DbType.AnsiStringFixedLength(22)
System.Data.OleDb.OleDbType.WChar(130)  = System.Data.DbType.StringFixedLength(23)
System.Data.OleDb.OleDbType.Numeric(131)  = System.Data.DbType.Decimal(7)
System.Data.OleDb.OleDbType.DBDate(133)  = System.Data.DbType.Date(5)
System.Data.OleDb.OleDbType.DBTime(134)  = System.Data.DbType.Time(17)
System.Data.OleDb.OleDbType.DBTimeStamp(135)  = System.Data.DbType.DateTime(6)
System.Data.OleDb.OleDbType.PropVariant(138)  = System.Data.DbType.Object(13)
System.Data.OleDb.OleDbType.VarNumeric(139)  = System.Data.DbType.VarNumeric(21)
System.Data.OleDb.OleDbType.VarChar(200)  = System.Data.DbType.AnsiString(0)
System.Data.OleDb.OleDbType.LongVarChar(201)  = System.Data.DbType.AnsiString(0)
System.Data.OleDb.OleDbType.VarWChar(202)  = System.Data.DbType.String(16)
System.Data.OleDb.OleDbType.LongVarWChar(203)  = System.Data.DbType.String(16)
System.Data.OleDb.OleDbType.VarBinary(204)  = System.Data.DbType.Binary(1)
System.Data.OleDb.OleDbType.LongVarBinary(205)  = System.Data.DbType.Binary(1)

## 3、与System.Data.Odbc.OdbcType转换

System.Data.Odbc.OdbcType.BigInt(1)  = System.Data.DbType.Int64(12)
System.Data.Odbc.OdbcType.Binary(2)  = System.Data.DbType.Binary(1)
System.Data.Odbc.OdbcType.Bit(3)  = System.Data.DbType.Boolean(3)
System.Data.Odbc.OdbcType.Char(4)  = System.Data.DbType.AnsiStringFixedLength(22)
System.Data.Odbc.OdbcType.DateTime(5)  = System.Data.DbType.DateTime(6)
System.Data.Odbc.OdbcType.Decimal(6)  = System.Data.DbType.Decimal(7)
System.Data.Odbc.OdbcType.Numeric(7)  = System.Data.DbType.Decimal(7)
System.Data.Odbc.OdbcType.Double(8)  = System.Data.DbType.Double(8)
System.Data.Odbc.OdbcType.Image(9)  = System.Data.DbType.Binary(1)
System.Data.Odbc.OdbcType.Int(10)  = System.Data.DbType.Int32(11)
System.Data.Odbc.OdbcType.NChar(11)  = System.Data.DbType.StringFixedLength(23)
System.Data.Odbc.OdbcType.NText(12)  = System.Data.DbType.String(16)
System.Data.Odbc.OdbcType.NVarChar(13)  = System.Data.DbType.String(16)
System.Data.Odbc.OdbcType.Real(14)  = System.Data.DbType.Single(15)
System.Data.Odbc.OdbcType.UniqueIdentifier(15)  = System.Data.DbType.Guid(9)
System.Data.Odbc.OdbcType.SmallDateTime(16)  = System.Data.DbType.DateTime(6)
System.Data.Odbc.OdbcType.SmallInt(17)  = System.Data.DbType.Int16(10)
System.Data.Odbc.OdbcType.Text(18)  = System.Data.DbType.AnsiString(0)
System.Data.Odbc.OdbcType.Timestamp(19)  = System.Data.DbType.Binary(1)
System.Data.Odbc.OdbcType.TinyInt(20)  = System.Data.DbType.Byte(2)
System.Data.Odbc.OdbcType.VarBinary(21)  = System.Data.DbType.Binary(1)
System.Data.Odbc.OdbcType.VarChar(22)  = System.Data.DbType.AnsiString(0)
System.Data.Odbc.OdbcType.Date(23)  = System.Data.DbType.Date(5)
System.Data.Odbc.OdbcType.Time(24)  = System.Data.DbType.Time(17)

## 4、与System.Data.OracleClient.OracleType转换

System.Data.OracleClient.OracleType.BFile(1)  = System.Data.DbType.Binary(1)
System.Data.OracleClient.OracleType.Blob(2)  = System.Data.DbType.Binary(1)
System.Data.OracleClient.OracleType.Char(3)  = System.Data.DbType.AnsiStringFixedLength(22)
System.Data.OracleClient.OracleType.Clob(4)  = System.Data.DbType.AnsiString(0)
System.Data.OracleClient.OracleType.Cursor(5)  = System.Data.DbType.Object(13)
System.Data.OracleClient.OracleType.DateTime(6)  = System.Data.DbType.DateTime(6)
System.Data.OracleClient.OracleType.IntervalDayToSecond(7)  = System.Data.DbType.Object(13)
System.Data.OracleClient.OracleType.IntervalYearToMonth(8)  = System.Data.DbType.Int32(11)
System.Data.OracleClient.OracleType.LongRaw(9)  = System.Data.DbType.Binary(1)
System.Data.OracleClient.OracleType.LongVarChar(10)  = System.Data.DbType.AnsiString(0)
System.Data.OracleClient.OracleType.NChar(11)  = System.Data.DbType.StringFixedLength(23)
System.Data.OracleClient.OracleType.NClob(12)  = System.Data.DbType.String(16)
System.Data.OracleClient.OracleType.Number(13)  = System.Data.DbType.VarNumeric(21)
System.Data.OracleClient.OracleType.NVarChar(14)  = System.Data.DbType.String(16)
System.Data.OracleClient.OracleType.Raw(15)  = System.Data.DbType.Binary(1)
System.Data.OracleClient.OracleType.RowId(16)  = System.Data.DbType.AnsiString(0)
System.Data.OracleClient.OracleType.Timestamp(18)  = System.Data.DbType.DateTime(6)
System.Data.OracleClient.OracleType.TimestampLocal(19)  = System.Data.DbType.DateTime(6)
System.Data.OracleClient.OracleType.TimestampWithTZ(20)  = System.Data.DbType.DateTime(6)
System.Data.OracleClient.OracleType.VarChar(22)  = System.Data.DbType.AnsiString(0)
System.Data.OracleClient.OracleType.Byte(23)  = System.Data.DbType.Byte(2)
System.Data.OracleClient.OracleType.UInt16(24)  = System.Data.DbType.UInt16(18)
System.Data.OracleClient.OracleType.UInt32(25)  = System.Data.DbType.UInt32(19)
System.Data.OracleClient.OracleType.SByte(26)  = System.Data.DbType.SByte(14)
System.Data.OracleClient.OracleType.Int16(27)  = System.Data.DbType.Int16(10)
System.Data.OracleClient.OracleType.Int32(28)  = System.Data.DbType.Int32(11)
System.Data.OracleClient.OracleType.Float(29)  = System.Data.DbType.Single(15)
System.Data.OracleClient.OracleType.Double(30)  = System.Data.DbType.Double(8)

## 5、与Oracle.ManagedDataAccess.ClientOracleDbType转换



Oracle.ManagedDataAccess.ClientOracleDbType.BFile = System.Data.DbType.Binary(1)
Oracle.ManagedDataAccess.ClientOracleDbType.Blob = 102,
Oracle.ManagedDataAccess.ClientOracleDbType.Byte = 103,
Oracle.ManagedDataAccess.ClientOracleDbType.Char = 104,
Oracle.ManagedDataAccess.ClientOracleDbType.Clob = 105,
Oracle.ManagedDataAccess.ClientOracleDbType.Date = 106,
Oracle.ManagedDataAccess.ClientOracleDbType.Decimal = 107,
Oracle.ManagedDataAccess.ClientOracleDbType.Double = 108,
Oracle.ManagedDataAccess.ClientOracleDbType.Long = 109,
Oracle.ManagedDataAccess.ClientOracleDbType.LongRaw = 110,
Oracle.ManagedDataAccess.ClientOracleDbType.Int16 = 111,
Oracle.ManagedDataAccess.ClientOracleDbType.Int32 = 112,
Oracle.ManagedDataAccess.ClientOracleDbType.Int64 = 113,
Oracle.ManagedDataAccess.ClientOracleDbType.IntervalDS = 114,
Oracle.ManagedDataAccess.ClientOracleDbType.IntervalYM = 115,
Oracle.ManagedDataAccess.ClientOracleDbType.NClob = 116,
Oracle.ManagedDataAccess.ClientOracleDbType.NChar = 117,
Oracle.ManagedDataAccess.ClientOracleDbType.NVarchar2 = 119,
Oracle.ManagedDataAccess.ClientOracleDbType.Raw = 120,
Oracle.ManagedDataAccess.ClientOracleDbType.RefCursor = 121,
Oracle.ManagedDataAccess.ClientOracleDbType.Single = 122,
Oracle.ManagedDataAccess.ClientOracleDbType.TimeStamp = 123,
Oracle.ManagedDataAccess.ClientOracleDbType.TimeStampLTZ = 124,
Oracle.ManagedDataAccess.ClientOracleDbType.TimeStampTZ = 125,
Oracle.ManagedDataAccess.ClientOracleDbType.Varchar2 = 126,
Oracle.ManagedDataAccess.ClientOracleDbType.XmlType = 127,
Oracle.ManagedDataAccess.ClientOracleDbType.BinaryDouble = 132,   
Oracle.ManagedDataAccess.ClientOracleDbType.BinaryFloat = 133,
Oracle.ManagedDataAccess.ClientOracleDbType.Boolean = 134,