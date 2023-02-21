mod js_functions;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Copy, Clone, Debug)]
pub enum Selection {
    Rock,
    Paper,
    Scissors,
}

#[wasm_bindgen]
pub fn sample() -> Selection {
    let rand = js_functions::random();
    if rand < 0.33 {
        Selection::Rock
    } else if rand < 0.66 {
        Selection::Paper
    } else {
        Selection::Scissors
    }
}
