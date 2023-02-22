# rock-paper-scissors

This [exercise](https://www.theodinproject.com/lessons/foundations-rock-paper-scissors) is concerned with JavaScript.
However, for my individual learning path, I have adapted the task to write the main functionalities in Rust which is then compiled into `wasm`.
It is a simple implementation that allows the user to play rock-paper-scissors in the browser.

## Setup

Download and install [Rust](https://www.rust-lang.org/).
If done, one can install the `wasm-pack` binary, providing `wasm-bindgen` support and easy compile options.

```bash
cargo install wasm-pack
wasm-pack build --release --target web
```

## Lessons Learned

### Rust and `wasm`

Writing in a 'low-level' language and compiling it to the browser is exciting.
Especially, if the tooling is very comfortable to do so.
Currently, I am not seeing the benefit to do so, as writing the same problem in JavaScript is faster.
However, with more complex and computationally expensive tasks it becomes more interesting.
Probably the interfacing becomes more useful when using TypeScript.

### JavaScript

One has good interoperability between `wasm` and JavaScript.
DOM manipulation is not trivial and become enormously complex for advanced dynamic features.
Therefore, I understand the benefit of using a framework to simplify the task.
In general, JavaScript is a powerful tool in web development.
