# Environment Variables（环境变量）

Jest 设置了以下环境变量：

## `NODE_ENV`

如果尚未设置为其他内容，请设置为 `test`。

## `JEST_WORKER_ID`

每个工作进程都分配了一个唯一的 id（基于索引，从 `1` 开始）。当 `runInBand` 设置为 `true` 时，这对于所有测试都设置为 `1`。

[上一章-Jest Cli Options](/apis/JestCliOptions.md)

[下一章-Code Transformation](/apis/CodeTransformation.md)
