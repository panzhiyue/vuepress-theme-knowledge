### 限制应用多开

```typescript
        //限制应用多开
        const gotTheLock = app.requestSingleInstanceLock();
        if (!gotTheLock) {
            await this.appQuit();
            return;
        }
```

