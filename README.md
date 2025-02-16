<h1 align="center">📜 Nestjs Logger Plus</h1>

<p align="center">
  A powerful and customizable logger module for NestJS using <code>winston</code> and <code>winston-daily-rotate-file</code>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nest-logger-plus">
    <img src="https://img.shields.io/npm/v/nest-logger-plus.svg" alt="NPM Version">
  </a>
  <a href="https://github.com/sajad-ahmadnzhad/nest-logger-plus">
    <img src="https://img.shields.io/github/stars/sajad-ahmadnzhad/nest-logger-plus.svg" alt="GitHub Stars">
  </a>
</p>

## 📌 Installation

```sh
npm install nest-logger-plus winston winston-daily-rotate-file
```

## 🚀 Usage

### 1️⃣ Import the Logger Module

Register the module in your root module (`AppModule`) using `forRoot()` and specify the log path.

```typescript
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nest-logger-plus';

@Module({
  imports: [LoggerModule.forRoot({ logPath: `${process.cwd()}/logs` })],
})
export class AppModule {}
```

### 2️⃣ Inject and Use Logger Service

You can inject `LoggerService` into any provider and use its methods:

```typescript
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'nest-logger-plus';

@Injectable()
export class SomeService {
  constructor(private readonly logger: LoggerService) {}

  someMethod() {
    this.logger.log('This is an info message', 'SomeService');
    this.logger.error('This is an error message', 'Error stack trace', 'SomeService');
    this.logger.warn('This is a warning message', 'SomeService');
    this.logger.debug('This is a debug message', 'SomeService');
  }
}
```

## 🎯 Logger Methods

| Method | Description |
|--------|-------------|
| `log(message: string, context?: string)` | Logs an **info** level message |
| `error(message: string, trace?: string, context?: string)` | Logs an **error** level message with optional stack trace |
| `warn(message: string, context?: string)` | Logs a **warning** level message |
| `debug(message: string, context?: string)` | Logs a **debug** level message |

## ⚙️ Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `logPath` | `string` | `logs/` | Path where log files will be stored |

## 📂 Log File Rotation

- Logs are stored in daily rotating files.
- Maximum size per file: **10MB**.
- Logs older than **14 days** are automatically deleted.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the **MIT License**.

