wasm-pack build --release --target web

Move-Item ./pkg/rps_bg.wasm ./logic
Move-Item ./pkg/rps.js ./logic
